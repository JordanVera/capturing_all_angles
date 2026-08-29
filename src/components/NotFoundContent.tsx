'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Aperture } from '@/components/Aperture';
import { ScrambleText } from '@/components/ScrambleText';

const WAYS = [
  { href: '/', label: 'home' },
  { href: '/photography', label: 'photography' },
  { href: '/videography', label: 'videography' },
  { href: '/book', label: 'book a shoot' },
] as const;

export function NotFoundContent() {
  const [irisOpen, setIrisOpen] = useState(false);

  return (
    <main className="relative flex min-h-dvh items-center justify-center px-8 pt-32 pb-28">
      <div className="relative flex w-full max-w-5xl flex-col items-center px-5 py-16 md:px-16 md:py-24">
        <span className="pointer-events-none absolute top-0 left-0 h-14 w-14 border-t border-l border-foreground/35 md:h-16 md:w-16" />
        <span className="pointer-events-none absolute top-0 right-0 h-14 w-14 border-t border-r border-foreground/35 md:h-16 md:w-16" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-14 w-14 border-b border-l border-foreground/35 md:h-16 md:w-16" />
        <span className="pointer-events-none absolute right-0 bottom-0 h-14 w-14 border-b border-r border-foreground/35 md:h-16 md:w-16" />

        <span className="absolute top-4 left-5 t-small text-muted md:top-5 md:left-6">
          <ScrambleText text="err" delayMs={80} hover={false} />
        </span>
        <span className="absolute top-4 right-5 t-small text-accent md:top-5 md:right-6">
          <ScrambleText text="404" delayMs={120} hover={false} />
        </span>
        <span className="absolute bottom-4 left-5 t-small text-muted md:bottom-5 md:left-6">
          <ScrambleText text="caa" delayMs={200} hover={false} />
        </span>
        <span className="absolute right-5 bottom-4 t-small text-muted md:right-6 md:bottom-5">
          <ScrambleText text="2026" delayMs={240} hover={false} />
        </span>

        <h1
          aria-label="404"
          className="t-nav flex cursor-crosshair items-center justify-center pb-12 leading-none text-foreground"
          style={{ fontSize: 'clamp(7.2rem, 22vw, 26rem)' }}
          onMouseEnter={() => setIrisOpen(true)}
          onMouseLeave={() => setIrisOpen(false)}
        >
          <span aria-hidden>4</span>
          <Aperture
            open={irisOpen}
            className="mx-[0.04em] h-[0.78em] w-[0.78em] shrink-0"
          />
          <span aria-hidden>4</span>
        </h1>

        <p
          className="t-nav mt-8 text-center leading-none md:mt-10"
          style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)' }}
        >
          <ScrambleText text="this frame wasn't captured" delayMs={160} />
        </p>
        <p className="t-small mt-5 max-w-md text-center text-muted">
          <ScrambleText
            text="the page you asked for is out of frame. try another angle."
            delayMs={280}
            hover={false}
          />
        </p>

        <nav className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {WAYS.map((way, index) => (
            <Link
              key={way.href}
              href={way.href}
              className="t-small text-foreground transition-colors duration-300 hover:text-accent"
            >
              <ScrambleText text={way.label} delayMs={340 + index * 50} />
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
