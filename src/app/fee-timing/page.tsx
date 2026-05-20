'use client';
import { useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { feeStructure, batches } from '@/lib/data/batches';
import { sceneConfigs } from '@/components/3d/PageScene';

const PageScene = dynamic(() => import('@/components/3d/PageScene'), { ssr: false });

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>{children}</motion.div>;
}

export default function FeeTimingPage() {
  return (
    <div>
      <section className="section-cream py-20 lg:py-28 relative overflow-hidden">
        <PageScene config={sceneConfigs.feeTiming} />
        <div className="container text-center relative z-10">
          <FadeIn>
            <span className="eyebrow">Pricing</span>
            <h1 className="display-heading" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>Fees & <em>Timing</em></h1>
            <p className="lead mx-auto mt-5 text-center">Transparent pricing with flexible payment options.</p>
          </FadeIn>
        </div>
      </section>

      {/* Fee Cards */}
      <section className="section-light py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {feeStructure.map((fee, i) => (
              <FadeIn key={fee.courseId} delay={i * 0.12}>
                <div className={`card p-0 h-full flex flex-col relative ${fee.popular ? '' : ''}`}>
                  {fee.popular && (
                    <div className="absolute -top-3 -right-3 bg-gold text-ink px-4 py-1.5 border-2 border-ink z-10" style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, boxShadow: '3px 3px 0 var(--ink)' }}>Most Popular</div>
                  )}
                  <div className="p-6 border-b-2 border-ink bg-paper-2">
                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '20px', lineHeight: 1.1 }}>{fee.courseName}</h3>
                    <div className="mt-4">
                      <span className="text-ink-3 text-sm">Starting at</span>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span style={{ fontFamily: 'var(--display)', fontSize: '42px', lineHeight: 1, color: 'var(--ink)' }}>₹{fee.monthly.toLocaleString()}</span>
                        <span className="text-ink-3 text-sm" style={{ fontFamily: 'var(--mono)' }}>/month</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-ink/10">
                        <span className="text-ink-2 text-sm">Quarterly</span>
                        <span className="text-ink font-semibold" style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.05em' }}>₹{fee.quarterly.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-ink/10">
                        <span className="text-ink-2 text-sm">Annual</span>
                        <span className="text-ink font-semibold" style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.05em' }}>₹{fee.annual.toLocaleString()}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {fee.includes.map((inc) => (<li key={inc} className="flex items-start gap-2 text-sm text-ink-2"><span className="text-green mt-0.5">✓</span>{inc}</li>))}
                    </ul>
                    <Link href="/inquiry" className="btn-pill w-full justify-center mt-auto">Enroll Now</Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="text-center text-ink-3 text-sm mt-8 italic" style={{ fontFamily: 'Georgia, serif' }}>Fees updated yearly — contact for current session fees</p>
          </FadeIn>
        </div>
      </section>

      {/* Batch Timings */}
      <section className="section-cream py-20">
        <div className="container max-w-[800px]">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="eyebrow">Schedule</span>
              <h2 className="display-heading" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>Batch <em>Timings</em></h2>
            </div>
          </FadeIn>
          <div className="space-y-3">
            {batches.map((b, i) => (
              <FadeIn key={b.id} delay={i * 0.08}>
                <div className="card-subtle p-0 overflow-hidden">
                  <div className="grid grid-cols-[140px_1fr_1fr_80px] sm:grid-cols-[180px_1fr_1fr_100px] items-center gap-2 sm:gap-4 p-4 sm:p-5">
                    <h3 className="text-ink font-semibold text-sm" style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.05em' }}>{b.name}</h3>
                    <span className="text-ink-2 text-sm">{b.days}</span>
                    <span className="text-ink text-sm font-medium">{b.time}</span>
                    <span className={`text-[10px] tracking-[0.15em] uppercase text-center py-1 px-2 border ${b.seatsStatus === 'Limited' ? 'text-saffron-deep border-saffron-deep bg-saffron-deep/5' : b.seatsStatus === 'Open' ? 'text-green border-green bg-green/5' : 'text-blood border-blood bg-blood/5'}`} style={{ fontFamily: 'var(--mono)', fontWeight: 600 }}>{b.seatsStatus}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <div className="text-center mt-10">
              <Link href="/inquiry" className="btn-primary">Book a Free Demo Class <span className="arr">→</span></Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
