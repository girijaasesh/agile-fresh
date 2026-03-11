import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import AdminClient from './AdminClient';

export default function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_token');
  
  if (!token) {
    redirect('/admin/login');
  }

  return <AdminClient />;
}