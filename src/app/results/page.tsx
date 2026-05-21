'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { results, aggregateStats } from '@/lib/data/results';
import { sceneConfigs } from '@/components/3d/PageScene';

const PageScene = dynamic(() => import('@/components/3d/PageScene'), { ssr: false });

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>{children}</motion.div>;
}
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => { if (!isInView) return; let s = 0; const step = target / 100; const t = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(s)); }, 16); return () => clearInterval(t); }, [isInView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const years = [0, 2025, 2024, 2023, 2022];

export default function ResultsPage() {
  const [activeYear, setActiveYear] = useState(0);
  const filtered = activeYear === 0 ? results : results.filter(r => r.year === activeYear);
  const top3 = [...filtered].sort((a, b) => b.score - a.score).slice(0, 3);
  const medals = ['🥇', '🥈', '🥉'];
  const medalColors = ['var(--gold)', '#C0C0C0', '#CD7F32'];

  return (
    <div>
      <section className="section-cream py-20 lg:py-28 relative overflow-hidden">
        <PageScene config={sceneConfigs.results} />
        <div className="container text-center relative z-10">
          <FadeIn>
            <span className="eyebrow">Results</span>
            <h1 className="display-heading" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>Our Results <span className="t-saffron" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Speak</span></h1>
            <p className="lead mx-auto mt-5 text-center">Consistent excellence in Board examinations year after year.</p>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="section-dark py-12">
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[800px] mx-auto text-center">
            {[{ v: aggregateStats.averageScore, s: '%', l: 'Avg Score' }, { v: aggregateStats.totalDistinctions, s: '', l: 'Distinctions' }, { v: aggregateStats.topScore, s: '%', l: 'Top Score' }, { v: aggregateStats.totalStudents, s: '+', l: 'Students' }].map((st) => (
              <FadeIn key={st.l}>
                <div>
                  <div style={{ fontFamily: 'var(--display)', fontSize: '40px', lineHeight: 1, color: 'var(--saffron-2)' }}><Counter target={st.v} suffix={st.s} /></div>
                  <span className="text-[10px] tracking-[0.18em] uppercase mt-2 block" style={{ fontFamily: 'var(--mono)', color: 'rgba(248,244,233,0.5)' }}>{st.l}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Year Filter + Grid */}
      <section className="section-light py-20">
        <div className="container">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {years.map((y) => (
                <button key={y} onClick={() => setActiveYear(y)} className={`px-5 py-2.5 border-2 border-ink text-sm transition-all ${activeYear === y ? 'bg-ink text-paper shadow-[3px_3px_0_var(--saffron-deep)]' : 'bg-paper text-ink hover:bg-paper-2'}`} style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {y === 0 ? 'All Years' : y}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Top 3 Podium */}
          {top3.length >= 3 && (
            <FadeIn>
              <div className="grid grid-cols-3 gap-4 max-w-[700px] mx-auto mb-12">
                {top3.map((r, i) => (
                  <div key={r.id} className="card p-5 text-center relative" style={{ borderColor: medalColors[i], boxShadow: `6px 6px 0 ${medalColors[i]}` }}>
                    <span className="text-3xl mb-2 block">{medals[i]}</span>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '36px', lineHeight: 1, color: 'var(--ink)' }}>{r.score}%</div>
                    <p className="text-ink text-sm font-semibold mt-2" style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.05em' }}>{r.name}</p>
                    <span className="text-[9px] tracking-[0.15em] uppercase text-ink-3 mt-1 block" style={{ fontFamily: 'var(--mono)' }}>{r.subject} · {r.year}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((r, i) => (
              <FadeIn key={r.id} delay={i * 0.04}>
                <div className="card-subtle p-4 flex items-center gap-4">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border-2 border-ink" style={{ fontFamily: 'var(--display)', fontSize: '20px', background: r.isTopper ? 'var(--gold)' : 'var(--paper)', color: 'var(--ink)' }}>
                    {r.score}%
                  </div>
                  <div className="min-w-0">
                    <p className="text-ink text-sm font-semibold truncate">{r.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] tracking-[0.12em] uppercase text-ink-3" style={{ fontFamily: 'var(--mono)' }}>{r.subject}</span>
                      <span className="text-ink-3/30">·</span>
                      <span className="text-[9px] tracking-[0.12em] uppercase text-ink-3" style={{ fontFamily: 'var(--mono)' }}>{r.year}</span>
                      {r.isTopper && <span className="text-sm">👑</span>}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cream py-16">
        <div className="container text-center">
          <FadeIn>
            <h2 className="display-heading mb-5" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Join Our League of <em>Toppers</em></h2>
            <Link href="/inquiry" className="btn-primary">Enroll Now <span className="arr">→</span></Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
