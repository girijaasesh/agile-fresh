import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json({ error: 'LinkedIn not configured' }, { status: 500 });
  }

  const scope = 'w_organization_social r_organization_social';
  const state = Math.random().toString(36).slice(2);

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${state}`;

  const response = NextResponse.redirect(authUrl);
  response.cookies.set('li_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });
  return response;
}
