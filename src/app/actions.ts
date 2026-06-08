'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { getDbData, saveDbData, MenuItem, TestimonialItem, SiteSettings } from '../lib/db';
import { verifySession } from '../lib/session';

// Helper to secure server actions
async function checkAuth() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('admin_session')?.value;
  const secret = process.env.ADMIN_SESSION_SECRET || 'RusticSpoonSuperSecretKey2026SecureString32Chars';
  const username = sessionCookie ? await verifySession(sessionCookie, secret) : null;
  if (!username) {
    throw new Error('Unauthorized access');
  }
  return username;
}

// ── MENU CRUD ACTIONS ──

export async function addMenuItem(
  category: 'starters' | 'mains' | 'desserts',
  name: string,
  price: string,
  description: string,
  image: string
) {
  await checkAuth();

  const db = await getDbData();
  
  // Find highest ID across all menu sections to increment
  const allItems = [...db.menu.starters, ...db.menu.mains, ...db.menu.desserts];
  const maxId = allItems.reduce((max, item) => (item.id > max ? item.id : max), 0);

  // Generate url-safe slug from name
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const newItem: MenuItem = {
    id: maxId + 1,
    slug,
    name,
    price: price.startsWith('$') ? price : `$${price}`,
    description,
    image: image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  };

  db.menu[category].push(newItem);
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/menu');
  revalidatePath(`/dish/${slug}`);
  revalidatePath('/admin/menu');
  return { success: true, item: newItem };
}

export async function editMenuItem(
  category: 'starters' | 'mains' | 'desserts',
  id: number,
  name: string,
  price: string,
  description: string,
  image: string
) {
  await checkAuth();

  const db = await getDbData();
  const categoryItems = db.menu[category];
  const index = categoryItems.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new Error('Menu item not found');
  }

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const updatedItem: MenuItem = {
    id,
    slug,
    name,
    price: price.startsWith('$') ? price : `$${price}`,
    description,
    image
  };

  db.menu[category][index] = updatedItem;
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/menu');
  revalidatePath(`/dish/${slug}`);
  revalidatePath('/admin/menu');
  return { success: true, item: updatedItem };
}

export async function deleteMenuItem(category: 'starters' | 'mains' | 'desserts', id: number) {
  await checkAuth();

  const db = await getDbData();
  const originalItem = db.menu[category].find((item) => item.id === id);
  db.menu[category] = db.menu[category].filter((item) => item.id !== id);
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/menu');
  if (originalItem) {
    revalidatePath(`/dish/${originalItem.slug}`);
  }
  revalidatePath('/admin/menu');
  return { success: true };
}

// ── GALLERY CRUD ACTIONS ──

export async function addGalleryImage(url: string) {
  await checkAuth();

  if (!url) throw new Error('Image URL is required');

  const db = await getDbData();
  db.gallery.push(url);
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/admin/gallery');
  return { success: true };
}

export async function deleteGalleryImage(url: string) {
  await checkAuth();

  const db = await getDbData();
  db.gallery = db.gallery.filter((img) => img !== url);
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/admin/gallery');
  return { success: true };
}

// ── TESTIMONIALS CRUD ACTIONS ──

export async function addTestimonial(rating: number, text: string, name: string) {
  await checkAuth();

  const db = await getDbData();
  const maxId = db.testimonials.reduce((max, item) => (item.id > max ? item.id : max), 0);

  // Generate initials
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const newTestimonial: TestimonialItem = {
    id: maxId + 1,
    rating,
    text,
    authorInitials: initials || 'G',
    authorName: name
  };

  db.testimonials.push(newTestimonial);
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  return { success: true, testimonial: newTestimonial };
}

export async function editTestimonial(id: number, rating: number, text: string, name: string) {
  await checkAuth();

  const db = await getDbData();
  const index = db.testimonials.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error('Testimonial not found');
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const updatedTestimonial: TestimonialItem = {
    id,
    rating,
    text,
    authorInitials: initials || 'G',
    authorName: name
  };

  db.testimonials[index] = updatedTestimonial;
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  return { success: true, testimonial: updatedTestimonial };
}

export async function deleteTestimonial(id: number) {
  await checkAuth();

  const db = await getDbData();
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/admin/testimonials');
  return { success: true };
}

// ── RESERVATION ACTIONS ──

export async function updateReservationStatus(
  id: string,
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
) {
  await checkAuth();

  const db = await getDbData();
  const index = db.reservations.findIndex((r) => r.id === id);

  if (index === -1) {
    throw new Error('Reservation not found');
  }

  db.reservations[index].status = status;
  await saveDbData(db);

  revalidatePath('/admin');
  revalidatePath('/admin/reservations');
  return { success: true };
}

export async function deleteReservation(id: string) {
  await checkAuth();

  const db = await getDbData();
  db.reservations = db.reservations.filter((r) => r.id !== id);
  await saveDbData(db);

  revalidatePath('/admin');
  revalidatePath('/admin/reservations');
  return { success: true };
}

// ── SITE CONFIGURATION ACTIONS ──

export async function updateSettings(settings: SiteSettings) {
  await checkAuth();

  const db = await getDbData();
  db.settings = settings;
  await saveDbData(db);

  revalidatePath('/');
  revalidatePath('/admin/settings');
  return { success: true };
}
