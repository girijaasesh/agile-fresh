'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'all', label: 'All Articles' },
  { value: 'agile', label: 'Agile Implementation' },
  { value: 'scrum', label: 'Scrum' },
  { value: 'kanban', label: 'Kanban' },
  { value: 'safe', label: 'SAFe' },
  { value: 'leadership', label: 'Agile Leadership' },
];

const CAT_COLORS = {
  agile:      { bg: '#EEF5FF', color: '#1E3A5F' },
  scrum:      { bg: '#D1FAE5', color: '#065F46' },
  kanban:     { bg: '#FEF3C7', color: '#92400E' },
  safe:       { bg: '#F3E8FF', color: '#6B21A8' },
  leadership: { bg: '#FEE2E2', color: '#991B1B' },
};

function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';
}

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const carouselRef = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    const url = category === 'all' ? '/api/articles' : `/api/articles?category=${category}`;
    fetch(url)
      .then(r => r.json())
      .then(d => { setArticles(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category]);

  // Auto-advance carousel
  useEffect(() => {
    if (articles.length < 2) return;
    autoRef.current = setInterval(() => {
      setCarouselIdx(i => (i + 1) % Math.min(articles.length, 6));
    }, 4000);
    return () => clearInterval(autoRef.current);
  }, [articles.length]);

  const carouselItems = articles.slice(0, 6);
  const goCarousel = (dir) => {
    clearInterval(autoRef.current);
    setCarouselIdx(i => (i + dir + carouselItems.length) % carouselItems.length);
  };

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: "'DM Sans', Arial, sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: 'white', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C97A)', borderRadius: 7, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#1E3A5F' }}>AE</div>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#1E3A5F' }}>AgileEdge</span>
          </a>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <a href="/quick-register" style={{ fontSize: 14, color: '#1E3A5F', textDecoration: 'none', fontWeight: 500 }}>Courses</a>
            <a href="/articles" style={{ fontSize: 14, color: '#C9A84C', textDecoration: 'none', fontWeight: 700 }}>Articles</a>
            <a href="/dashboard" style={{ background: '#1E3A5F', color: 'white', padding: '7px 18px', borderRadius: 8, fontSize: 13, textDecoration: 'none', fontWeight: 600 }}>My Account</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0B1629 0%, #1E3A5F 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ color: '#C9A84C', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Knowledge Hub</div>
          <h1 style={{ color: 'white', fontSize: 42, fontWeight: 800, margin: '0 0 16px', fontFamily: 'Playfair Display, serif', lineHeight: 1.2 }}>Agile Insights & Best Practices</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, margin: 0, lineHeight: 1.6 }}>Expert articles on Agile, Scrum, Kanban and scaled agile transformations.</p>
        </div>
      </div>

      {/* Carousel */}
      {articles.length > 0 && (
        <div style={{ background: '#0F1E35', padding: '40px 0 48px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>Latest Articles</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => goCarousel(-1)} style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                <button onClick={() => goCarousel(1)}  style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
              </div>
            </div>

            {/* Slides */}
            <div ref={carouselRef} style={{ position: 'relative', height: 220 }}>
              {carouselItems.map((a, i) => {
                const offset = i - carouselIdx;
                const visible = offset === 0 || offset === 1 || offset === 2 || offset === -1;
                const posMap = { '-1': -340, 0: 0, 1: 340, 2: 680 };
                const x = posMap[String(offset)] ?? (offset > 2 ? 1020 : -680);
                const isActive = offset === 0;
                const cat = CAT_COLORS[a.category] || CAT_COLORS.agile;
                const catLabel = CATEGORIES.find(c => c.value === a.category)?.label || a.category;
                return (
                  <div key={a.id}
                    onClick={() => isActive && router.push(`/articles/${a.slug}`)}
                    style={{
                      position: 'absolute', top: 0, left: 0,
                      width: 320, height: 210,
                      transform: `translateX(${x}px)`,
                      transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s, scale 0.5s',
                      opacity: isActive ? 1 : offset === 1 ? 0.7 : offset === 2 ? 0.4 : 0,
                      scale: isActive ? '1' : '0.92',
                      cursor: isActive ? 'pointer' : 'default',
                      borderRadius: 14, overflow: 'hidden',
                      background: 'white',
                      boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.4)' : '0 4px 15px rgba(0,0,0,0.2)',
                    }}>
                    <div style={{ height: 110, overflow: 'hidden', background: '#1E3A5F' }}>
                      {a.cover_image_url
                        ? <img src={a.cover_image_url} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>📝</div>}
                    </div>
                    <div style={{ padding: '12px 14px' }}>
                      <span style={{ background: cat.bg, color: cat.color, padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>{catLabel}</span>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0B1629', margin: '6px 0 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 20 }}>
              {carouselItems.map((_, i) => (
                <button key={i} onClick={() => { clearInterval(autoRef.current); setCarouselIdx(i); }}
                  style={{ width: i === carouselIdx ? 20 : 6, height: 6, borderRadius: 3, border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                    background: i === carouselIdx ? '#C9A84C' : 'rgba(255,255,255,0.25)' }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        {/* Category filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40, justifyContent: 'center' }}>
          {CATEGORIES.map(c => (
            <button key={c.value} onClick={() => setCategory(c.value)}
              style={{ padding: '8px 18px', borderRadius: 24, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                background: category === c.value ? '#1E3A5F' : 'white',
                color: category === c.value ? 'white' : '#64748B',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#94A3B8' }}>Loading articles…</div>
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#94A3B8' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>No articles in this category yet.</div>
          </div>
        ) : (
          <>
            {/* Featured article */}
            {featured && category === 'all' && (
              <div onClick={() => router.push(`/articles/${featured.slug}`)}
                style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: 40, cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ aspectRatio: '4/3', background: '#F1F5F9', overflow: 'hidden' }}>
                  {featured.cover_image_url
                    ? <img src={featured.cover_image_url} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>📝</div>}
                </div>
                <div style={{ padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <span style={{ background: '#C9A84C', color: '#1E3A5F', padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 800, textTransform: 'uppercase' }}>Featured</span>
                    <span style={{ ...(CAT_COLORS[featured.category] || CAT_COLORS.agile), padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>
                      {CATEGORIES.find(c => c.value === featured.category)?.label}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0B1629', margin: '0 0 12px', lineHeight: 1.3 }}>{featured.title}</h2>
                  <p style={{ fontSize: 15, color: '#64748B', margin: '0 0 20px', lineHeight: 1.7 }}>{featured.summary}</p>
                  <div style={{ fontSize: 13, color: '#94A3B8' }}>{fmtDate(featured.published_at)}</div>
                </div>
              </div>
            )}

            {/* Article grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {(category === 'all' ? rest : articles).map(a => {
                const cat = CAT_COLORS[a.category] || CAT_COLORS.agile;
                const catLabel = CATEGORIES.find(c => c.value === a.category)?.label || a.category;
                return (
                  <div key={a.id} onClick={() => router.push(`/articles/${a.slug}`)}
                    style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}>
                    <div style={{ aspectRatio: '16/9', background: '#F1F5F9', overflow: 'hidden' }}>
                      {a.cover_image_url
                        ? <img src={a.cover_image_url} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>📝</div>}
                    </div>
                    <div style={{ padding: 20 }}>
                      <span style={{ background: cat.bg, color: cat.color, padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700 }}>{catLabel}</span>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0B1629', margin: '10px 0 8px', lineHeight: 1.4 }}>{a.title}</h3>
                      <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 16px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {a.summary}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 12, color: '#94A3B8' }}>{fmtDate(a.published_at)}</span>
                        <span style={{ fontSize: 13, color: '#1E3A5F', fontWeight: 600 }}>Read more →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: '#0B1629', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '32px 24px', fontSize: 13, marginTop: 60 }}>
        © {new Date().getFullYear()} AgileEdge · <a href="/articles" style={{ color: '#C9A84C', textDecoration: 'none' }}>Articles</a> · <a href="/quick-register" style={{ color: '#C9A84C', textDecoration: 'none' }}>Courses</a>
      </div>
    </div>
  );
}
