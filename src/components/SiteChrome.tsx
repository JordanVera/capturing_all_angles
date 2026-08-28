"use client";

import { useCallback, useState } from "react";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HoverSound } from "@/components/HoverSound";
import { MobileMenu } from "@/components/MobileMenu";
import { Preloader } from "@/components/Preloader";

let hasBooted = false;

type Props = {
  children: React.ReactNode;
  showPreloader?: boolean;
  lockScroll?: boolean;
};

export function SiteChrome({
  children,
  showPreloader = false,
  lockScroll = false,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [booting, setBooting] = useState(showPreloader && !hasBooted);
  const done = useCallback(() => {
    hasBooted = true;
    setBooting(false);
  }, []);

  return (
    <div
      className={`relative min-h-[100dvh] bg-black text-foreground ${
        lockScroll ? "overflow-x-clip md:overflow-hidden" : ""
      } ${menuOpen ? "overflow-hidden" : ""}`}
    >
      {booting ? <Preloader onDone={done} /> : null}
      <HoverSound />
      <CustomCursor />
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
      <Footer />
    </div>
  );
}