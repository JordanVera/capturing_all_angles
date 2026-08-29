'use client';

import Link from 'next/link';
import { ScrambleText } from '@/components/ScrambleText';
import { SOCIAL } from '@/lib/site';

export function Footer() {
  return (
    <footer className="pointer-events-none fixed right-0 bottom-0 left-0 z-10">
      <div className="flex items-end justify-between px-8 pb-8 md:grid md:grid-cols-4">
        <p className="pointer-events-auto t-small text-muted">
          <ScrambleText
            text="website by"
            linkText="Jordan Vera"
            href="https://www.jordanvera.com"
            delayMs={240}
            size="small"
          />
        </p>
        <nav className="pointer-events-auto hidden flex-col gap-1 md:col-start-2 md:flex">
          <Link
            href="/videography"
            className="t-small text-muted transition-colors duration-300 hover:text-accent"
          >
            <ScrambleText text="videography" delayMs={280} />
          </Link>
          <Link
            href="/about"
            className="t-small text-muted transition-colors duration-300 hover:text-accent"
          >
            <ScrambleText text="about" delayMs={300} />
          </Link>
        </nav>
        <nav className="pointer-events-auto hidden flex-col gap-1 md:col-start-3 md:flex">
          {SOCIAL.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="t-small text-muted transition-colors duration-300 hover:text-accent"
            >
              <ScrambleText text={item.label} delayMs={300 + index * 40} />
            </a>
          ))}
        </nav>
        <Link
          href="/photography"
          className="pointer-events-auto hidden t-small text-muted transition-colors duration-300 hover:text-accent md:col-start-4 md:block md:justify-self-end"
        >
          <ScrambleText text="photography" delayMs={380} />
        </Link>
        <nav className="pointer-events-auto flex flex-col items-end gap-1 md:hidden">
          <Link
            href="/about"
            className="t-small text-muted transition-colors duration-300 hover:text-accent"
          >
            <ScrambleText text="about" delayMs={260} />
          </Link>
          <Link
            href="/videography"
            className="t-small text-muted transition-colors duration-300 hover:text-accent"
          >
            <ScrambleText text="videography" delayMs={280} />
          </Link>
          <Link
            href="/book"
            className="t-small text-muted transition-colors duration-300 hover:text-accent"
          >
            <ScrambleText text="book" delayMs={320} />
          </Link>
          {SOCIAL.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="t-small text-muted transition-colors duration-300 hover:text-accent"
            >
              <ScrambleText text={item.label} delayMs={360 + index * 40} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
