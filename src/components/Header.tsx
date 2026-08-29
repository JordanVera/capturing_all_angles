'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScrambleText } from '@/components/ScrambleText';
import { Logo } from '@/components/Logo';

type Props = {
  menuOpen: boolean;
  onToggleMenu: () => void;
};

export function Header({ menuOpen, onToggleMenu }: Props) {
  const pathname = usePathname();
  const onBook = pathname.startsWith('/book');
  const onPhoto = pathname.startsWith('/photography');
  const onVideo = pathname.startsWith('/videography');

  return (
    <header className="pointer-events-none fixed top-0 right-0 left-0 z-[2000]">
      <div className="grid grid-cols-2 items-start px-8 pt-8 md:grid-cols-4">
        <Link
          href="/"
          className="pointer-events-auto relative flex items-start text-foreground transition-colors duration-300 hover:text-accent"
        >
          <Logo className="h-12 w-auto md:h-14" />
        </Link>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={onToggleMenu}
          className="pointer-events-auto col-start-2 justify-self-end t-nav md:hidden"
        >
          <ScrambleText text={menuOpen ? 'Close' : 'Menu'} hover={false} />
        </button>

        <nav className="pointer-events-auto hidden flex-col justify-self-start md:col-start-3 md:flex">
          <Link
            href="/videography"
            className={`t-nav transition-colors duration-300 hover:text-accent ${onVideo ? 'text-accent' : 'text-foreground'}`}
          >
            <ScrambleText text="videography" delayMs={160} />
          </Link>
          <Link
            href="/photography"
            className={`t-nav transition-colors duration-300 hover:text-accent ${onPhoto ? 'text-accent' : 'text-foreground'}`}
          >
            <ScrambleText text="photography" delayMs={120} />
          </Link>
        </nav>

        <Link
          href="/book"
          className={`pointer-events-auto hidden t-nav justify-self-end transition-colors duration-300 hover:text-accent md:block ${
            onBook ? 'text-accent' : 'text-foreground'
          }`}
        >
          <ScrambleText text="book" delayMs={200} />
        </Link>
      </div>
    </header>
  );
}
