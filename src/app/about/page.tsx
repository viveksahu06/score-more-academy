'use client';

import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { faculty } from '@/lib/data/faculty';
import { sceneConfigs } from '@/components/3d/PageScene';

const PageScene = dynamic(() => import('@/components/3d/PageScene'), { ssr: false });

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>{children}</motion.div>;
}

const milestones = [
  { year: '2018', title: 'Founded', desc: 'Score More Academy established with a vision for quality Commerce coaching in Katni.' },
  { year: '2019', title: 'First Batch', desc: '15 students enrolled in the very first batch. The journey of excellence began.' },
  { year: '2020', title: 'Went Online', desc: 'Successfully transitioned to online classes during COVID-19.' },
  { year: '2021', title: '50+ Students', desc: 'Crossed the 50-student mark as word spread about our quality.' },
  { year: '2022', title: 'First 90%+ Results', desc: 'Students achieved 90%+ scores in Board exams for the first time.' },
  { year: '2023', title: 'Weekend Batches', desc: 'Launched weekend batches to accommodate more students.' },
  { year: '2024', title: '100+ Students', desc: 'Reached the 100-student milestone with growing reputation.' },
  { year: '2025', title: '4 Active Batches', desc: 'Expanded to 4 batches with 150+ students and a legacy of toppers.' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="section-cream py-20 lg:py-28 relative overflow-hidden">
        <PageScene config={sceneConfigs.about} />
        <div className="container text-center relative z-10">
          <FadeIn>
            <span className="eyebrow">Our Story</span>
            <h1 className="display-heading" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>About <em>Score More</em></h1>
            <p className="lead mx-auto mt-5 text-center">From a small classroom with 5 students to Katni&apos;s most trusted Commerce coaching — built on passion, dedication, and results.</p>
          </FadeIn>
        </div>
      </section>

      {/* Founding Story */}
      <section className="section-light py-20">
        <div className="container max-w-[800px]">
          <FadeIn>
            <div className="card p-8 md:p-12 relative">
              <div className="absolute -top-3 -left-3 bg-saffron-deep text-paper px-4 py-1 border-2 border-ink z-10" style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                The Beginning
              </div>
              <p className="text-ink-2 text-base md:text-lg leading-relaxed mb-5">
                Score More Academy was born from a belief — every Commerce student in Katni deserves quality coaching. Founded by <strong className="text-ink">Prof. Rajendra Sahu</strong>, a veteran Accountancy teacher with 15+ years of experience, the academy started in 2018 with just 5 students.
              </p>
              <p className="text-ink-2 text-base md:text-lg leading-relaxed mb-6">
                Today, we&apos;ve coached <strong className="text-ink">150+ students</strong> with an average Board score of <strong className="text-ink">91%</strong>. Our success is rooted in small batches, individual attention, and making complex topics simple.
              </p>
              <p className="text-ink-3 text-sm italic" style={{ fontFamily: 'Georgia, serif' }}>
                &ldquo;Every student who walks through our door is a future topper.&rdquo; — Prof. Rajendra Sahu
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Faculty */}
      <section className="section-cream py-20 lg:py-28">
        <div className="container max-w-[960px]">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow">Our Team</span>
              <h2 className="display-heading" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>Meet the <em>Faculty</em></h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculty.map((f, i) => (
              <FadeIn key={f.id} delay={i * 0.1}>
                <div className="card-subtle p-6 flex gap-4">
                  <div className="w-14 h-14 bg-saffron-deep text-paper flex items-center justify-center text-lg border-2 border-ink flex-shrink-0" style={{ fontFamily: 'var(--display)' }}>
                    {f.name.split(' ').slice(-1)[0].charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-ink font-semibold" style={{ fontFamily: 'var(--condensed)', fontSize: '18px', letterSpacing: '0.03em' }}>{f.name}</h3>
                    <div className="flex flex-wrap gap-1.5 mt-1.5 mb-3">
                      <span className="px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase border border-ink bg-paper text-ink" style={{ fontFamily: 'var(--mono)' }}>{f.subject}</span>
                      <span className="px-2 py-0.5 text-[9px] tracking-[0.15em] uppercase border border-ink/30 text-ink-3" style={{ fontFamily: 'var(--mono)' }}>{f.experience} yrs</span>
                    </div>
                    <p className="text-ink-2 text-sm leading-relaxed">{f.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-dark py-20 lg:py-28">
        <div className="container max-w-[800px] relative z-10">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="eyebrow on-dark">Milestones</span>
              <h2 className="display-heading on-dark" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>Our <em>Journey</em></h2>
            </div>
          </FadeIn>
          <div className="border-t border-[rgba(244,235,215,0.18)]">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.06}>
                <div className="flex gap-8 py-7 border-b border-[rgba(244,235,215,0.18)] hover:bg-[rgba(224,101,30,0.06)] hover:pl-4 transition-all">
                  <span className="text-saffron-2 flex-shrink-0 w-[80px]" style={{ fontFamily: 'var(--display)', fontSize: '32px', lineHeight: 1 }}>{m.year}</span>
                  <div>
                    <h3 className="text-paper text-base font-semibold mb-1" style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.05em' }}>{m.title}</h3>
                    <p className="text-sm" style={{ color: 'rgba(244,235,215,0.65)' }}>{m.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-light py-20">
        <div className="container max-w-[960px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="card p-8">
                <div className="inline-block px-2.5 py-1 bg-paper-2 border border-green text-green mb-4" style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Mission</div>
                <p className="text-ink-2 text-[15px] leading-relaxed">To provide the highest quality Commerce coaching in Katni with personal attention, expert faculty, and a result-oriented approach.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="card p-8">
                <div className="inline-block px-2.5 py-1 bg-paper-2 border border-saffron-deep text-saffron-deep mb-4" style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Vision</div>
                <p className="text-ink-2 text-[15px] leading-relaxed">To become the most trusted name in Commerce education in Madhya Pradesh, producing toppers and confident professionals.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-cream py-16">
        <div className="container text-center">
          <FadeIn>
            <h2 className="display-heading mb-5" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Ready to be part of <em>our story?</em></h2>
            <Link href="/inquiry" className="btn-primary">Join Now <span className="arr">→</span></Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
