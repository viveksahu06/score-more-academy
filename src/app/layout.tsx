import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-condensed",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Score More Academy | Commerce Coaching in Katni",
    template: "%s | Score More Academy",
  },
  description:
    "Katni's premier Commerce coaching institute for Class 11th & 12th. Expert faculty, proven results, small batches. Join Score More Academy for Board exam excellence.",
  keywords: [
    "Commerce coaching Katni",
    "Score More Academy",
    "Commerce coaching class 11 Katni",
    "Commerce coaching class 12 Katni",
    "Best commerce teacher Katni",
    "Accountancy tuition Katni",
  ],
  authors: [{ name: "Score More Academy" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Score More Academy",
    title: "Score More Academy | Commerce Coaching in Katni",
    description:
      "Katni's premier Commerce coaching institute. Expert faculty, proven results, small batches.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        {/* Bowlby One & JetBrains Mono from Google Fonts (not available via next/font) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bowlby+One&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#F8F4E9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Score More Academy",
              description:
                "Commerce coaching institute for Class 11th and 12th in Katni, Madhya Pradesh",
              url: "https://scoremoreacademy.in",
              telephone: "+917622422098",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Katni",
                addressRegion: "Madhya Pradesh",
                addressCountry: "IN",
              },
              areaServed: "Katni",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
