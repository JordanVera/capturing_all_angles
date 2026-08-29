'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useMosaicLoad } from '@/components/MosaicLoadContext';
import { MOTION_TILES } from '@/lib/mosaic';
import type { MosaicTile } from '@/lib/site';

const REPULSION_RADIUS = 240;
const REPULSION_STRENGTH = 110;

const mediaClassName =
  'h-auto w-full transition-transform duration-500 group-hover:scale-110';

function mosaicTiles(): MosaicTile[] {
  return MOTION_TILES.map((clip) => ({
    src: clip.src,
    kind: 'video' as const,
    intrinsicWidth: clip.width,
    intrinsicHeight: clip.height,
    ...clip.layout,
  }));
}

function MosaicVideo({
  src,
  width,
  height,
}: {
  src: string;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const { markReady } = useMosaicLoad();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;

    const play = () => void el.play().catch(() => {});
    const done = () => markReady(src);
    const onCanPlay = () => {
      play();
      done();
    };

    play();
    if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      done();
    }
    el.addEventListener('canplay', onCanPlay);
    el.addEventListener('error', done);
    return () => {
      el.removeEventListener('canplay', onCanPlay);
      el.removeEventListener('error', done);
    };
  }, [src, markReady]);

  return (
    <video
      ref={ref}
      className={`${mediaClassName} pointer-events-none`}
      style={
        width && height ? { aspectRatio: `${width} / ${height}` } : undefined
      }
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      controlsList="nodownload nofullscreen noremoteplayback"
      tabIndex={-1}
      src={src}
      aria-hidden
    />
  );
}

export function VideoMosaic() {
  const displayTiles = useMemo(() => mosaicTiles(), []);
  const gridRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  const applyRepulsion = useCallback(() => {
    rafRef.current = null;
    const grid = gridRef.current;
    if (!grid) return;

    const rect = grid.getBoundingClientRect();
    const mouse = mouseRef.current;

    displayTiles.forEach((tile, i) => {
      const el = tileRefs.current[i];
      if (!el) return;

      let dx = 0;
      let dy = 0;

      if (mouse) {
        const leftPct = parseFloat(tile.left) / 100;
        const widthPct = parseFloat(tile.width) / 100;
        const tilePxWidth = widthPct * rect.width;
        const cx = rect.left + leftPct * rect.width + tilePxWidth / 2;
        const cy =
          rect.top +
          (parseFloat(tile.top) / 100) * rect.height +
          (tilePxWidth * 1.25) / 2;

        const vx = cx - mouse.x;
        const vy = cy - mouse.y;
        const dist = Math.sqrt(vx * vx + vy * vy);

        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
          dx = (vx / dist) * force;
          dy = (vy / dist) * force;
        }
      }

      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${tile.rotate}deg)`;
    });
  }, [displayTiles]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(applyRepulsion);
      }
    },
    [applyRepulsion],
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = null;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(applyRepulsion);
    }
  }, [applyRepulsion]);

  return (
    <div
      className="mosaic-scroll-container mt-24 flex min-h-dvh items-center justify-center overflow-x-auto md:overflow-hidden py-20 md:px-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={gridRef}
        className="relative aspect-11/8 w-full min-w-175 max-w-7xl md:min-w-0"
      >
        {displayTiles.map((tile, index) => (
          <div
            key={`${tile.src}-${index}`}
            ref={(el) => {
              tileRefs.current[index] = el;
            }}
            className="mosaic-tile group absolute overflow-hidden"
            style={{
              left: tile.left,
              top: tile.top,
              width: tile.width,
              zIndex: tile.z,
              transform: `rotate(${tile.rotate}deg)`,
              transition:
                'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
            }}
          >
            <MosaicVideo
              src={tile.src}
              width={tile.intrinsicWidth}
              height={tile.intrinsicHeight}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
