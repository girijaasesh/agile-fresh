export const dynamic = 'force-dynamic';

import { pool } from '../../../../lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const encoded = searchParams.get('e');
  const appUrl  = process.env.NEXT_PUBLIC_APP_URL || 'https://www.optim-soln.com';

  if (!encoded) {
    return Response.redirect(`${appUrl}/`);
  }

  let email;
  try {
    email = Buffer.from(encoded, 'base64url').toString('utf8').toLowerCase().trim();
    if (!email.includes('@')) throw new Error('invalid');
  } catch {
    return Response.redirect(`${appUrl}/`);
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_unsubscribes (
      id               SERIAL PRIMARY KEY,
      email            TEXT NOT NULL UNIQUE,
      unsubscribed_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  await pool.query(
    'INSERT INTO newsletter_unsubscribes (email) VALUES ($1) ON CONFLICT (email) DO NOTHING',
    [email]
  );

  return Response.redirect(`${appUrl}/newsletter/unsubscribed`);
}
