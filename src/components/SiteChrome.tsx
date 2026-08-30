'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HoverSound } from '@/components/HoverSound';
import { MobileMenu } from '@/components/MobileMenu';
import { MosaicLoadProvider } from '@/components/MosaicLoadContext';
import { Preloader } from '@/components/Preloader';

const bootedRoutes = new Set<string>();

type Props = {
  children: React.ReactNode;
  showPreloader?: boolean;
  lockScroll?: boolean;
  mosaicTileCount?: number;
};

export function SiteChrome({
  children,
  showPreloader = false,
  lockScroll = false,
  mosaicTileCount = 0,
}: Props) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [booting, setBooting] = useState(
    () => showPreloader && !bootedRoutes.has(pathname),
  );
  const done = useCallback(() => {
    bootedRoutes.add(pathname);
    setBooting(false);
  }, [pathname]);

  const chrome = (
    <div
      className={`relative min-h-[100dvh] bg-black text-foreground ${
        lockScroll ? 'overflow-x-clip md:overflow-hidden' : ''
      } ${menuOpen ? 'overflow-hidden' : ''}`}
    >
      {booting ? <Preloader onDone={done} /> : null}
      <HoverSound />
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
      <Footer />
    </div>
  );

  if (showPreloader) {
    return (
      <MosaicLoadProvider total={mosaicTileCount}>{chrome}</MosaicLoadProvider>
    );
  }

  return chrome;
}
