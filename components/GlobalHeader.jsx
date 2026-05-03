'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_H = 64;

const LINKS = [
  { label: 'Home',           href: '/' },
  { label: 'Certifications', href: '/quick-register' },
  { label: 'Corporate',      href: '/#contact' },
  { label: 'Knowledge Hub',  href: '/articles' },
];

export default function GlobalHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith('/admin')) return null;

  const isActive = (href) => {
    if (href.includes('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <style>{`
        .gh-nav-links { display: flex; align-items: center; gap: 4px; }
        .gh-hamburger { display: none; }
        .gh-mobile-menu { display: none; }
        @media (max-width: 680px) {
          .gh-nav-links { display: none; }
          .gh-hamburger { display: flex; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; }
          .gh-hamburger span { display: block; width: 22px; height: 2px; background: #111; border-radius: 2px; transition: all 0.2s; }
          .gh-mobile-menu {
            display: flex; flex-direction: column;
            position: fixed; top: ${NAV_H}px; left: 0; right: 0;
            background: rgba(250,250,248,0.98); backdrop-filter: blur(10px);
            border-bottom: 1px solid #DDD; padding: 12px 20px 20px;
            z-index: 199; gap: 2px;
          }
          .gh-mobile-menu a {
            padding: 12px 4px; font-size: 15px; font-weight: 600;
            color: #555; text-decoration: none;
            border-bottom: 1px solid #EEE;
          }
          .gh-mobile-menu a:last-child { border-bottom: none; }
          .gh-mobile-menu .gh-cta {
            margin-top: 10px; background: #111; color: #FAFAF8;
            padding: 13px 22px; font-size: 14px; font-weight: 600;
            text-align: center; border-radius: 4px; border-bottom: none;
          }
        }
      `}</style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: 'rgba(250,250,248,0.97)', backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #DDD', height: NAV_H,
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 20px',
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          {/* Logo */}
          <Link href="/" style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: '#111', fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em', flexShrink: 0 }}>
            Optimized Solutions
          </Link>

          {/* Desktop nav */}
          <div className="gh-nav-links">
            {LINKS.map(({ label, href }) => (
              <Link key={label} href={href} style={{
                padding: '7px 14px',
                fontSize: 14,
                fontWeight: 600,
                color: isActive(href) ? '#111' : '#555',
                textDecoration: 'none',
                borderBottom: isActive(href) ? '2px solid #111' : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                {label}
              </Link>
            ))}
            <Link href="/quick-register" style={{
              marginLeft: 12,
              background: 'transparent', color: '#111',
              padding: '8px 20px', fontSize: 13, fontWeight: 600,
              textDecoration: 'none', borderRadius: 3,
              border: '1.5px solid #111',
            }}>
              Quick Register
            </Link>
            <a href="/#contact" style={{
              marginLeft: 8,
              background: '#111', color: '#FAFAF8',
              padding: '9px 22px', fontSize: 13, fontWeight: 600,
              textDecoration: 'none', borderRadius: 3,
            }}>
              Let's Talk
            </a>
          </div>

          {/* Hamburger */}
          <button className="gh-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="gh-mobile-menu" onClick={() => setMenuOpen(false)}>
          {LINKS.map(({ label, href }) => (
            <Link key={label} href={href} style={{ color: isActive(href) ? '#111' : '#555' }}>
              {label}
            </Link>
          ))}
          <Link href="/quick-register" style={{ color: '#111', fontWeight: 700, border: '1.5px solid #111', borderRadius: 4, textAlign: 'center', padding: '12px 22px', marginTop: 4, borderBottom: 'none' }}>Quick Register</Link>
          <a href="/#contact" className="gh-cta">Let's Talk</a>
        </div>
      )}
    </>
  );
}
