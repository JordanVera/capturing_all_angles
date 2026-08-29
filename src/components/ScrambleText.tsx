'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function scrambleFrame(source: string, progress: number) {
  return source
    .split('')
    .map((char, index) => {
      if (char === ' ' || char === '\n') return char;
      const settle = index / Math.max(source.length, 1);
      if (progress > settle + 0.15) return char;
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? char;
    })
    .join('');
}

type Props = {
  text: string;
  linkText?: string;
  href?: string;
  className?: string;
  as?: 'span' | 'div';
  hover?: boolean;
  delayMs?: number;
};

export function ScrambleText({
  text,
  className,
  linkText,
  href,
  as: Tag = 'span',
  hover = true,
  delayMs = 0,
}: Props) {
  const [display, setDisplay] = useState(text);
  const [ready, setReady] = useState(false);
  const frame = useRef<number>(0);
  const running = useRef(false);

  const run = useCallback(
    (fromHidden = false) => {
      if (running.current) return;
      running.current = true;
      const started = performance.now();
      const duration = 420;

      const tick = (now: number) => {
        const progress = Math.min((now - started) / duration, 1);
        setDisplay(scrambleFrame(text, progress));
        if (progress < 1) {
          frame.current = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
          running.current = false;
          if (fromHidden) setReady(true);
        }
      };

      frame.current = requestAnimationFrame(tick);
    },
    [text],
  );

  useEffect(() => {
    const id = window.setTimeout(() => run(true), delayMs);
    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(frame.current);
      running.current = false;
    };
  }, [delayMs, run]);

  const lines = display.split('\n');

  return (
    <Tag
      className={className}
      onMouseEnter={() => {
        if (hover) run();
      }}
      style={{ visibility: ready ? 'visible' : 'hidden' }}
    >
      {lines.map((line, i) => (
        <span key={`${line}-${i}`}>
          {i > 0 ? <br /> : null}
          {line}{' '}
          {linkText && href && (
            <Link href={href} className="underline">
              {linkText}
            </Link>
          )}
        </span>
      ))}
    </Tag>
  );
}
