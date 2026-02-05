import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminRole, chefRole, customerRole, waiterRole } from './_libs/auth/types';

// Define role-route mapping
const roleRoutes = {
  admin: adminRole.routes,
  customer: customerRole.routes,
  chef: chefRole.routes,
  waiter: waiterRole.routes,
};

// Routes that don't require authentication
const publicRoutes = ['/auth/login', '/'];

// Customer routes are public (no authentication needed)
const customerRoutes = customerRole.routes;

// Helper function to check if user has access to the route
function hasAccessToRoute(role: string | null, pathname: string): boolean {
  if (!role) return false;

  const userRoutes = roleRoutes[role as keyof typeof roleRoutes];
  if (!userRoutes) return false;

  // Check exact match or prefix match
  return userRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/'),
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow customer routes (no authentication needed)
  if (customerRoutes.some((route) => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next();
  }

  // Get cookies
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const role = cookieStore.get('userRole')?.value;

  // Check if user is authenticated (required for admin/chef routes)
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check if user has access to the protected route
  if (!hasAccessToRoute(role || null, pathname)) {
    // Show 403 page
    const forbiddenUrl = new URL('/403', request.url);
    return NextResponse.rewrite(forbiddenUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next|favicon.ico|audio|images).*)',
  ],
};
