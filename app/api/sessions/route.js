export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return Response.json({ error: 'DATABASE_URL is not set' }, { status: 500 });
    }
    const { pool } = require('../../../lib/db');
    const result = await pool.query(`
      SELECT s.*, c.title, c.code, c.price, c.early_bird_price
      FROM sessions s
      JOIN certifications c ON s.certification_id = c.id
      WHERE s.session_date >= CURRENT_DATE
      AND s.is_active = true
      ORDER BY s.session_date ASC
    `);
    return Response.json(result.rows);
  } catch (error) {
    return Response.json({ 
      error: error.message,
      code: error.code,
      detail: error.toString()
    }, { status: 500 });
  }
}