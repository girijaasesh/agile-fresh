import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { pool } from '../../../lib/db';
import CertificatesClient from './CertificatesClient';

export default async function CertificatesPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');
  if (!token) redirect('/admin/login');

  const result = await pool.query(`SELECT * FROM certificates ORDER BY issued_at DESC`);
  return <CertificatesClient certificates={result.rows} />;
}