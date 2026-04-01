import Link from 'next/link';

export const metadata = {
  title: 'Enterprise Agile Implementation Partner | Optim-Soln',
  description: 'Optim-Soln partners with Prime Contractors and Government Agencies on SAFe transformations, AWS cloud migrations, and data modernization in the DMV corridor.',
};

const NAV_H = 68;

const GOLD = '#C9A84C';
const NAVY = '#0B1629';
const NAVY_MID = '#1E3A5F';
const SLATE = '#5A7898';
const CREAM = '#F8FAFC';

export default function EnterpriseAgilePage() {
  return (
    <div style={{ fontFamily: "'DM Sans', Arial, sans-serif", background: CREAM, color: NAVY, overflowX: 'hidden' }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(11,22,41,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.15)', height: NAV_H, display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 28px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ background: `linear-gradient(135deg, ${GOLD}, #E8C97A)`, borderRadius: 8, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: NAVY }}>OS</div>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: 'white', fontWeight: 600 }}>Optim-Soln</span>
          </Link>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/quick-register" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Training</Link>
            <Link href="/articles" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Knowledge Hub</Link>
            <a href="#contact" style={{ background: GOLD, color: NAVY, padding: '9px 22px', borderRadius: 7, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              Schedule a Consultation
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(145deg, ${NAVY} 0%, #0D1F3C 55%, #162647 100%)`, minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: NAV_H, position: 'relative', overflow: 'hidden' }}>
        {/* Grid overlay */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glow */}
        <div style={{ position: 'absolute', top: '15%', right: '5%', width: 600, height: 600, background: `radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)`, pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 20, padding: '6px 18px', marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, display: 'inline-block' }} />
            <span style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Enterprise Agile Implementation Partner · DMV Corridor</span>
          </div>

          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 5.5vw, 72px)', color: 'white', lineHeight: 1.1, margin: '0 0 24px', maxWidth: 820 }}>
            Transformation<br />
            <span style={{ color: GOLD }}>Over Transition.</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: 620, margin: '0 0 44px' }}>
            We don't just move you to the cloud — we rebuild how you deliver. Optim-Soln partners with Prime Contractors and Government Agencies on AWS cloud migrations, on-premises modernization, and Scaled Agile transformations built to last.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#contact" style={{ background: GOLD, color: NAVY, padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              Schedule a Consultation →
            </a>
            <a href="#competencies" style={{ background: 'transparent', color: 'white', padding: '14px 32px', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.25)' }}>
              Our Capabilities
            </a>
          </div>

          {/* Proof bar */}
          <div style={{ display: 'flex', gap: 48, marginTop: 72, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
            {[['SPC · PMP · CSM', 'Principal Credentials'], ['PBGC & DMV Corridor', 'Proven Environments'], ['SAFe · AWS · DevSecOps', 'Core Frameworks'], ['GovCon & Enterprise', 'Sectors Served']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, fontWeight: 700 }}>{val}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: '0.04em' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER NOT PLACED ── */}
      <section style={{ background: 'white', padding: '100px 28px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 72, alignItems: 'center' }}>
          <div>
            <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Our Differentiation</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', color: NAVY, lineHeight: 1.2, margin: '0 0 24px' }}>
              Your Next Engagement Deserves More Than a Staff Aug.
            </h2>
            <p style={{ fontSize: 16, color: SLATE, lineHeight: 1.8, margin: '0 0 20px' }}>
              Federal and enterprise IT leaders face a consistent problem: consultants who speak Agile but deliver waterfall, cloud architects who migrate data without modernizing workflows, and transformation programs that collapse the moment the contract ends.
            </p>
            <p style={{ fontSize: 16, color: SLATE, lineHeight: 1.8, margin: '0 0 32px' }}>
              Optim-Soln is built differently. Every engagement is led by our principal — an SPC, PMP, and CSM with direct, hands-on experience scaling delivery at organizations including the <strong style={{ color: NAVY }}>Pension Benefit Guaranty Corporation (PBGC)</strong> and across the broader DC, Maryland, and Virginia enterprise tech corridor.
            </p>
            <a href="#contact" style={{ background: NAVY, color: 'white', padding: '12px 28px', borderRadius: 7, fontWeight: 700, fontSize: 14, textDecoration: 'none', display: 'inline-block' }}>
              Talk to the Principal →
            </a>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {[
              ['📋', 'Documented Transformation Framework', 'Not a slide deck — a repeatable operating model installed into your delivery structure from day one.'],
              ['🏛️', 'GovCon Compliance Fluency', 'Deep familiarity with FISMA, FedRAMP, FAR/DFARS contract structures, and federal acquisition lifecycles.'],
              ['🎓', 'Knowledge Transfer by Design', 'Our engagement model is explicitly designed to reduce reliance on us. Your teams own the outcome.'],
              ['👤', 'Principal-Led, Always', 'The person who sells the engagement is the person who delivers it. No bait-and-switch.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: 16, padding: '20px 24px', background: CREAM, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: NAVY, marginBottom: 6 }}>{title}</div>
                  <div style={{ fontSize: 13, color: SLATE, lineHeight: 1.7 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE COMPETENCIES ── */}
      <section id="competencies" style={{ background: CREAM, padding: '100px 28px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Core Competencies</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', color: NAVY, margin: '0 0 16px' }}>
              What We Do — and What We Do Exceptionally Well
            </h2>
            <p style={{ fontSize: 17, color: SLATE, maxWidth: 560, margin: '0 auto' }}>
              Three high-impact practice areas, each with the depth to match the complexity of your environment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>

            {/* SAFe */}
            <div style={{ background: 'white', borderRadius: 16, padding: '36px 32px', border: '1px solid #E2E8F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${GOLD}, #E8C97A)` }} />
              <div style={{ width: 52, height: 52, background: 'rgba(201,168,76,0.1)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>⬡</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: NAVY, margin: '0 0 12px' }}>Scaled Agile Framework (SAFe) Implementation</h3>
              <p style={{ fontSize: 14, color: SLATE, lineHeight: 1.7, marginBottom: 24 }}>Full-spectrum SAFe transformations from ground level to portfolio — built for enterprise scale and GovCon compliance.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Stand up and sustain Agile Release Trains (ARTs)', 'Design and facilitate PI Planning at enterprise scale', 'Implement SAFe Portfolio Management aligned to strategic investment themes', 'Coach RTE, SM, and PO roles to organizational maturity', 'Report on Business Agility KPIs leadership actually cares about'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, color: SLATE, alignItems: 'flex-start' }}>
                    <span style={{ color: GOLD, flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cloud */}
            <div style={{ background: 'white', borderRadius: 16, padding: '36px 32px', border: '1px solid #E2E8F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' }} />
              <div style={{ width: 52, height: 52, background: 'rgba(59,130,246,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>☁️</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: NAVY, margin: '0 0 12px' }}>Cloud-Native Data Modernization</h3>
              <p style={{ fontSize: 14, color: SLATE, lineHeight: 1.7, marginBottom: 24 }}>Legacy data infrastructure is the single largest inhibitor of agile delivery. We address it directly — without disrupting operations.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['AWS migration strategy and execution (EC2, RDS, Redshift, S3, Lambda)', 'On-premises to cloud with zero-disruption cutover planning', 'Modernization of legacy Data Marts and ETL pipelines', 'Alignment to DevSecOps and continuous delivery pipelines', 'Governance satisfying federal data classification requirements'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, color: SLATE, alignItems: 'flex-start' }}>
                    <span style={{ color: '#3B82F6', flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* GovCon */}
            <div style={{ background: 'white', borderRadius: 16, padding: '36px 32px', border: '1px solid #E2E8F0', boxShadow: '0 2px 16px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #10B981, #34D399)' }} />
              <div style={{ width: 52, height: 52, background: 'rgba(16,185,129,0.08)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>🏛️</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: NAVY, margin: '0 0 12px' }}>Agile for Government</h3>
              <p style={{ fontSize: 14, color: SLATE, lineHeight: 1.7, marginBottom: 24 }}>Agile in the federal space is not the same as Agile in a commercial startup. We know the difference — and have delivered inside it.</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Navigate FISMA, FedRAMP, Section 508, and CMMI without sacrificing velocity', 'Integrate Agile ceremonies into FAR/DFARS contract structures', 'Align sprint cadences to government acquisition and budget cycles', 'PMO reporting that satisfies oversight without bureaucratic drag', 'Coach mixed government/contractor teams toward unified delivery culture'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, color: SLATE, alignItems: 'flex-start' }}>
                    <span style={{ color: '#10B981', flexShrink: 0, marginTop: 1 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── 3-PHASE FRAMEWORK ── */}
      <section style={{ background: NAVY, padding: '100px 28px' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>The Optim-Soln Framework</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', color: 'white', margin: '0 0 16px' }}>
              Three Phases. One Sustained Outcome.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', maxWidth: 560, margin: '0 auto' }}>
              We do not drop a framework on your organization and disappear. Every engagement follows a structured, repeatable process designed for durable change.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
            {[
              {
                num: '01',
                phase: 'ASSESS',
                title: 'Clarity Before Commitment',
                color: GOLD,
                desc: 'Before we recommend anything, we listen. We conduct a structured organizational assessment covering your current delivery model, cloud infrastructure posture, team topology, and compliance environment.',
                deliverable: 'Organizational Readiness Report + Prioritized Transformation Roadmap',
              },
              {
                num: '02',
                phase: 'IMPLEMENT',
                title: 'Frameworks That Fit Your Reality',
                color: '#60A5FA',
                desc: 'No two federal or enterprise environments are identical. We implement SAFe, cloud migration workstreams, and data modernization with your specific constraints fully accounted for.',
                deliverable: 'Live ARTs, Migrated Workloads, Trained Teams, Functioning PI Cadence',
              },
              {
                num: '03',
                phase: 'SUSTAIN',
                title: 'Independence, Not Dependency',
                color: '#34D399',
                desc: 'Our engagement model is deliberately designed to reduce reliance on us over time. Through embedded coaching, documented playbooks, and leadership development, your organization owns the transformation.',
                deliverable: 'Internal Coaching Bench, Runbooks, Retrospective Health Metrics',
              },
            ].map((p, i) => (
              <div key={p.num} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '40px 36px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: p.color }} />
                <div style={{ fontFamily: 'Georgia, serif', fontSize: 56, color: 'rgba(255,255,255,0.06)', fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>{p.num}</div>
                <div style={{ color: p.color, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Phase {i + 1} — {p.phase}</div>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: 'white', margin: '0 0 16px', lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 28 }}>{p.desc}</p>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderLeft: `3px solid ${p.color}`, padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Deliverable</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{p.deliverable}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section style={{ background: 'white', padding: '100px 28px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>Why Optim-Soln</div>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(26px, 3vw, 40px)', color: NAVY, margin: 0 }}>
              Boutique Means the Principal Delivers — Not a Substitute.
            </h2>
          </div>

          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: NAVY, padding: '16px 24px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em' }}> </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Large Consulting Firms</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: GOLD, textAlign: 'center' }}>Optim-Soln</div>
            </div>
            {[
              ['Leadership Access', 'Senior partner sells, junior staff delivers', 'Principal-led from discovery to close'],
              ['Methodology', 'One-size-fits-all playbook', 'Tailored to your contract structure and culture'],
              ['Compliance Fluency', 'General awareness', 'Deep GovCon and federal regulatory experience'],
              ['Exit Strategy', 'Maximize billable extension', 'Build internal capability, enable independence'],
              ['Geography', 'National / global', 'DMV-rooted, relationship-driven'],
            ].map(([label, large, us], i) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '18px 24px', borderTop: '1px solid #F1F5F9', background: i % 2 === 0 ? 'white' : CREAM, alignItems: 'start' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>{label}</div>
                <div style={{ fontSize: 13, color: '#94A3B8', textAlign: 'center', paddingRight: 16 }}>{large}</div>
                <div style={{ fontSize: 13, color: NAVY_MID, fontWeight: 600, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <span style={{ color: GOLD }}>✓</span> {us}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" style={{ background: `linear-gradient(145deg, ${NAVY} 0%, #0D1F3C 100%)`, padding: '100px 28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, background: `radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ color: GOLD, fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Ready to Move Forward</div>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(30px, 4vw, 52px)', color: 'white', margin: '0 0 24px', lineHeight: 1.2 }}>
            From Transition<br />to <span style={{ color: GOLD }}>Transformation.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 40px' }}>
            If you are a Prime Contractor evaluating teaming partners, a Government Agency CIO modernizing your delivery model, or an Enterprise CTO who needs someone who has actually done this inside a federal environment — we should talk.
          </p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', marginBottom: 36, fontStyle: 'italic' }}>
            The first conversation is a consultation, not a pitch.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <a href="mailto:consulting@optim-soln.com?subject=Strategic Partnership Consultation Request" style={{ background: GOLD, color: NAVY, padding: '16px 44px', borderRadius: 9, fontWeight: 800, fontSize: 16, textDecoration: 'none', display: 'inline-block', letterSpacing: '0.01em' }}>
              Schedule a Strategic Partnership Consultation →
            </a>
            <a href="mailto:consulting@optim-soln.com" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textDecoration: 'none' }}>
              consulting@optim-soln.com
            </a>
          </div>

          <div style={{ marginTop: 64, paddingTop: 48, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {['SPC — SAFe Program Consultant', 'PMP — Project Management Professional', 'CSM — Certified Scrum Master'].map(c => (
              <div key={c} style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 600, letterSpacing: '0.04em' }}>{c}</div>
            ))}
          </div>

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 24, fontStyle: 'italic' }}>
            Optim-Soln works with a limited number of engagements per quarter to maintain delivery quality.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#060E1A', padding: '28px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
          © {new Date().getFullYear()} Optim-Soln · Enterprise Agile & Cloud Modernization · DMV Corridor ·{' '}
          <Link href="/" style={{ color: GOLD, textDecoration: 'none' }}>AgileEdge Training</Link>
        </p>
      </footer>

    </div>
  );
}
