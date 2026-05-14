export const dynamic = 'force-dynamic';

import { pool } from '../../../../lib/db';

const APP_URL   = process.env.NEXT_PUBLIC_APP_URL || 'https://www.optim-soln.com';
const FROM      = process.env.EMAIL_FROM           || 'training@optim-sol.com';
const RESEND_KEY = process.env.RESEND_API_KEY;

/* ── Ensure tables exist ────────────────────────────────── */
async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_sends (
      id              SERIAL PRIMARY KEY,
      article_id      INTEGER NOT NULL,
      sent_at         TIMESTAMPTZ DEFAULT NOW(),
      recipient_count INTEGER     DEFAULT 0
    )
  `);
  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter_unsubscribes (
      id               SERIAL PRIMARY KEY,
      email            TEXT NOT NULL UNIQUE,
      unsubscribed_at  TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

/* ── Pick next article to send ──────────────────────────── */
async function nextArticle() {
  const { rows } = await pool.query(`
    SELECT * FROM articles
    WHERE is_published = true
      AND id NOT IN (SELECT article_id FROM newsletter_sends)
    ORDER BY published_at ASC
    LIMIT 1
  `);
  return rows[0] || null;
}

/* ── Get deduplicated subscriber list ───────────────────── */
async function subscribers() {
  const { rows } = await pool.query(`
    SELECT DISTINCT ON (lower(email)) lower(email) AS email, name
    FROM (
      SELECT email, name       FROM users         WHERE email IS NOT NULL
      UNION ALL
      SELECT email, full_name  FROM registrations WHERE email IS NOT NULL
    ) combined
    WHERE lower(email) NOT IN (
      SELECT lower(email) FROM newsletter_unsubscribes
    )
    ORDER BY lower(email)
  `);
  return rows;
}

/* ── Unsubscribe token (base64 email) ───────────────────── */
const token = (email) => Buffer.from(email.toLowerCase()).toString('base64url');

/* ── Email HTML builder ─────────────────────────────────── */
function buildHtml({ name, article, unsubUrl }) {
  const preview = (article.summary || '').slice(0, 140);
  const articleUrl = `${APP_URL}/articles/${article.slug}`;
  const readMin = article.content
    ? Math.max(1, Math.round(article.content.split(' ').length / 200))
    : 3;

  // Render first ~300 chars of content as a teaser
  const teaser = article.content
    ? article.content.replace(/#{1,3} /g, '').split('\n\n').slice(0, 2).join(' ').slice(0, 300) + '…'
    : preview;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${article.title}</title>
</head>
<body style="margin:0;padding:0;background:#F7F6F2;font-family:'DM Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F6F2;padding:32px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border-radius:8px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.07);">

    <!-- Header -->
    <tr>
      <td style="background:#1B2A4A;padding:28px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div style="font-family:Georgia,serif;font-size:20px;font-weight:700;color:#FAFAF8;letter-spacing:-0.01em;">Optimized Solutions</div>
              <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-top:4px;">Knowledge Hub</div>
            </td>
            <td align="right">
              <div style="font-size:11px;color:rgba(255,255,255,0.35);font-weight:500;">Daily Insight</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Gold accent bar -->
    <tr><td style="height:3px;background:linear-gradient(90deg,#C9973A,#E0B55A);"></td></tr>

    <!-- Greeting -->
    <tr>
      <td style="padding:36px 40px 0;">
        <p style="font-size:15px;color:#3D5A60;margin:0 0 24px;line-height:1.6;">
          Hi${name ? ` <strong style="color:#111C20;">${name.split(' ')[0]}</strong>` : ''}, here's today's insight from Girijaa Seshachala.
        </p>
      </td>
    </tr>

    <!-- Article card -->
    <tr>
      <td style="padding:0 40px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F7F6F2;border-radius:6px;border:1px solid #E2E8F0;overflow:hidden;">
          ${article.cover_image_url ? `
          <tr>
            <td style="padding:0;">
              <img src="${article.cover_image_url}" alt="${article.title}" width="100%" style="display:block;max-height:240px;object-fit:cover;width:100%;">
            </td>
          </tr>` : ''}
          <tr>
            <td style="padding:28px 28px 24px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#C9973A;margin-bottom:10px;">
                ${readMin} min read
              </div>
              <h2 style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#111C20;margin:0 0 14px;line-height:1.25;letter-spacing:-0.01em;">
                ${article.title}
              </h2>
              <p style="font-size:15px;color:#3D5A60;line-height:1.75;margin:0 0 24px;">
                ${teaser}
              </p>
              <a href="${articleUrl}"
                 style="display:inline-block;background:#1B2A4A;color:#FAFAF8;text-decoration:none;font-weight:700;font-size:14px;padding:12px 28px;border-radius:4px;letter-spacing:0.01em;">
                Read the full article →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Author signature -->
    <tr>
      <td style="padding:0 40px 32px;">
        <table cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding-right:14px;vertical-align:middle;">
              <img src="${APP_URL}/girijaa-photo.png" alt="Girijaa Seshachala" width="44" height="44"
                   style="border-radius:50%;object-fit:cover;object-position:top;display:block;border:2px solid #E2E8F0;">
            </td>
            <td style="vertical-align:middle;">
              <div style="font-size:14px;font-weight:700;color:#111C20;">Girijaa Seshachala</div>
              <div style="font-size:12px;color:#5A7880;margin-top:2px;">Founder, Optimized Solutions · SAFe SPC · Leading Agilist · PMP</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Divider -->
    <tr><td style="padding:0 40px;"><div style="height:1px;background:#E2E8F0;"></div></td></tr>

    <!-- CTA row -->
    <tr>
      <td style="padding:24px 40px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <div style="font-size:13px;font-weight:700;color:#111C20;margin-bottom:6px;">Ready to put this into practice?</div>
              <div style="font-size:13px;color:#5A7880;">Browse our upcoming SAFe certification courses.</div>
            </td>
            <td align="right" style="vertical-align:middle;">
              <a href="${APP_URL}/quick-register"
                 style="display:inline-block;background:#C9973A;color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;padding:10px 22px;border-radius:4px;white-space:nowrap;">
                View Courses →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#F7F6F2;padding:20px 40px;border-top:1px solid #E2E8F0;">
        <p style="font-size:11px;color:#94A3B8;margin:0;text-align:center;line-height:1.7;">
          © ${new Date().getFullYear()} Optimized Solutions ·
          <a href="${APP_URL}" style="color:#C9973A;text-decoration:none;">optim-soln.com</a><br>
          You're receiving this because you're part of the Optimized Solutions community.<br>
          <a href="${unsubUrl}" style="color:#94A3B8;">Unsubscribe</a>
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body>
</html>`;
}

