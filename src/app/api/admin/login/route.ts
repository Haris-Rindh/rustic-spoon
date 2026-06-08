import { NextResponse } from 'next/server';
import { signSession } from '../../../../lib/session';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUsername = process.env.ADMIN_USERNAME || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'password123';
    const secret = process.env.ADMIN_SESSION_SECRET || 'RusticSpoonSuperSecretKey2026SecureString32Chars';

    if (username === expectedUsername && password === expectedPassword) {
      const token = await signSession(username, secret);

      const response = NextResponse.json({ success: true, message: 'Logged in successfully' });
      
      // Set the HTTP-only session cookie
      response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
