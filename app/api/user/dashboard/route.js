export const dynamic = 'force-dynamic';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
const { pool } = require('../../../../lib/db');

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const email = session.user.email.toLowerCase();

  try {
    // Past & current registrations with course details
    const regResult = await pool.query(
      `SELECT
         r.id, r.full_name, r.amount_paid, r.currency, r.payment_status,
         r.coupon_code, r.stripe_payment_id, r.created_at,
         c.title AS course_title, c.code AS course_code,
         s.session_date, s.format, s.timezone
       FROM registrations r
       LEFT JOIN sessions s ON r.session_id = s.id
       LEFT JOIN certifications c ON s.certification_id = c.id
       WHERE LOWER(r.email) = $1
       ORDER BY r.created_at DESC`,
      [email]
    );

    const registrations = regResult.rows;

    // Split into upcoming vs past
    const now = new Date();
    const upcoming = registrations.filter(r =>
      r.payment_status === 'paid' &&
      r.session_date && new Date(r.session_date) >= now
    );
    const paid = registrations.filter(r =>
      r.payment_status === 'paid' &&
      (!r.session_date || new Date(r.session_date) < now)
    );
    const pending = registrations.filter(r => r.payment_status !== 'paid');
    const past = [...paid, ...pending];

    // All certifications for suggestions (exclude ones already registered)
    const certResult = await pool.query(
      `SELECT c.id, c.title, c.code, c.price, c.early_bird_price,
              s.session_date, s.format, s.timezone
       FROM certifications c
       LEFT JOIN sessions s ON s.certification_id = c.id AND s.is_active = true
         AND s.session_date >= CURRENT_DATE
       ORDER BY c.code, s.session_date`
    );

    // Courses the user has already registered for (paid)
    const enrolledCodes = new Set(
      registrations
        .filter(r => r.payment_status === 'paid')
        .map(r => r.course_code)
        .filter(Boolean)
    );

    // Build suggestions: not enrolled, has upcoming session
    const seen = new Set();
    const suggestions = certResult.rows
      .filter(c => !enrolledCodes.has(c.code) && c.session_date)
      .filter(c => {
        if (seen.has(c.code)) return false;
        seen.add(c.code);
        return true;
      })
      .slice(0, 4);

    return Response.json({ upcoming, past, suggestions, enrolledCodes: [...enrolledCodes] });
  } catch (err) {
    console.error('[dashboard] Error:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
