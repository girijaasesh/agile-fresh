const { pool } = require('../../../lib/db');

export async function POST(req) {
  const body = await req.json();
  const { full_name, email, phone, company,
          job_title, country, session_id } = body;

  const result = await pool.query(
    `INSERT INTO registrations
     (full_name, email, phone, company, job_title, country, session_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
    [full_name, email, phone, company, job_title, country, session_id]
  );

  return Response.json({ id: result.rows[0].id });
}