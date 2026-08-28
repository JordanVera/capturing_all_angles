"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 2500;

export function Preloader({ onDone }: { onDone: () => void }) {
  const [value, setValue] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const finished = useRef(false);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const node = wrap.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      pos.current.x = rect.left + rect.width / 2;
      pos.current.y = rect.top + rect.height / 2;
      pos.current.tx = pos.current.x;
      pos.current.ty = pos.current.y;
    }

    const onMove = (event: PointerEvent) => {
      pos.current.tx = event.clientX;
      pos.current.ty = event.clientY;
    };

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(eased * 2026));

      const p = pos.current;
      p.x += (p.tx - p.x) * 0.05;
      p.y += (p.ty - p.y) * 0.05;
      if (node) {
        node.style.left = `${p.x}px`;
        node.style.top = `${p.y}px`;
      }

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else if (!finished.current) {
        finished.current = true;
        window.setTimeout(onDone, 200);
      }
    };

    window.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black">
      <div
        ref={wrap}
        className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[2rem] leading-none text-foreground uppercase tabular-nums"
      >
        {String(value).padStart(2, "0")}
      </div>
    </div>
  );
}