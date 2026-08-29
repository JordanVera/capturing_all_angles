'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useMosaicLoad } from '@/components/MosaicLoadContext';

export function Preloader({ onDone }: { onDone: () => void }) {
  const { progress, complete } = useMosaicLoad();

  useEffect(() => {
    if (complete) onDone();
  }, [complete, onDone]);

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-12 bg-black"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={`Loading ${progress}%`}
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
            className="h-auto w-[min(42vw,18rem)]"
          />
        </div>
      </div>
      <div className="flex w-[min(60vw,16rem)] flex-col items-center gap-3">
        <div
          className="h-px w-full overflow-hidden bg-foreground/20"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full bg-accent transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="t-small text-muted tabular-nums">{progress}%</span>
      </div>
    </div>
  );
}