/* ── Main cron handler ──────────────────────────────────── */
export async function GET(req) {
  // Verify Vercel cron secret
  const auth = req.headers.get('authorization');
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!RESEND_KEY) {
    return Response.json({ error: 'RESEND_API_KEY not configured' }, { status: 500 });
  }

  try {
    await ensureTables();

    const article = await nextArticle();
    if (!article) {
      return Response.json({ ok: true, message: 'No new articles to send — all caught up.' });
    }

    const subs = await subscribers();
    if (subs.length === 0) {
      return Response.json({ ok: true, message: 'No subscribers found.' });
    }

    // Batch send via Resend (max 100 per batch)
    const CHUNK = 100;
    let sent = 0;
    let errors = 0;

    for (let i = 0; i < subs.length; i += CHUNK) {
      const chunk = subs.slice(i, i + CHUNK);
      const batch = chunk.map(sub => ({
        from: `Girijaa Seshachala – Optimized Solutions <${FROM}>`,
        to:   [sub.email],
        subject: `${article.title}`,
        html: buildHtml({
          name: sub.name,
          article,
          unsubUrl: `${APP_URL}/api/newsletter/unsubscribe?e=${token(sub.email)}`,
        }),
      }));

      const res = await fetch('https://api.resend.com/emails/batch', {
        method:  'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify(batch),
      });

      const data = await res.json();
      if (res.ok) {
        sent += chunk.length;
      } else {
        console.error('[daily-article] Resend batch error:', data);
        errors += chunk.length;
      }
    }

    await pool.query(
      'INSERT INTO newsletter_sends (article_id, recipient_count) VALUES ($1, $2)',
      [article.id, sent]
    );

    return Response.json({ ok: true, article: article.title, sent, errors });

  } catch (err) {
    console.error('[daily-article] Error:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
