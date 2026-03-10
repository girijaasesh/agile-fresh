export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', process.env.NEXTAUTH_SECRET, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 8,
      path: '/',
    });
    return response;
  }

  return NextResponse.json(
    { success: false, error: 'Invalid credentials' },
    { status: 401 }
  );
}