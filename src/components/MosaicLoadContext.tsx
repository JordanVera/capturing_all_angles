'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
  total = 0,
}: {
  children: React.ReactNode;
  total?: number;
}) {
  const [ready, setReady] = useState(() => new Set<string>());
  const [timedOut, setTimedOut] = useState(false);

  const markReady = useCallback((src: string) => {
    setReady((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setTimedOut(true), BOOT_TIMEOUT_MS);
    return () => window.clearTimeout(id);
  }, []);

  const progress =
    total === 0 ? 100 : Math.min(100, Math.round((ready.size / total) * 100));
  const complete = timedOut || total === 0 || ready.size >= total;

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
