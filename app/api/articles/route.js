export const dynamic = 'force-dynamic';
const { pool } = require('../../../lib/db');

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const slug = searchParams.get('slug');

  if (slug) {
    const result = await pool.query(
      'SELECT * FROM articles WHERE slug=$1 AND is_published=true',
      [slug]
    );
    if (result.rows.length === 0) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(result.rows[0]);
  }

  const query = category && category !== 'all'
    ? 'SELECT * FROM articles WHERE is_published=true AND category=$1 ORDER BY published_at DESC'
    : 'SELECT * FROM articles WHERE is_published=true ORDER BY published_at DESC';
  const params = category && category !== 'all' ? [category] : [];
  const result = await pool.query(query, params);
  return Response.json(result.rows);
}
