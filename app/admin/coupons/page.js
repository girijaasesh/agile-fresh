import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { pool } from '../../../lib/db';
import CouponsClient from './CouponsClient';

export default async function CouponsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');
  if (!token) redirect('/admin/login');

  const result = await pool.query(`SELECT * FROM coupons ORDER BY created_at DESC`);
  return <CouponsClient coupons={result.rows} />;
}