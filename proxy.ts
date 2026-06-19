import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, isProtectedRoute } from '@/lib/auth';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isAuthenticated = request.cookies.get(AUTH_COOKIE_NAME)?.value === 'true';

  // Protected pages send unauthenticated users to login with their target saved.
  if (!isAuthenticated && isProtectedRoute(pathname)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/books/:path*', '/authors/:path*', '/publishers/:path*'],
};
