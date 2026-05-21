'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { sceneConfigs } from '@/components/3d/PageScene';
import { BookOpenIcon, GraduationCapIcon, CalendarIcon, PenIcon, TrophyIcon, CalculatorIcon, UsersIcon, LightbulbIcon, TargetIcon, CameraIcon } from '@/components/ui/Icons';

const PageScene = dynamic(() => import('@/components/3d/PageScene'), { ssr: false });

type IconComp = ({ className }: { className?: string }) => React.JSX.Element;

function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>{children}</motion.div>;
}

const galleryItems: { id: number; cat: string; Icon: IconComp; caption: string; gradient: string; h: number }[] = [
  { id: 1, cat: 'Classroom', Icon: BookOpenIcon, caption: 'Interactive Commerce class in session', gradient: 'linear-gradient(135deg, #93507333, #F6DBC022)', h: 260 },
  { id: 2, cat: 'Students', Icon: GraduationCapIcon, caption: 'Board exam toppers 2024', gradient: 'linear-gradient(135deg, #502D5533, #B06E9022)', h: 320 },
  { id: 3, cat: 'Events', Icon: CalendarIcon, caption: 'Annual prize distribution ceremony', gradient: 'linear-gradient(135deg, #F6DBC033, #93507322)', h: 280 },
  { id: 4, cat: 'Classroom', Icon: PenIcon, caption: 'Mock test preparation session', gradient: 'linear-gradient(135deg, #502D5533, #93507322)', h: 300 },
  { id: 5, cat: 'Students', Icon: TrophyIcon, caption: 'Students celebrating results day', gradient: 'linear-gradient(135deg, #F6DBC033, #502D5522)', h: 240 },
  { id: 6, cat: 'Events', Icon: BookOpenIcon, caption: 'Parent-teacher meeting 2024', gradient: 'linear-gradient(135deg, #502D5533, #F6DBC022)', h: 320 },
  { id: 7, cat: 'Classroom', Icon: CalculatorIcon, caption: 'Accountancy practical class', gradient: 'linear-gradient(135deg, #93507333, #502D5522)', h: 260 },
  { id: 8, cat: 'Students', Icon: UsersIcon, caption: 'Group study session', gradient: 'linear-gradient(135deg, #502D5522, #F6DBC022)', h: 300 },
  { id: 9, cat: 'Events', Icon: CalendarIcon, caption: 'Orientation day for new batch', gradient: 'linear-gradient(135deg, #B06E9033, #93507322)', h: 280 },
  { id: 10, cat: 'Classroom', Icon: LightbulbIcon, caption: 'Doubt clearing session', gradient: 'linear-gradient(135deg, #F6DBC033, #502D5522)', h: 240 },
  { id: 11, cat: 'Students', Icon: UsersIcon, caption: 'Alumni meet 2024', gradient: 'linear-gradient(135deg, #502D5533, #93507322)', h: 310 },
  { id: 12, cat: 'Events', Icon: TargetIcon, caption: 'Career guidance workshop', gradient: 'linear-gradient(135deg, #93507333, #F6DBC022)', h: 270 },
];

const categories = ['All', 'Classroom', 'Events', 'Students'];

export default function GalleryPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [lightbox, setLightbox] = useState<typeof galleryItems[0] | null>(null);
  const filtered = activeCat === 'All' ? galleryItems : galleryItems.filter(g => g.cat === activeCat);

  return (
    <div>
      <section className="section-cream py-20 lg:py-28 relative overflow-hidden">
        <PageScene config={sceneConfigs.gallery} />
        <div className="container text-center relative z-10">
          <FadeIn>
            <span className="eyebrow">Gallery</span>
            <h1 className="display-heading" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>Life at <em>Score More</em></h1>
            <p className="lead mx-auto mt-5 text-center">A glimpse into our classrooms, events, and student life.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-light py-20">
        <div className="container">
          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCat(cat)} className={`px-5 py-2.5 border-2 border-ink text-sm transition-all ${activeCat === cat ? 'bg-ink text-paper shadow-[3px_3px_0_var(--saffron-deep)]' : 'bg-paper text-ink hover:bg-paper-2'}`} style={{ fontFamily: 'var(--condensed)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.05}>
                <div className="card-subtle p-0 overflow-hidden break-inside-avoid cursor-pointer group" onClick={() => setLightbox(item)}>
                  <div className="relative flex items-center justify-center" style={{ background: item.gradient, height: item.h, backgroundSize: 'cover' }}>
                    <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg, transparent 0 18px, rgba(80,45,85,0.03) 18px 19px)' }} />
                    <item.Icon className="w-12 h-12 relative z-10 text-ink/30 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="px-4 py-3 border-t-2 border-ink/10 flex justify-between items-center">
                    <p className="text-ink-2 text-sm">{item.caption}</p>
                    <span className="text-[9px] tracking-[0.12em] uppercase text-ink-3" style={{ fontFamily: 'var(--mono)' }}>{item.cat}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-ink/80 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="card max-w-[600px] w-full p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-center" style={{ background: lightbox.gradient, height: 350 }}>
                <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg, transparent 0 18px, rgba(80,45,85,0.03) 18px 19px)' }} />
                <lightbox.Icon className="w-20 h-20 relative z-10 text-ink/30" />
              </div>
              <div className="p-5 flex justify-between items-center border-t-2 border-ink">
                <p className="text-ink text-sm font-medium">{lightbox.caption}</p>
                <button onClick={() => setLightbox(null)} className="btn-pill text-[10px] py-1.5 px-3">Close</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="section-cream py-16">
        <div className="container text-center">
          <FadeIn>
            <h2 className="display-heading mb-5" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>Come <em>Visit Us</em></h2>
            <Link href="/contact" className="btn-primary">Contact Us <span className="arr">→</span></Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
