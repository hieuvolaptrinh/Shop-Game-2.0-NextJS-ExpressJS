import { type NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '@/constants/routes';

/**
 * Public routes that don't require authentication
 */
const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
  ROUTES.ACCOUNTS.LIST,
];

/**
 * Auth routes (redirect to dashboard if already authenticated)
 */
const AUTH_ROUTES = [
  ROUTES.AUTH.LOGIN,
  ROUTES.AUTH.REGISTER,
  ROUTES.AUTH.FORGOT_PASSWORD,
  ROUTES.AUTH.RESET_PASSWORD,
];

/**
 * Protected routes that require authentication
 */
const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD.HOME,
  ROUTES.DASHBOARD.PROFILE,
  ROUTES.DASHBOARD.SETTINGS,
  ROUTES.USER.PROFILE,
  ROUTES.USER.WALLET,
  ROUTES.USER.TOPUP,
  ROUTES.TRANSACTIONS.LIST,
];

/**
 * Check if route is public
 */
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if route is auth route
 */
function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route);
}

/**
 * Check if route is protected
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Middleware function
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for refresh token cookie (set by backend as HTTP-only)
  const hasRefreshToken = request.cookies.has('refreshToken');
  const isAuthenticated = hasRefreshToken;

  // Redirect authenticated users away from auth routes
  if (isAuthenticated && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.HOME, request.url));
  }

  // Redirect unauthenticated users from protected routes
  if (!isAuthenticated && isProtectedRoute(pathname)) {
    const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * Middleware config
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
