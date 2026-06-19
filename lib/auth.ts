export const AUTH_COOKIE_NAME = 'bookhub-auth';
export const PROTECTED_ROUTES = ['/books', '/authors', '/publishers'];

export function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
