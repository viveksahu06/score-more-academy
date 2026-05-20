'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { courses, subjects } from '@/lib/data/courses';
import { sceneConfigs } from '@/components/3d/PageScene';

const PageScene = dynamic(() => import('@/components/3d/PageScene'), { ssr: false });

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>{children}</motion.div>;
}

function Accordion({ subject }: { subject: typeof subjects[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-subtle overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 sm:p-6 text-left group">
        <div className="flex items-center gap-4">
          <span className="text-2xl">{subject.icon}</span>
          <div>
            <h3 className="text-ink text-lg" style={{ fontFamily: 'var(--condensed)', fontWeight: 600, letterSpacing: '0.03em' }}>{subject.name}</h3>
            <p className="text-ink-3 text-sm mt-0.5 hidden sm:block">{subject.description.slice(0, 70)}...</p>
          </div>
        </div>
        <motion.svg animate={{ rotate: open ? 180 : 0 }} className="w-5 h-5 text-ink-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
            <div className="px-5 sm:px-6 pb-6 border-t-2 border-ink/10 pt-5">
              <p className="text-ink-2 text-sm leading-relaxed mb-5">{subject.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[11px] tracking-[0.2em] uppercase text-green font-semibold mb-3" style={{ fontFamily: 'var(--mono)' }}>Class 11th Chapters</h4>
                  <ul className="space-y-1.5">{subject.chapters11.map((ch, i) => (<li key={ch} className="text-ink-2 text-sm flex gap-2"><span className="text-ink-3 text-xs w-4">{i + 1}.</span>{ch}</li>))}</ul>
                </div>
                <div>
                  <h4 className="text-[11px] tracking-[0.2em] uppercase text-saffron-deep font-semibold mb-3" style={{ fontFamily: 'var(--mono)' }}>Class 12th Chapters</h4>
                  <ul className="space-y-1.5">{subject.chapters12.map((ch, i) => (<li key={ch} className="text-ink-2 text-sm flex gap-2"><span className="text-ink-3 text-xs w-4">{i + 1}.</span>{ch}</li>))}</ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <div>
      <section className="section-cream py-20 lg:py-28 relative overflow-hidden">
        <PageScene config={sceneConfigs.courses} />
        <div className="container text-center relative z-10">
          <FadeIn>
            <span className="eyebrow">Programs</span>
            <h1 className="display-heading" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>Our <em>Courses</em></h1>
            <p className="lead mx-auto mt-5 text-center">Comprehensive Commerce coaching designed to maximize your Board exam results.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-light py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course, i) => (
              <FadeIn key={course.id} delay={i * 0.12}>
                <div id={course.id} className="card p-0 h-full flex flex-col relative">
                  {course.popular && (
                    <div className="absolute -top-3 -right-3 bg-gold text-ink px-4 py-1.5 border-2 border-ink z-10" style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, boxShadow: '3px 3px 0 var(--ink)' }}>Most Popular</div>
                  )}
                  <div className="p-6 pb-4 border-b-2 border-ink bg-paper-2">
                    <span className="text-3xl mb-3 block">{course.icon}</span>
                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', lineHeight: 1.1 }}>{course.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-ink bg-paper" style={{ fontFamily: 'var(--mono)' }}>Class {course.class}</span>
                      <span className="px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-ink/30 text-ink-3" style={{ fontFamily: 'var(--mono)' }}>{course.duration}</span>
                      <span className="px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase border border-ink/30 text-ink-3" style={{ fontFamily: 'var(--mono)' }}>{course.batchType}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-ink-2 text-sm leading-relaxed mb-5">{course.description}</p>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {course.highlights.map((h) => (<li key={h} className="flex items-start gap-2 text-sm text-ink-2"><span className="text-green mt-0.5">✓</span>{h}</li>))}
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

      <section className="section-cream py-20 lg:py-28">
        <div className="container max-w-[800px]">
          <FadeIn><div className="text-center mb-12"><span className="eyebrow">Syllabus</span><h2 className="display-heading" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>Subject <em>Deep-Dive</em></h2></div></FadeIn>
          <div className="space-y-4">{subjects.map((s, i) => (<FadeIn key={s.name} delay={i * 0.1}><Accordion subject={s} /></FadeIn>))}</div>
          <FadeIn delay={0.3}>
            <div className="card-subtle p-5 sm:p-6 mt-8">
              <div className="flex items-start gap-4 text-left">
                <span className="text-2xl flex-shrink-0">🎓</span>
                <div>
                  <h3 className="text-ink text-lg" style={{ fontFamily: 'var(--condensed)', fontWeight: 600, letterSpacing: '0.03em' }}>Teaching Methodology</h3>
                  <p className="text-ink-2 text-sm mt-1 leading-relaxed">
                    NCERT-focused · Board pattern practice · Regular mock tests · Chapter-wise assignments · Dedicated doubt-clearing sessions
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-light py-16">
        <div className="container text-center">
          <FadeIn>
            <h2 className="display-heading mb-5" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Ready to <em>Score More?</em></h2>
            <Link href="/inquiry" className="btn-primary">Enroll Now <span className="arr">→</span></Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
