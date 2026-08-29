'use client';

import Image from 'next/image';
import { useEffect } from 'react';

const DURATION = 2500;

export function Preloader({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, DURATION);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-12 bg-black"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="preloader-logo-stage">
        <div className="preloader-logo">
          <Image
            src="/logo-white.png"
            alt=""
            width={272}
            height={136}
            priority
            loading="eager"
            className="h-auto w-[min(60vw,32rem)]"
          />
        </div>
      </div>
      <div
        className="h-9 w-9 animate-spin rounded-full border-2 border-foreground/20 border-t-accent"
        aria-hidden
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
