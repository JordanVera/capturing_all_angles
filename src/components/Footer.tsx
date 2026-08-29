"use client";

import Link from 'next/link';
import { ScrambleText } from '@/components/ScrambleText';

export function Footer() {
  return (
    <footer className="pointer-events-none fixed right-0 bottom-0 left-0 z-10">
      <div className="grid grid-cols-2 gap-y-2 px-8 pb-8 md:grid-cols-4">
        <Link
          href="/book"
          className="pointer-events-auto t-small text-muted transition-colors duration-300 hover:text-accent"
        >
          <ScrambleText text="website by" linkText="Jordan Vera" href="https://www.jordanvera.com" delayMs={240} />
        </Link>
        <p className="pointer-events-auto t-small text-muted md:col-start-2">
          <ScrambleText text="videography" delayMs={280} />
        </p>
        <Link
          href="/book"
          className="pointer-events-auto hidden t-small text-muted transition-colors duration-300 hover:text-accent md:col-start-4 md:block md:justify-self-end"
        >
          <ScrambleText text="photography" delayMs={320} />
        </Link>
        <Link
          href="/book"
          className="pointer-events-auto t-small justify-self-end text-muted transition-colors duration-300 hover:text-accent md:hidden"
        >
          <ScrambleText text="book" delayMs={320} />
        </Link>
      </div>
    </footer>
  );
}
