'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/results', label: 'Results' },
  { href: '/fee-timing', label: 'Fees' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/* Ticker strip at the very top */
function TopTicker() {
  const items = [
    'Commerce Coaching in Katni',
    'Class 11th & 12th',
    'Admissions Open 2025-26',
    'Board Results: 91% Average',
    '150+ Students Coached',
    'Small Batches · Personal Attention',
  ];
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="bg-ink text-paper overflow-hidden border-b-2 border-saffron py-2">
      <div className="marquee-track" style={{ gap: '56px' }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-[11px] tracking-[0.14em] uppercase"
            style={{ fontFamily: 'var(--mono)' }}
          >
            <span className="text-saffron-2 mr-3">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <TopTicker />
      <nav
        className={`sticky top-0 z-50 border-b-2 border-ink transition-all duration-300 ${
          scrolled
            ? 'bg-paper/95 backdrop-blur-md'
            : 'bg-paper/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-[56px]">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 border-2 border-ink bg-saffron-deep flex items-center justify-center shadow-[3px_3px_0_var(--ink)]">
                <span className="text-paper font-bold text-base" style={{ fontFamily: 'var(--display)' }}>
                  SM
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-ink font-normal text-[15px] leading-none" style={{ fontFamily: 'var(--display)' }}>
                  SCORE MORE
                </span>
                <span className="text-saffron-deep text-[9px] tracking-[0.18em] uppercase leading-none" style={{ fontFamily: 'var(--mono)' }}>
                  Academy · Est. 2018
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-1 text-[13px] font-medium tracking-[0.18em] uppercase text-ink hover:text-saffron-deep transition-colors"
                  style={{ fontFamily: 'var(--condensed)' }}
                >
                  {link.label}
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-saffron scale-x-0 origin-left hover:scale-x-100 transition-transform duration-300" />
                </Link>
              ))}
            </div>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link
                href="/inquiry"
                className="hidden sm:inline-flex btn-pill"
              >
                Join Now
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px]"
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-[2px] bg-ink"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  className="block w-6 h-[2px] bg-ink"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-[2px] bg-ink"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-paper" />
            <div className="relative flex flex-col items-center justify-center h-full gap-8 pt-20">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[36px] text-ink hover:text-saffron-deep transition-colors"
                    style={{ fontFamily: 'var(--display)', lineHeight: 1 }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <Link
                  href="/inquiry"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 btn-primary"
                >
                  JOIN NOW <span className="arr">→</span>
                </Link>
              </motion.div>
              <motion.a
                href="tel:+917622422098"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-2 text-ink-3 text-sm"
                style={{ fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}
              >
                076224 22098
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
