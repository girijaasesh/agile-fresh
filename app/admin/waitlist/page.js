import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { pool } from '../../../lib/db';
import WaitlistClient from './WaitlistClient';

export default async function WaitlistPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');
  if (!token) redirect('/admin/login');

  const result = await pool.query(`SELECT * FROM waitlist ORDER BY created_at DESC`);
  return <WaitlistClient waitlist={result.rows} />;
}