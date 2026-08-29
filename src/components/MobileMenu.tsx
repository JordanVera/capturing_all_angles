'use client';

import Link from 'next/link';
import { BRAND, SOCIAL } from '@/lib/site';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 z-[1500] bg-black transition-opacity duration-300 md:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <nav className="flex h-full flex-col justify-between px-8 pt-28 pb-24">
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            onClick={onClose}
            className="t-nav text-foreground transition-colors duration-300 hover:text-accent"
          >
            home
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="t-nav text-foreground transition-colors duration-300 hover:text-accent"
          >
            about
          </Link>
          <Link
            href="/photography"
            onClick={onClose}
            className="t-nav text-foreground transition-colors duration-300 hover:text-accent"
          >
            photography
          </Link>
          <Link
            href="/videography"
            onClick={onClose}
            className="t-nav text-foreground transition-colors duration-300 hover:text-accent"
          >
            videography
          </Link>
          <Link
            href="/book"
            onClick={onClose}
            className="t-nav text-foreground transition-colors duration-300 hover:text-accent"
          >
            book
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {SOCIAL.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="t-small text-muted transition-colors duration-300 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <p className="t-small text-muted">
            2026
            <br />
            {BRAND.name}
          </p>
        </div>
      </nav>
    </div>
  );
}
