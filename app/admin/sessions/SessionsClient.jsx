'use client';
import { useRouter } from 'next/navigation';

export default function SessionsClient({ sessions }) {
  const router = useRouter();
  return (
    <div style={{ minHeight: '100vh', background: '#F1F5F9', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#0B1629', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#C9A84C', fontWeight: 'bold', fontSize: '20px' }}>AgileEdge</span>
        <button onClick={() => router.push('/admin')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>← Back</button>
      </div>
      <div style={{ padding: '32px' }}>
        <h1 style={{ color: '#0B1629', marginBottom: '24px' }}>Sessions ({sessions.length})</h1>
        <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0B1629', color: 'white' }}>
                {['Course', 'Code', 'Date', 'Format', 'Seats', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '13px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #E2E8F0', background: i % 2 === 0 ? 'white' : '#F8FAFC' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{s.course_title}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}><span style={{ background: '#F5EDD6', color: '#92400E', padding: '2px 8px', borderRadius: '4px' }}>{s.code}</span></td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{new Date(s.session_date).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{s.format}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{s.max_seats}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <span style={{ background: s.is_active ? '#D1FAE5' : '#FEE2E2', color: s.is_active ? '#065F46' : '#991B1B', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}