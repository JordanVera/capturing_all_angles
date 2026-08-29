'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { MOTION_TILES } from '@/lib/mosaic';

const TOTAL = MOTION_TILES.length;
const BOOT_TIMEOUT_MS = 10000;

type MosaicLoadValue = {
  markReady: (src: string) => void;
  progress: number;
  complete: boolean;
};

const MosaicLoadContext = createContext<MosaicLoadValue>({
  markReady: () => {},
  progress: 100,
  complete: true,
});

export function useMosaicLoad() {
  return useContext(MosaicLoadContext);
}

export function MosaicLoadProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(() => new Set<string>());

  const markReady = useCallback((src: string) => {
    setReady((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setReady((prev) => {
        if (prev.size >= TOTAL) return prev;
        return new Set(MOTION_TILES.map((clip) => clip.src));
      });
    }, BOOT_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, []);

  const progress =
    TOTAL === 0 ? 100 : Math.round((ready.size / TOTAL) * 100);
  const complete = ready.size >= TOTAL;

  const value = useMemo(
    () => ({ markReady, progress, complete }),
    [markReady, progress, complete],
  );

  return (
    <MosaicLoadContext.Provider value={value}>
      {children}
    </MosaicLoadContext.Provider>
  );
}
