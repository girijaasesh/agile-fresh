export const dynamic = 'force-dynamic';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
const { pool } = require('../../../../lib/db');

async function checkAdmin() {
  const cookieStore = cookies();
  if (cookieStore.get('admin_token')) return null;
  const session = await getServerSession(authOptions);
  if (session?.user) return null;
  return Response.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function POST(req) {
  const deny = await checkAdmin();
  if (deny) return deny;

  const { articleId, customText } = await req.json();
  if (!articleId) return Response.json({ error: 'articleId required' }, { status: 400 });

  const articleRes = await pool.query('SELECT * FROM articles WHERE id=$1', [articleId]);
  if (articleRes.rows.length === 0) return Response.json({ error: 'Article not found' }, { status: 404 });
  const article = articleRes.rows[0];

  const tokenRes = await pool.query('SELECT access_token, expires_at FROM linkedin_tokens WHERE id=1');
  if (tokenRes.rows.length === 0) {
    return Response.json({ error: 'LinkedIn not connected. Please connect LinkedIn first.' }, { status: 400 });
  }
  const { access_token, expires_at } = tokenRes.rows[0];
  if (expires_at && new Date(expires_at) < new Date()) {
    return Response.json({ error: 'LinkedIn token expired. Please reconnect LinkedIn.' }, { status: 400 });
  }

  const articleUrl = `https://www.optim-soln.com/articles/${article.slug}`;
  const companyId = process.env.LINKEDIN_COMPANY_ID || '104213223';
  const postText = (customText?.trim() ||
    `${article.title}\n\n${article.summary || ''}\n\nRead more: ${articleUrl}`).slice(0, 3000);

  // Text-only post first — avoids article content format issues
  const body = {
    author: `urn:li:organization:${companyId}`,
    commentary: postText,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
  };

  const liRes = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
      'LinkedIn-Version': '202302',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify(body),
  });

  if (liRes.status === 201) {
    await pool.query('UPDATE articles SET linkedin_posted_at=NOW() WHERE id=$1', [articleId]);
    return Response.json({ success: true });
  }

  const liData = await liRes.json().catch(() => ({}));
  console.error('LinkedIn post failed:', liRes.status, JSON.stringify(liData), 'companyId:', companyId);
  return Response.json(
    { error: `${liData.message || liData.errorDetails || `HTTP ${liRes.status}`} [org:${companyId}]` },
    { status: liRes.status }
  );
}
