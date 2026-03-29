export const dynamic = 'force-dynamic';
import { put } from '@vercel/blob';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

const ALLOWED_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'ppt',
  'application/msword': 'word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'word',
  'video/mp4': 'video',
  'video/webm': 'video',
  'video/quicktime': 'video',
};

const MAX_SIZE = 200 * 1024 * 1024; // 200MB

export async function POST(req) {
  // Auth check (return 401 instead of redirect in API routes)
  const cookieStore = cookies();
  const adminToken = cookieStore.get('admin_token');
  const session = await getServerSession(authOptions);
  if (!adminToken && !session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: 'BLOB_READ_WRITE_TOKEN not configured. Add it in Vercel → Storage → Blob, then copy the token to your environment variables.' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }

    const mimeType = file.type;
    const fileType = ALLOWED_TYPES[mimeType];
    if (!fileType) {
      return Response.json({ error: `File type "${mimeType}" not allowed. Use PDF, PPT, Word, or video (MP4/WebM).` }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return Response.json({ error: 'File too large. Maximum size is 200MB.' }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const pathname = `course-materials/${Date.now()}-${safeName}`;

    const blob = await put(pathname, file, {
      access: 'public',
      contentType: mimeType,
    });

    return Response.json({ url: blob.url, type: fileType, name: file.name });
  } catch (err) {
    console.error('[upload] Error:', err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
