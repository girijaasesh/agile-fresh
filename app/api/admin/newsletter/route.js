export const dynamic = 'force-dynamic';

import { pool }            from '../../../../lib/db';
import { cookies }          from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { authOptions }      from '../../auth/[...nextauth]/route';

async function checkAdmin() {
  const cookieStore = cookies();
  if (cookieStore.get('admin_token')) return null;
  const session = await getServerSession(authOptions);
  if (session?.user) return null;
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}

/* GET — stats: last sends, subscriber count, pending articles */
export async function GET(req) {
  const deny = await checkAdmin(); if (deny) return deny;

  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_sends (
      id SERIAL PRIMARY KEY, article_id INTEGER NOT NULL,
      sent_at TIMESTAMPTZ DEFAULT NOW(), recipient_count INTEGER DEFAULT 0
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_unsubscribes (
      id SERIAL PRIMARY KEY, email TEXT NOT NULL UNIQUE, unsubscribed_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);

  const [sends, unsubs, pending, subCount] = await Promise.all([
    pool.query(`
      SELECT ns.*, a.title, a.slug FROM newsletter_sends ns
      JOIN articles a ON a.id = ns.article_id
      ORDER BY ns.sent_at DESC LIMIT 10
    `),
    pool.query('SELECT COUNT(*) FROM newsletter_unsubscribes'),
    pool.query(`
      SELECT id, title, published_at FROM articles
      WHERE is_published = true AND id NOT IN (SELECT article_id FROM newsletter_sends)
      ORDER BY published_at ASC
    `),
    pool.query(`
      SELECT COUNT(DISTINCT lower(email)) FROM (
        SELECT email FROM users WHERE email IS NOT NULL
        UNION ALL
        SELECT email FROM registrations WHERE email IS NOT NULL
      ) all_emails
      WHERE lower(email) NOT IN (SELECT lower(email) FROM newsletter_unsubscribes)
    `),
  ]);

  return Response.json({
    recentSends:     sends.rows,
    unsubscribeCount: Number(unsubs.rows[0].count),
    pendingArticles:  pending.rows,
    subscriberCount:  Number(subCount.rows[0].count),
  });
}

/* POST — manually trigger a send (same logic as cron) */
export async function POST(req) {
  const deny = await checkAdmin(); if (deny) return deny;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.optim-soln.com';
  const res = await fetch(`${appUrl}/api/cron/daily-article`, {
    headers: { Authorization: `Bearer ${process.env.CRON_SECRET || ''}` },
  });
  const data = await res.json();
  return Response.json(data, { status: res.status });
}
