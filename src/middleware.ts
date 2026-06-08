import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from './lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run middleware on /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session')?.value;
    const secret = process.env.ADMIN_SESSION_SECRET || 'RusticSpoonSuperSecretKey2026SecureString32Chars';

    const username = sessionCookie ? await verifySession(sessionCookie, secret) : null;

    if (!username) {
      // User is not logged in, redirect to login page
      const loginUrl = new URL('/admin/login', request.url);
      // Keep track of the page they were trying to access
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Ensure the middleware runs only on admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
