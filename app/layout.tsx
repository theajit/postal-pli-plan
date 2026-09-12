import type { Metadata } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './seo.css';
import './polish.css';
import './india-post-theme.css';
import './quotation.css';
import './quotation-modal.css';
import './compact-results.css';
import './calculation-details.css';
import './calculation-details-wide.css';
import './font-awesome-icons.css';
import './accessibility.css';
import './trust-comparison.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: { default: 'PostalPlan — PLI & RPLI Calculator', template: '%s | PostalPlan' },
  description: 'Estimate Postal Life Insurance premium, maturity value, bonus and gain.',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          id="font-awesome-kit"
          src="https://kit.fontawesome.com/3a7f112929.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
