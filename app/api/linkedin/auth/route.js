export const dynamic = 'force-dynamic';

export async function GET() {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = process.env.LINKEDIN_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return new Response(JSON.stringify({ error: 'LinkedIn not configured on server' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // w_organization_social: post as org page (requires Community Management API product)
  // r_organization_social: read org page content
  const scope = 'r_organization_social w_organization_social';
  const state = Math.random().toString(36).slice(2);

  const authUrl =
    `https://www.linkedin.com/oauth/v2/authorization?response_type=code` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${encodeURIComponent(state)}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: authUrl,
      'Set-Cookie': `li_oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`,
    },
  });
}
