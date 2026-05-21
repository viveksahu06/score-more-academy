'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { sceneConfigs } from '@/components/3d/PageScene';
import { CheckCircleIcon } from '@/components/ui/Icons';

const PageScene = dynamic(() => import('@/components/3d/PageScene'), { ssr: false });

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>{children}</motion.div>;
}

export default function InquiryPage() {
  const [form, setForm] = useState({ studentName: '', parentName: '', mobile: '', classApplying: '12th', school: '', source: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.studentName || !form.parentName || !form.mobile || !form.classApplying) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/inquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setStatus('success'); setForm({ studentName: '', parentName: '', mobile: '', classApplying: '12th', school: '', source: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div>
      <section className="section-cream py-20 lg:py-28 relative overflow-hidden">
        <PageScene config={sceneConfigs.inquiry} />
        <div className="container text-center relative z-10">
          <FadeIn>
            <span className="eyebrow">Admissions</span>
            <h1 className="display-heading" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>Begin Your <em>Journey</em></h1>
            <p className="lead mx-auto mt-5 text-center">Fill out the form below and our team will reach out within 24 hours.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-light py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 max-w-[960px] mx-auto">
            {/* Form */}
            <FadeIn>
              {status === 'success' ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-10 text-center">
                  <CheckCircleIcon className="w-12 h-12 mx-auto mb-4 text-green" />
                  <h3 style={{ fontFamily: 'var(--display)', fontSize: '28px', color: 'var(--green)' }}>Inquiry Submitted!</h3>
                  <p className="text-ink-2 text-sm mt-3">Our team will call you within 24 hours. You can also reach us at <a href="tel:+917622422098" className="text-saffron-deep font-semibold">076224 22098</a></p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
                  <h3 className="mb-6" style={{ fontFamily: 'var(--display)', fontSize: '22px' }}>Admission Inquiry</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-ink-2 text-sm font-medium mb-1.5">Student Full Name <span className="text-saffron-deep">*</span></label>
                      <input type="text" required value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} placeholder="Enter student name" className="input-editorial" />
                    </div>
                    <div>
                      <label className="block text-ink-2 text-sm font-medium mb-1.5">Parent / Guardian Name <span className="text-saffron-deep">*</span></label>
                      <input type="text" required value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} placeholder="Enter parent name" className="input-editorial" />
                    </div>
                    <div>
                      <label className="block text-ink-2 text-sm font-medium mb-1.5">Mobile Number <span className="text-saffron-deep">*</span></label>
                      <input type="tel" required value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="WhatsApp preferred" className="input-editorial" />
                    </div>
                    <div>
                      <label className="block text-ink-2 text-sm font-medium mb-2">Class Applying For <span className="text-saffron-deep">*</span></label>
                      <div className="flex gap-3">
                        {['11th', '12th'].map((cls) => (
                          <button key={cls} type="button" onClick={() => setForm({ ...form, classApplying: cls })} className={`flex-1 py-3 border-2 border-ink text-sm font-semibold transition-all ${form.classApplying === cls ? 'bg-ink text-paper shadow-[3px_3px_0_var(--ink)]' : 'bg-paper text-ink hover:bg-paper-2'}`} style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                            Class {cls}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-ink-2 text-sm font-medium mb-1.5">Current School Name</label>
                      <input type="text" value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} placeholder="Optional" className="input-editorial" />
                    </div>
                    <div>
                      <label className="block text-ink-2 text-sm font-medium mb-1.5">How did you hear about us?</label>
                      <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="input-editorial">
                        <option value="">Select</option>
                        <option value="facebook">Facebook</option>
                        <option value="friend">Friend / Referral</option>
                        <option value="poster">Poster / Banner</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-ink-2 text-sm font-medium mb-1.5">Message / Query</label>
                      <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any questions?" className="input-editorial resize-none" />
                    </div>
                    <button type="submit" disabled={status === 'loading'} className="w-full btn-primary justify-center disabled:opacity-50">
                      {status === 'loading' ? 'Sending...' : (<>SEND INQUIRY <span className="arr">→</span></>)}
                    </button>
                    {status === 'error' && <p className="text-blood text-sm text-center">Something went wrong. Please try again.</p>}
                  </div>
                </form>
              )}
            </FadeIn>

            {/* Sidebar */}
            <FadeIn delay={0.15}>
              <div className="space-y-5">
                <div className="card-subtle p-5">
                  <h4 className="text-[11px] tracking-[0.2em] uppercase text-saffron-deep mb-4" style={{ fontFamily: 'var(--mono)' }}>Why Score More?</h4>
                  <ul className="space-y-3">
                    {['Small batches — personal attention', '91% average Board score', 'Experienced faculty (8-15+ yrs)', 'Free doubt-clearing sessions'].map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-ink-2"><span className="text-green mt-0.5">✓</span>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className="card-subtle p-5">
                  <h4 className="text-[11px] tracking-[0.2em] uppercase text-saffron-deep mb-3" style={{ fontFamily: 'var(--mono)' }}>Call Us</h4>
                  <a href="tel:+917622422098" className="text-ink font-semibold text-lg" style={{ fontFamily: 'var(--display)' }}>076224 22098</a>
                </div>
                <div className="card-subtle p-5">
                  <h4 className="text-[11px] tracking-[0.2em] uppercase text-saffron-deep mb-3" style={{ fontFamily: 'var(--mono)' }}>Hours</h4>
                  <p className="text-ink-2 text-sm">Mon – Sat: 7 AM – 8 PM</p>
                  <p className="text-ink-2 text-sm">Sunday: 9 AM – 1 PM</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
