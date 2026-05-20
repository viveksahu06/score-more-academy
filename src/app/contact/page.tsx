'use client';
import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { sceneConfigs } from '@/components/3d/PageScene';

const PageScene = dynamic(() => import('@/components/3d/PageScene'), { ssr: false });

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>{children}</motion.div>;
}

import { PhoneIcon, WhatsAppIcon, MapPinIcon, MailIcon } from '@/components/ui/Icons';

const contactCards = [
  { icon: PhoneIcon, title: 'Call Us', value: '076224 22098', href: 'tel:+917622422098' },
  { icon: WhatsAppIcon, title: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/917622422098' },
  { icon: MapPinIcon, title: 'Visit Us', value: 'Katni, Madhya Pradesh', href: '#map' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setStatus('success'); setForm({ name: '', phone: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <div>
      <section className="section-cream py-20 lg:py-28 relative overflow-hidden">
        <PageScene config={sceneConfigs.contact} />
        <div className="container text-center relative z-10">
          <FadeIn>
            <span className="eyebrow">Contact</span>
            <h1 className="display-heading" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>Get in <em>Touch</em></h1>
            <p className="lead mx-auto mt-5 text-center">Have a question or ready to enroll? We&apos;d love to hear from you.</p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="section-light py-12">
        <div className="container max-w-[800px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {contactCards.map((c, i) => (
              <FadeIn key={c.title} delay={i * 0.1}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="card p-5 text-center block">
                  <c.icon className="w-7 h-7 mx-auto mb-2 text-saffron-deep" />
                  <h3 className="text-ink text-sm font-semibold" style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.05em' }}>{c.title}</h3>
                  <p className="text-ink-2 text-sm mt-1">{c.value}</p>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="section-cream py-20">
        <div className="container max-w-[960px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn>
              <div>
                <div id="map" className="border-2 border-ink overflow-hidden mb-5" style={{ boxShadow: 'var(--shadow-hard)', height: '300px' }}>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58726.84!2d80.36!3d23.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981611e4a94c5e5%3A0x4a0c2b5f3f8e6a0!2sKatni%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Score More Academy Location" />
                </div>
                <div className="card-subtle p-5">
                  <h3 className="text-[11px] tracking-[0.2em] uppercase text-saffron-deep mb-4" style={{ fontFamily: 'var(--mono)' }}>Operating Hours</h3>
                  <div className="flex justify-between py-2 border-b border-ink/10"><span className="text-ink-2 text-sm">Monday – Saturday</span><span className="text-ink text-sm font-medium">7 AM – 8 PM</span></div>
                  <div className="flex justify-between py-2"><span className="text-ink-2 text-sm">Sunday</span><span className="text-ink text-sm font-medium">9 AM – 1 PM</span></div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              {status === 'success' ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-8 text-center flex items-center justify-center h-full">
                  <div>
                    <MailIcon className="w-10 h-10 mx-auto mb-3 text-green" />
                    <h3 style={{ fontFamily: 'var(--display)', fontSize: '22px', color: 'var(--green)' }}>Message Sent!</h3>
                    <p className="text-ink-2 text-sm mt-2">We&apos;ll get back to you soon.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
                  <h3 className="mb-6" style={{ fontFamily: 'var(--display)', fontSize: '22px' }}>Send a Message</h3>
                  <div className="space-y-5">
                    <div><label className="block text-ink-2 text-sm font-medium mb-1.5">Name <span className="text-saffron-deep">*</span></label><input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-editorial" /></div>
                    <div><label className="block text-ink-2 text-sm font-medium mb-1.5">Phone <span className="text-saffron-deep">*</span></label><input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your phone" className="input-editorial" /></div>
                    <div><label className="block text-ink-2 text-sm font-medium mb-1.5">Message</label><textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className="input-editorial resize-none" /></div>
                    <button type="submit" disabled={status === 'loading'} className="w-full btn-primary justify-center disabled:opacity-50">{status === 'loading' ? 'Sending...' : 'SEND MESSAGE'}</button>
                    {status === 'error' && <p className="text-blood text-sm text-center">Something went wrong.</p>}
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
