import Link from 'next/link';

const quickLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/results', label: 'Results' },
  { href: '/fee-timing', label: 'Fees & Timing' },
  { href: '/about', label: 'About Us' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper border-t-4 border-saffron relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,var(--saffron-deep),transparent_70%)] opacity-10 pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-[56px] py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 border-2 border-paper bg-saffron-deep flex items-center justify-center">
                <span className="text-paper font-bold text-sm" style={{ fontFamily: 'var(--display)' }}>SM</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-paper text-sm" style={{ fontFamily: 'var(--display)' }}>SCORE MORE</span>
                <span className="text-saffron-2 text-[9px] tracking-[0.16em] uppercase" style={{ fontFamily: 'var(--mono)' }}>Academy · Katni</span>
              </div>
            </Link>
            <p className="text-[rgba(244,235,215,0.65)] text-sm leading-relaxed mb-5 max-w-[260px]">
              Katni&apos;s premier Commerce coaching. Building futures through quality education.
            </p>
            <a href="tel:+917622422098" className="text-saffron-2 hover:text-saffron transition-colors text-sm font-medium" style={{ fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>
              076224 22098
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-5" style={{ fontFamily: 'var(--mono)' }}>Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[rgba(244,235,215,0.7)] hover:text-paper text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-5" style={{ fontFamily: 'var(--mono)' }}>Our Courses</h3>
            <ul className="space-y-3">
              <li><Link href="/courses#commerce-11" className="text-[rgba(244,235,215,0.7)] hover:text-paper text-sm transition-colors">Commerce Class 11th</Link></li>
              <li><Link href="/courses#commerce-12" className="text-[rgba(244,235,215,0.7)] hover:text-paper text-sm transition-colors">Commerce Class 12th</Link></li>
              <li><Link href="/courses#crash-course" className="text-[rgba(244,235,215,0.7)] hover:text-paper text-sm transition-colors">Board Crash Course</Link></li>
              <li><Link href="/inquiry" className="text-saffron-2 hover:text-saffron text-sm font-medium transition-colors">Enroll Now →</Link></li>
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h3 className="text-[11px] tracking-[0.22em] uppercase text-saffron-2 mb-5" style={{ fontFamily: 'var(--mono)' }}>Visit Us</h3>
            <address className="not-italic space-y-3 text-sm text-[rgba(244,235,215,0.7)]">
              <p>Score More Academy<br />Katni, Madhya Pradesh<br />India</p>
              <p><span className="text-[rgba(244,235,215,0.4)]">Mon – Sat:</span> 7 AM – 8 PM<br /><span className="text-[rgba(244,235,215,0.4)]">Sunday:</span> 9 AM – 1 PM</p>
              <a href="https://wa.me/917622422098" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-green-2 hover:text-[#34D399] transition-colors font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp Us
              </a>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[rgba(244,235,215,0.12)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[rgba(244,235,215,0.4)] text-xs" style={{ fontFamily: 'var(--mono)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} Score More Academy, Katni
          </p>
          <div className="flex items-center gap-4">
            <Link href="/inquiry" className="text-[rgba(244,235,215,0.4)] hover:text-saffron-2 text-xs transition-colors">Admissions</Link>
            <span className="text-[rgba(244,235,215,0.15)]">·</span>
            <Link href="/contact" className="text-[rgba(244,235,215,0.4)] hover:text-saffron-2 text-xs transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
