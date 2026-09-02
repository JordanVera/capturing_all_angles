'use client';

import { ScrambleText } from '@/components/ScrambleText';
import { SOCIAL } from '@/lib/site';

export function Footer() {
  return (
    <footer className="pointer-events-none fixed right-0 bottom-0 left-0 z-10">
      <div className="flex items-end justify-end px-8 pb-8">
        {/* <p className="pointer-events-auto t-small text-muted">
          <ScrambleText
            text="website by"
            linkText="Jordan Vera"
            href="https://www.jordanvera.com"
            delayMs={240}
            size="small"
          />
        </p> */}

        <nav className="pointer-events-auto flex items-end justify-end gap-3 md:flex-col md:gap-2">
          {SOCIAL.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="t-small !text-xs text-muted transition-colors duration-300 hover:text-accent"
            >
              <ScrambleText text={item.label} delayMs={300 + index * 40} />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
