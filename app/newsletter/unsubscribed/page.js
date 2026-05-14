export const metadata = { title: 'Unsubscribed | Optimized Solutions' };

export default function UnsubscribedPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F6F2', padding: '40px 20px', paddingTop: 104 }}>
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#EEF2EE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 24 }}>✓</div>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: '#111C20', margin: '0 0 12px' }}>You're unsubscribed</h1>
        <p style={{ fontSize: 16, color: '#5A7880', lineHeight: 1.7, margin: '0 0 32px' }}>
          You've been removed from the daily article list. You won't receive any more emails from us.
        </p>
        <a href="/" style={{ display: 'inline-block', background: '#1B2A4A', color: '#FAFAF8', textDecoration: 'none', fontWeight: 700, fontSize: 14, padding: '12px 28px', borderRadius: 4 }}>
          Back to Home
        </a>
      </div>
    </main>
  );
}
