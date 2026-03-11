import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isLoginPath = path === '/admin/login';
  const isAdminPath = path.startsWith('/admin');
  const token = request.cookies.get('admin_token');

  if (isAdminPath && !isLoginPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};