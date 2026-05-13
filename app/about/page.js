'use client';
import Image from 'next/image';

const NAVY  = '#1B2A4A';
const GOLD  = '#C9973A';
const CREAM = '#FAFAF8';
const SLATE = '#4A5568';

const CERTIFICATIONS = [
  'SAFe Program Consultant (SPC 6.0)',
  'Release Train Engineer (RTE)',
  'Project Management Professional (PMP)',
  'Certified ScrumMaster (CSM)',
  'SAFe Agilist (SA)',
  'SAFe Scrum Master (SSM)',
  'SAFe Advanced Scrum Master (SASM)',
  'SAFe Product Owner / Product Manager (POPM)',
];

const COMPETENCIES = [
  'SAFe Framework Implementation',
  'Agile Release Train (ART) Facilitation',
  'PI Planning & Execution',
  'Executive & Leadership Coaching',
  'Organizational Change Management',
  'Lean Portfolio Management',
  'DevOps & Continuous Delivery Pipeline',
  'Team & Technical Agility',
  'Business Agility & Value Streams',
  'Scrum, Kanban & XP Practices',
  'OKRs & Metrics-Driven Improvement',
  'Stakeholder Alignment & Communication',
];

const ACHIEVEMENTS = [
  { metric: '50%', label: 'Improvement in delivery predictability across ARTs' },
  { metric: '32%', label: 'Productivity boost for 700+ employees through Lean-Agile transformation' },
  { metric: '40%', label: 'Increase in data accessibility via platform modernization' },
  { metric: '15+', label: 'Years of enterprise agile coaching & leadership' },
];

const SERVICES = [
  {
    title: 'SAFe Certification Training',
    desc: 'Live, instructor-led training for all major SAFe certifications — from SA and SSM to SPC and RTE. Every course includes the exam fee and is led by a certified SAFe Program Consultant.',
  },
  {
    title: 'Enterprise Agile Coaching',
    desc: 'Embedded coaching for teams, ARTs, and leadership. We help organizations move from intent to outcomes — building the habits, cadences, and culture that make agility stick.',
  },
  {
    title: 'PI Planning Facilitation',
    desc: 'End-to-end facilitation of PI Planning events for Agile Release Trains of all sizes, including pre-PI prep, event execution, and post-PI follow-through.',
  },
  {
    title: 'Lean Portfolio Management',
    desc: 'Strategic coaching on value stream identification, portfolio Kanban, OKR alignment, and connecting business strategy to team-level execution.',
  },
];

