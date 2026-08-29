'use client';

import { useEffect, useId, useRef } from 'react';

const CX = 100;
const CY = 100;
const BLADES = 6;
const BLADE_OUTER = 80;
const INNER_MIN = 14;
const INNER_MAX = 50;
const STOPS = [
  'f/16',
  'f/11',
  'f/8',
  'f/5.6',
  'f/4',
  'f/2.8',
  'f/2',
  'f/1.4',
] as const;

function polar(radius: number, deg: number) {
  const angle = (deg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

function fmt(radius: number, deg: number) {
  const { x, y } = polar(radius, deg);
  return `${x.toFixed(2)},${y.toFixed(2)}`;
}

function bladePoints(index: number, innerR: number) {
  const step = 360 / BLADES;
  const overlap = step * 0.2;
  const start = index * step - 90;
  const end = start + step;
  return [
    fmt(innerR, start),
    fmt(innerR, end),
    fmt(BLADE_OUTER, end + overlap),
    fmt(BLADE_OUTER, start - overlap),
  ].join(' ');
}

function hexPoints(innerR: number) {
  return Array.from({ length: BLADES }, (_, index) =>
    fmt(innerR, index * (360 / BLADES) - 90),
  ).join(' ');
}

function stopFor(open: number) {
  const index = Math.min(
    STOPS.length - 1,
    Math.max(0, Math.round(open * (STOPS.length - 1))),
  );
  return STOPS[index];
}

const TICKS = Array.from({ length: 24 }, (_, index) => {
  const deg = (index / 24) * 360 - 90;
  const major = index % 6 === 0;
  const inner = polar(major ? 89 : 91, deg);
  const outer = polar(96, deg);
  return { index, major, inner, outer };
});

type Props = {
  className?: string;
  open?: boolean;
};

export function Aperture({ className = '', open = false }: Props) {
  const uid = useId().replace(/:/g, '');
  const clipId = `${uid}-iris`;
  const glowId = `${uid}-glow`;
  const hoverRef = useRef(open);
  const openRef = useRef(0.46);
  const bladeRefs = useRef<(SVGPolygonElement | null)[]>([]);
  const holeRef = useRef<SVGPolygonElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const stopRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    hoverRef.current = open;
  }, [open]);

  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced) {
      const innerR = INNER_MIN + 0.5 * (INNER_MAX - INNER_MIN);
      bladeRefs.current.forEach((blade, index) => {
        blade?.setAttribute('points', bladePoints(index, innerR));
      });
      holeRef.current?.setAttribute('points', hexPoints(innerR));
      if (stopRef.current) stopRef.current.textContent = 'f/4';
      return;
    }

    let frame = 0;
    const started = performance.now();

    const tick = (now: number) => {
      const breathe =
        0.36 + 0.2 * (0.5 + 0.5 * Math.sin((now - started) / 920));
      const target = hoverRef.current ? 0.94 : breathe;
      openRef.current += (target - openRef.current) * 0.07;
      const open = openRef.current;
      const innerR = INNER_MIN + open * (INNER_MAX - INNER_MIN);

      bladeRefs.current.forEach((blade, index) => {
        blade?.setAttribute('points', bladePoints(index, innerR));
      });
      holeRef.current?.setAttribute('points', hexPoints(innerR));

      if (glowRef.current) {
        glowRef.current.style.boxShadow = `0 0 ${18 + open * 42}px rgba(255, 97, 34, ${0.1 + open * 0.28})`;
      }

      const nextStop = stopFor(open);
      if (stopRef.current && stopRef.current.textContent !== nextStop) {
        stopRef.current.textContent = nextStop;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const initialInner = INNER_MIN + 0.46 * (INNER_MAX - INNER_MIN);

  return (
    <div className={`relative ${className}`} data-hover-sound>
      <div
        ref={glowRef}
        className="absolute inset-[8%] rounded-full"
        aria-hidden
      />
      <svg
        viewBox="0 0 200 200"
        className="relative block h-full w-full text-foreground"
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <circle cx={CX} cy={CY} r={BLADE_OUTER} />
          </clipPath>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor="#ff6122" />
            <stop offset="55%" stopColor="#ff6122" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1a0800" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={BLADE_OUTER} fill={`url(#${glowId})`} />

        <g clipPath={`url(#${clipId})`}>
          {Array.from({ length: BLADES }, (_, index) => (
            <polygon
              key={index}
              ref={(node) => {
                bladeRefs.current[index] = node;
              }}
              points={bladePoints(index, initialInner)}
              fill={index % 2 === 0 ? '#0a0a0a' : '#141414'}
              stroke="#2a2a2a"
              strokeWidth="0.6"
            />
          ))}
        </g>

        <polygon
          ref={holeRef}
          points={hexPoints(initialInner)}
          fill="none"
          stroke="#ff6122"
          strokeWidth="1.1"
          opacity="0.85"
        />

        <circle
          cx={CX}
          cy={CY}
          r="97"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle
          cx={CX}
          cy={CY}
          r="87.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.28"
        />

        <g className="aperture-ticks">
          {TICKS.map((tick) => (
            <line
              key={tick.index}
              x1={tick.inner.x}
              y1={tick.inner.y}
              x2={tick.outer.x}
              y2={tick.outer.y}
              stroke="currentColor"
              strokeWidth={tick.major ? 1.3 : 0.6}
              opacity={tick.major ? 0.75 : 0.32}
            />
          ))}
        </g>
      </svg>
      <span
        ref={stopRef}
        className="absolute top-[calc(100%+0.8rem)] left-1/2 -translate-x-1/2 font-mono text-[1.2rem] leading-none text-accent"
      >
        f/4
      </span>
    </div>
  );
}
