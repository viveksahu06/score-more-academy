'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { courses } from '@/lib/data/courses';
import { testimonials } from '@/lib/data/testimonials';

const PageScene = dynamic(() => import('@/components/3d/PageScene').then(mod => ({ default: mod.default })), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 85% 15%, rgba(147,80,115,0.12), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(80,45,85,0.10), transparent 60%)' }} />
  ),
});

// Import scene config
import { sceneConfigs } from '@/components/3d/PageScene';
import { CheckCircleIcon } from '@/components/ui/Icons';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / 125;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [form, setForm] = useState({ name: '', phone: '', classFor: '12th' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setFormStatus('loading');
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentName: form.name, parentName: '', mobile: form.phone, classApplying: form.classFor }) });
      if (res.ok) { setFormStatus('success'); setForm({ name: '', phone: '', classFor: '12th' }); }
      else setFormStatus('error');
    } catch { setFormStatus('error'); }
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] border-b-[3px] border-ink">
        {/* BG radials */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 85% 15%, rgba(147,80,115,0.14), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 90%, rgba(80,45,85,0.10), transparent 60%)' }} />
        {/* Watermark */}
        <div className="absolute -bottom-[120px] -right-[40px] pointer-events-none select-none opacity-[0.04] leading-[0.8]" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(200px, 40vw, 520px)', color: 'var(--ink)' }}>SM</div>

        {/* 3D Canvas */}
        <PageScene config={sceneConfigs.home} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-[56px] pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.95fr] gap-12 lg:gap-16 items-center">
            {/* Left — Text */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <span className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-blood rounded-full mb-4" style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--blood)' }}>
                  <span className="w-[7px] h-[7px] rounded-full bg-blood" style={{ animation: 'livepulse 1.6s ease-in-out infinite' }} />
                  Admissions Open · 2025-26
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-4"
                style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(40px, 6.5vw, 92px)', lineHeight: 0.88, letterSpacing: '-0.015em', color: 'var(--ink)' }}
              >
                Score More<br />in{' '}
                <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--saffron)', letterSpacing: '-0.02em' }}>
                  Commerce.
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="text-ink-2 text-md leading-relaxed max-w-[520px] mb-5">
                Katni&apos;s premier Commerce coaching for Class 11th & 12th. Expert faculty, proven Board results, and the personal attention your child deserves.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }} className="flex flex-wrap items-center gap-5 mb-6">
                <Link href="/courses" className="btn-primary">
                  View Courses <span className="arr">→</span>
                </Link>
                <a href="tel:+917622422098" className="btn-secondary">
                  Call: 076224 22098
                </a>
              </motion.div>

              {/* Stats strip */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="grid grid-cols-4 border-t border-ink/15 pt-4 mt-1">
                {[
                  { val: 150, suffix: '+', label: 'Students' },
                  { val: 91, suffix: '%', label: 'Avg Score' },
                  { val: 8, suffix: '+', label: 'Years' },
                  { val: 4, suffix: '', label: 'Batches' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-1 pr-4 border-r border-ink/10 last:border-r-0">
                    <strong style={{ fontFamily: 'var(--display)', fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 400, lineHeight: 1, color: 'var(--ink)' }}>
                      <AnimatedCounter target={s.val} suffix={s.suffix} />
                    </strong>
                    <span className="text-ink-3 text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: 'var(--mono)' }}>{s.label}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Poster Card (editorial style tilted card) */}
            <motion.div initial={{ opacity: 0, rotate: 0, scale: 0.9 }} animate={{ opacity: 1, rotate: 1.5, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="block mt-10 lg:mt-0">
              <div className="border-[3px] border-ink relative overflow-hidden" style={{ transform: 'rotate(1.5deg)', boxShadow: '12px 12px 0 var(--ink), 12px 12px 0 4px var(--saffron)' }}>
                {/* Top band */}
                <div className="bg-saffron-deep text-paper px-5 py-2.5 border-b-2 border-ink flex justify-between" style={{ fontFamily: 'var(--mono)', fontSize: '10.5px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                  <span>Score More Academy</span>
                  <span>Est. 2018</span>
                </div>
                {/* Image area — Hero Photo */}
                <div className="aspect-[4/3] relative overflow-hidden bg-paper-3">
                  <img
                    src="/images/homepage-hero.avif"
                    alt="Classroom Coaching"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Bottom band */}
                <div className="bg-ink text-paper px-6 py-5 text-center">
                  <p className="text-saffron-2 mb-2" style={{ fontFamily: 'var(--mono)', fontSize: '10.5px', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
                    Board Results
                  </p>
                  <p style={{ fontFamily: 'var(--display)', fontSize: '20px', lineHeight: 1.2, color: 'var(--paper)' }}>
                    91% Average · Multiple Toppers
                  </p>
                </div>
                {/* Stamp */}
                <div className="absolute top-12 -right-4 bg-blood text-paper px-6 py-2 border-2 border-paper z-10" style={{ transform: 'rotate(15deg)', fontFamily: 'var(--condensed)', fontWeight: 700, fontSize: '13px', letterSpacing: '0.22em', textTransform: 'uppercase', boxShadow: '0 0 0 2px var(--blood)' }}>
                  Admissions Open
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <div className="bg-ink text-paper py-5 overflow-hidden border-b-4 border-saffron" style={{ borderTop: '4px solid var(--saffron)' }}>
        <div className="marquee-track" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(20px, 3vw, 32px)', letterSpacing: '0.015em' }}>
          {[...Array(2)].map((_, j) => (
            <span key={j} className="flex items-center gap-12">
              {['Score More Academy', 'Commerce Class 11th', 'Commerce Class 12th', 'Board Exam Coaching', 'Katni, MP', 'Admissions Open'].map((t, i) => (
                <span key={i} className="flex items-center gap-12">
                  <span className={i % 2 === 0 ? 'text-saffron-2' : 'text-paper'}>{t}</span>
                  <span className="text-green-2 text-[18px]">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ===== COURSE PREVIEW ===== */}
      <section className="section-cream py-24 lg:py-32">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="eyebrow">Our Programs</span>
              <h2 className="display-heading" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                Courses Built for{' '}
                <em>Excellence</em>
              </h2>
              <p className="lead mx-auto mt-5 text-center">Comprehensive Commerce coaching with proven teaching methodology and consistent Board exam results.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course, i) => (
              <FadeIn key={course.id} delay={i * 0.12}>
                <div className={`card p-0 h-full flex flex-col relative ${course.popular ? '' : ''}`}>
                  {course.popular && (
                    <div className="absolute -top-3 -right-3 bg-gold text-ink px-4 py-1.5 border-2 border-ink z-10" style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, boxShadow: '3px 3px 0 var(--ink)' }}>
                      Most Popular
                    </div>
                  )}

                  {/* Card header */}
                  <div className="p-6 pb-4 border-b-2 border-ink/30">
                    <span className="text-3xl mb-3 block">{course.icon}</span>
                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', lineHeight: 1.1, color: 'var(--ink)' }}>{course.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-ink bg-paper" style={{ fontFamily: 'var(--mono)' }}>Class {course.class}</span>
                      <span className="px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-ink/30 text-ink-3" style={{ fontFamily: 'var(--mono)' }}>{course.duration}</span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-ink-2 text-sm leading-relaxed mb-5">{course.description}</p>

                    <ul className="space-y-2 mb-6 flex-grow">
                      {course.highlights.slice(0, 4).map((h) => (
                        <li key={h} className="flex items-start gap-2.5 text-sm text-ink-2">
                          <span className="text-green mt-0.5">✓</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3 mt-auto">
                      <Link href="/fee-timing" className="btn-secondary text-[12px] flex-1 justify-center pb-1">View Fees</Link>
                      <Link href="/inquiry" className="btn-pill flex-1 justify-center">Enroll</Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section-dark py-24 lg:py-32">
        <div className="container relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="eyebrow on-dark">Why Score More?</span>
              <h2 className="display-heading on-dark" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                What Makes Us <em>Different</em>
              </h2>
              <p className="lead on-dark mx-auto mt-5 text-center">The Score More difference — why parents and students trust us.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 max-w-[980px] mx-auto border-t border-[rgba(248,244,233,0.18)]">
            {[
              { num: '01', title: 'Small Batches', desc: 'Limited students per batch. Personal attention guaranteed. No student left behind.' },
              { num: '02', title: 'Expert Faculty', desc: '8-15+ years experienced teachers. Subject matter experts with Board exam mastery.' },
              { num: '03', title: 'Board Focused', desc: 'CBSE-aligned curriculum. Previous year papers. Mock tests. Exam strategy coaching.' },
              { num: '04', title: 'Proven Results', desc: '91% average Board score. Multiple toppers every year. Consistent excellence.' },
              { num: '05', title: 'Doubt Sessions', desc: 'Dedicated doubt-clearing before every exam. No question goes unanswered.' },
              { num: '06', title: 'Study Material', desc: 'Comprehensive notes, curated question banks, and chapter-wise assignments included.' },
            ].map((f, i) => (
              <FadeIn key={f.num} delay={i * 0.08}>
                <div className="flex gap-6 py-8 px-4 border-b border-[rgba(248,244,233,0.18)] hover:bg-[rgba(147,80,115,0.08)] transition-all hover:pl-6 cursor-default">
                  <span className="text-saffron-2 flex-shrink-0" style={{ fontFamily: 'var(--display)', fontSize: '48px', lineHeight: 0.85 }}>{f.num}</span>
                  <div>
                    <h3 className="text-paper text-lg font-semibold mb-1" style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.05em' }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,244,233,0.7)' }}>{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-light py-24 lg:py-32">
        <div className="container">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="eyebrow">Testimonials</span>
              <h2 className="display-heading" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>
                What Students{' '}<em>Say</em>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.12}>
                <div className="card p-6 h-full flex flex-col">
                  <p className="text-ink-2 text-[15px] leading-relaxed flex-grow mb-5 italic" style={{ fontFamily: 'Georgia, serif' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t-2 border-ink/10">
                    <div className="w-10 h-10 bg-saffron-deep text-paper flex items-center justify-center text-sm font-bold border-2 border-ink" style={{ fontFamily: 'var(--display)' }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-ink text-sm font-semibold">{t.name}</p>
                      <p className="text-ink-3 text-xs" style={{ fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>{t.role}</p>
                    </div>
                    {t.score && (
                      <span className="ml-auto px-2.5 py-1 bg-gold text-ink text-xs font-bold border-2 border-ink" style={{ fontFamily: 'var(--display)' }}>
                        {t.score}%
                      </span>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="text-center mt-10">
              <Link href="/results" className="btn-secondary">View All Results →</Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="section-dark py-20 lg:py-28">
        <div className="container relative z-10 max-w-[700px] text-center">
          <FadeIn>
            <span className="eyebrow on-dark">Limited Seats</span>
            <h2 className="display-heading on-dark mb-5" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Seats Filling Fast —{' '}
              <em>Act Now</em>
            </h2>
            <p className="lead on-dark mx-auto text-center mb-10">Don&apos;t wait. Fill in your details and our team will reach out within 24 hours.</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            {formStatus === 'success' ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-paper p-8 border-2 border-ink text-center" style={{ boxShadow: 'var(--shadow-hard)' }}>
                <CheckCircleIcon className="w-10 h-10 mx-auto mb-3 text-green" />
                <h3 style={{ fontFamily: 'var(--display)', fontSize: '24px', color: 'var(--green)' }}>Inquiry Sent!</h3>
                <p className="text-ink-2 text-sm mt-2">We&apos;ll contact you within 24 hours. Call <a href="tel:+917622422098" className="text-saffron-deep font-semibold">076224 22098</a></p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-paper p-6 sm:p-8 border-2 border-ink text-left" style={{ boxShadow: 'var(--shadow-hard)' }}>
                <div className="space-y-4">
                  <input type="text" required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-editorial" />
                  <input type="tel" required placeholder="Phone (WhatsApp preferred)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-editorial" />
                  <div className="flex gap-3">
                    {['11th', '12th'].map((cls) => (
                      <button key={cls} type="button" onClick={() => setForm({ ...form, classFor: cls })} className={`flex-1 py-3 border-2 border-ink text-sm font-semibold transition-all ${form.classFor === cls ? 'bg-ink text-paper shadow-[3px_3px_0_var(--ink)]' : 'bg-paper text-ink hover:bg-paper-2'}`} style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        Class {cls}
                      </button>
                    ))}
                  </div>
                  <button type="submit" disabled={formStatus === 'loading'} className="w-full btn-primary justify-center disabled:opacity-50">
                    {formStatus === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Sending...
                      </span>
                    ) : (<>SEND INQUIRY <span className="arr">→</span></>)}
                  </button>
                  {formStatus === 'error' && <p className="text-blood text-sm text-center">Something went wrong. Please try again.</p>}
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}