export default function AboutPage() {
  return (
    <main style={{ background: CREAM, minHeight: '100vh', paddingTop: 104 }}>

      {/* Hero */}
      <section style={{ background: NAVY, color: '#fff', padding: '72px 20px 64px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: GOLD, textTransform: 'uppercase', marginBottom: 16 }}>About Us</div>
          <h1 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontFamily: 'Georgia, serif', fontWeight: 700, margin: '0 0 16px', lineHeight: 1.15, maxWidth: 700 }}>
            Optimized Solutions
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, maxWidth: 640, margin: 0 }}>
            A practitioner-led Agile training and coaching firm built to help teams, leaders, and organizations achieve sustainable, measurable business agility.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section style={{ background: '#fff', padding: '52px 20px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
          {ACHIEVEMENTS.map(({ metric, label }) => (
            <div key={metric} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontFamily: 'Georgia, serif', fontWeight: 700, color: GOLD, lineHeight: 1 }}>{metric}</div>
              <div style={{ fontSize: 14, color: SLATE, marginTop: 10, lineHeight: 1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: GOLD, textTransform: 'uppercase', marginBottom: 10 }}>Our Mission</div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontFamily: 'Georgia, serif', color: NAVY, margin: '0 0 28px' }}>
            Agile That Actually Works
          </h2>
          <div style={{ fontSize: 16, color: SLATE, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p style={{ margin: 0 }}>
              Optimized Solutions was founded on a simple belief: agile transformation works best when it's led by practitioners who have done the work — not consultants who have only read the playbook. We bring deep, hands-on experience from the field to every training course, coaching engagement, and organizational transformation we take on.
            </p>
            <p style={{ margin: 0 }}>
              Our approach centers on sustainable change. We don't just introduce frameworks — we embed Lean-Agile thinking into the culture, systems, and leadership mindset of every organization we work with. Whether facilitating a PI Planning event for 200+ people, coaching a C-suite on portfolio strategy, or developing a new Scrum Master's skills, we bring both rigor and empathy to every engagement.
            </p>
            <p style={{ margin: 0 }}>
              From federal agencies to Fortune 500 enterprises, we've helped organizations across financial services, healthcare, and government sectors achieve real, measurable outcomes — not just framework compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ background: '#fff', padding: '60px 20px', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: GOLD, textTransform: 'uppercase', marginBottom: 10 }}>What We Do</div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontFamily: 'Georgia, serif', color: NAVY, margin: '0 0 40px' }}>
            Our Services
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
            {SERVICES.map((s) => (
              <div key={s.title} style={{ padding: '28px 28px 24px', background: CREAM, border: '1px solid #E2E8F0', borderRadius: 10 }}>
                <div style={{ width: 36, height: 4, background: GOLD, borderRadius: 2, marginBottom: 16 }} />
                <div style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: SLATE, lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: GOLD, textTransform: 'uppercase', marginBottom: 10 }}>Our Founder</div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontFamily: 'Georgia, serif', color: NAVY, margin: '0 0 40px' }}>
            Meet Girijaa Seshachala
          </h2>
          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flexShrink: 0, position: 'relative', width: 200, height: 240, borderRadius: 10, overflow: 'hidden', border: `3px solid ${GOLD}`, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
              <Image
                src="/girijaa-photo.png"
                alt="Girijaa Seshachala — Founder, Optimized Solutions"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 4 }}>Girijaa Seshachala</div>
              <div style={{ fontSize: 14, color: GOLD, fontWeight: 600, marginBottom: 20 }}>
                Founder &nbsp;·&nbsp; SAFe SPC &nbsp;·&nbsp; RTE &nbsp;·&nbsp; PMP &nbsp;·&nbsp; CSM
              </div>
              <div style={{ fontSize: 15, color: SLATE, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ margin: 0 }}>
                  Girijaa is a Senior Agile Coach and SAFe Program Consultant with over 15 years of experience helping organizations navigate complex transformations. She founded Optimized Solutions to bring practitioner-grade SAFe training and coaching directly to individuals and organizations ready to grow.
                </p>
                <p style={{ margin: 0 }}>
                  Her background spans federal government, financial services, and enterprise technology — serving as coach, trainer, Release Train Engineer, and strategic advisor across organizations of all sizes.
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                {['SAFe SPC 6.0', 'RTE', 'PMP', 'CSM', 'POPM', 'SSM', 'SA', 'SASM'].map(c => (
                  <span key={c} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: NAVY, padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700 }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competencies */}
      <section style={{ background: '#fff', padding: '60px 20px', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: GOLD, textTransform: 'uppercase', marginBottom: 10 }}>Expertise</div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontFamily: 'Georgia, serif', color: NAVY, margin: '0 0 32px' }}>
            Core Competencies
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {COMPETENCIES.map((c) => (
              <span key={c} style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: NAVY, padding: '8px 16px', borderRadius: 100, fontSize: 14, fontWeight: 600 }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: NAVY, color: '#fff', padding: '64px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontFamily: 'Georgia, serif', margin: '0 0 16px' }}>
            Ready to Transform Your Organization?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', margin: '0 0 36px', lineHeight: 1.7 }}>
            Whether you need SAFe certification training, executive coaching, or a full-scale Agile transformation partner — we're here to help.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/#contact" style={{ background: GOLD, color: '#fff', padding: '14px 32px', borderRadius: 4, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              Let's Talk
            </a>
            <a href="/quick-register" style={{ background: 'transparent', color: '#fff', padding: '14px 32px', borderRadius: 4, fontSize: 15, fontWeight: 700, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.5)' }}>
              View Certifications
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
