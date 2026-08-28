"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const el = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, scale: 0 });
  const frame = useRef(0);

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    const desktop = window.matchMedia("(min-width: 992px)");
    if (!desktop.matches) return;

    document.body.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      pos.current.tx = event.clientX;
      pos.current.ty = event.clientY;
    };

    const tick = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.08;
      p.y += (p.ty - p.y) * 0.08;

      const target = document.elementFromPoint(p.tx, p.ty);
      const hide = Boolean(
        target?.closest("header, footer, a, button, input, textarea, select, label"),
      );
      p.scale += ((hide ? 0 : 1) - p.scale) * 0.18;

      node.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${p.scale})`;
      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    frame.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={el}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden font-mono text-[2rem] leading-[0.95] uppercase text-foreground md:block"
    >
      2026
    </div>
  );
}