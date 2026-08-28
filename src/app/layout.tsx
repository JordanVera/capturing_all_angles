import type { Metadata } from 'next';
import { IBM_Plex_Mono, Inter_Tight } from 'next/font/google';
import { BRAND } from '@/lib/site';
import './globals.css';

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
});

const interTight = Inter_Tight({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-inter-tight',
});

export const metadata: Metadata = {
  title: BRAND.title,
  description: BRAND.description,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${plexMono.variable} ${interTight.variable} h-full antialiased`}
    >
      <body
        className={`${plexMono.className} min-h-full bg-black text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
