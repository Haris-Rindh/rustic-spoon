import fs from 'fs';
import path from 'path';
import { menuData, testimonialsData, galleryData } from '../data';

// Define Interfaces
export interface MenuItem {
  id: number;
  slug: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface MenuData {
  starters: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
}

export interface TestimonialItem {
  id: number;
  rating: number;
  text: string;
  authorInitials: string;
  authorName: string;
}

export interface ReservationItem {
  id: string;
  date: string;
  time: string;
  guests: string;
  seating: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface SiteSettings {
  restaurantName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  instagramUrl: string;
  facebookUrl: string;
  tripAdvisorUrl: string;
}

export interface DBData {
  menu: MenuData;
  testimonials: TestimonialItem[];
  gallery: string[];
  reservations: ReservationItem[];
  settings: SiteSettings;
}

// Default/Initial Data
const DEFAULT_DATA: DBData = {
  menu: menuData,
  testimonials: testimonialsData,
  gallery: galleryData,
  reservations: [],
  settings: {
    restaurantName: 'The Rustic Spoon',
    phone: '(707) 555-0199',
    email: 'reservations@therusticspoon.com',
    address: '1230 Napa Valley Hwy, St. Helena, CA 94574',
    hours: 'Wednesday - Sunday: 5:00 PM - 10:00 PM',
    instagramUrl: 'https://instagram.com/therusticspoon',
    facebookUrl: 'https://facebook.com/therusticspoon',
    tripAdvisorUrl: 'https://tripadvisor.com'
  }
};

const DB_FILE_PATH = path.join(process.cwd(), 'src/data/db.json');
const KV_KEY = 'rustic_spoon_db';

// In-Memory Fallback for Read-Only Filesystems (Vercel without KV configured)
let inMemoryDb: DBData | null = null;

// Get Vercel KV environment variables
const getKVConfig = () => {
  const url = process.env.KV_REST_API_URL || process.env.NEXT_PUBLIC_KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.NEXT_PUBLIC_KV_REST_API_TOKEN;
  return { url, token };
};

// Check if database is running on Vercel KV
export function isUsingKV(): boolean {
  const { url, token } = getKVConfig();
  return !!(url && token);
}

// Core database read function
export async function getDbData(): Promise<DBData> {
  const { url, token } = getKVConfig();

  // 1. Try Vercel KV if configured
  if (url && token) {
    try {
      const res = await fetch(`${url}/get/${KV_KEY}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.result) {
          return JSON.parse(data.result);
        }
      }
    } catch (err) {
      console.error('Vercel KV Read Failed, falling back...', err);
    }
  }

  // 2. Try In-Memory cache (if write failed earlier)
  if (inMemoryDb) {
    return inMemoryDb;
  }

  // 3. Fall back to Local JSON File on server
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Local JSON file read failed', err);
  }

  // 4. Return default data
  return DEFAULT_DATA;
}

// Core database write function
export async function saveDbData(data: DBData): Promise<boolean> {
  const { url, token } = getKVConfig();

  // 1. Save to Vercel KV if configured
  if (url && token) {
    try {
      const res = await fetch(`${url}/set/${KV_KEY}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.error('Vercel KV Write Failed', err);
    }
  }

  // Always keep in-memory sync'd
  inMemoryDb = data;

  // 2. Save to Local JSON File
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Local JSON file write failed (ephemeral/read-only environment)', err);
    // Return true because we successfully stored in-memory for the current session/runtime
    return false;
  }
}
