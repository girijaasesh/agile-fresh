import { NextResponse } from 'next/server';

export function middleware(request) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  const isLoginPath = request.nextUrl.pathname === '/admin/login';
  const token = request.cookies.get('admin_token');

  if (isAdminPath && !isLoginPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};