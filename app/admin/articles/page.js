import { verifyAdminAuth } from '../../../lib/adminAuth';
import { pool } from '../../../lib/db';
import ArticlesClient from './ArticlesClient';

export default async function AdminArticlesPage() {
  await verifyAdminAuth();
  const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
  return <ArticlesClient articles={result.rows} />;
}
