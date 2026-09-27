import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Cormorant_Garamond, Oooh_Baby } from 'next/font/google';

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const ooohBaby = Oooh_Baby({
  variable: '--font-script',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Mini Mystic Palette',
    template: '%s | Mini Mystic Palette',
  },
  description: 'Mini Mystic Palette — little worlds, big feelings.',
  applicationName: 'Mini Mystic Palette',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Mini Mystic Palette',
    description: 'Mini Mystic Palette — little worlds, big feelings.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mini Mystic Palette',
    description: 'Mini Mystic Palette — little worlds, big feelings.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${cormorant.variable} ${ooohBaby.variable}`}>
        {children}
      </body>
    </html>
  );
}
