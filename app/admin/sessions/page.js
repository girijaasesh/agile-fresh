import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { pool } from '../../../lib/db';
import SessionsClient from './SessionsClient';

export default async function SessionsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');
  if (!token) redirect('/admin/login');

  const result = await pool.query(`
    SELECT s.*, c.title as course_title, c.code
    FROM sessions s
    JOIN certifications c ON s.certification_id = c.id
    ORDER BY s.session_date ASC
  `);

  return <SessionsClient sessions={result.rows} />;
}