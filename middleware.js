import { NextResponse } from 'next/server';

export function middleware(request) {
  const isLoginPath = request.nextUrl.pathname === '/admin/login';
  const token = request.cookies.get('admin_token');

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/login'],
};