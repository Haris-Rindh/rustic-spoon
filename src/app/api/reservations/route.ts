import { NextResponse } from 'next/server';
import { getDbData, saveDbData, ReservationItem } from '../../../lib/db';
import { verifySession } from '../../../lib/session';

// POST: Save a new reservation (Public)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { date, time, guests, seating, name, email, phone, notes } = data;

    if (!date || !time || !guests || !seating || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const db = await getDbData();
    const newReservation: ReservationItem = {
      id: 'RES-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      date,
      time,
      guests,
      seating,
      name,
      email,
      phone,
      notes: notes || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    db.reservations = [newReservation, ...db.reservations];
    await saveDbData(db);

    return NextResponse.json({ success: true, reservation: newReservation });
  } catch (error) {
    console.error('Failed to save reservation:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET: Retrieve all reservations (Admin Protected)
export async function GET(request: Request) {
  // Retrieve session token from cookie
  const cookieHeader = request.headers.get('cookie') || '';
  const cookieMap = new Map(
    cookieHeader.split(';').map(c => {
      const [name, ...val] = c.trim().split('=');
      return [name, val.join('=')];
    })
  );

  const sessionToken = cookieMap.get('admin_session');
  const secret = process.env.ADMIN_SESSION_SECRET || 'RusticSpoonSuperSecretKey2026SecureString32Chars';
  const username = sessionToken ? await verifySession(sessionToken, secret) : null;

  if (!username) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await getDbData();
    // Sort by createdAt descending
    const sorted = [...db.reservations].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return NextResponse.json({ success: true, reservations: sorted });
  } catch (error) {
    console.error('Failed to load reservations:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
