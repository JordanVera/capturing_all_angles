'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { MOSAIC_TILES, mosaicMediaKind, type MosaicTile } from '@/lib/site';

/** Distance (px) from cursor within which tiles start repelling. */
const REPULSION_RADIUS = 240;
/** Maximum displacement (px) at closest proximity. */
const REPULSION_STRENGTH = 110;

const mediaClassName =
  'h-auto w-full transition-transform duration-500 group-hover:scale-110';

export function VideoMosaic({
  tiles = MOSAIC_TILES,
}: {
  tiles?: MosaicTile[];
}) {
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

    tiles.forEach((tile, i) => {
      const el = tileRefs.current[i];
      if (!el) return;

      let dx = 0;
      let dy = 0;

      if (mouse) {
        const leftPct = parseFloat(tile.left) / 100;
        const topPct = parseFloat(tile.top) / 100;
        const widthPct = parseFloat(tile.width) / 100;

        // Approximate tile center in client-space coordinates.
        // Height is estimated as 1.25× the tile's rendered width (portrait bias).
        const tilePxWidth = widthPct * rect.width;
        const cx = rect.left + leftPct * rect.width + tilePxWidth / 2;
        const cy = rect.top + topPct * rect.height + (tilePxWidth * 1.25) / 2;

        const vx = cx - mouse.x;
        const vy = cy - mouse.y;
        const dist = Math.sqrt(vx * vx + vy * vy);

        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = (1 - dist / REPULSION_RADIUS) * REPULSION_STRENGTH;
          dx = (vx / dist) * force;
          dy = (vy / dist) * force;
        }
      }

      // translate() comes first so the push is in screen-space, not rotated-space.
      el.style.transform = `translate(${dx}px, ${dy}px) rotate(${tile.rotate}deg)`;
    });
  }, [tiles]);

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
      className="mosaic-scroll-container flex min-h-dvh items-center justify-center overflow-x-auto md:overflow-hidden py-20 md:px-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={gridRef} className="relative aspect-11/7 w-full min-w-[700px] md:min-w-0 max-w-275">
        {tiles.map((tile, index) => {
          const kind = mosaicMediaKind(tile.src, tile.kind);

          return (
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
              {kind === 'image' ? (
                <Image
                  src={tile.src}
                  alt=""
                  width={tile.intrinsicWidth ?? 1440}
                  height={tile.intrinsicHeight ?? 1800}
                  sizes="(max-width: 768px) 45vw, 22vw"
                  priority={index < 4}
                  unoptimized={tile.src.startsWith('http')}
                  className={mediaClassName}
                  aria-hidden
                />
              ) : (
                <video
                  className={mediaClassName}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src={tile.src}
                  poster={tile.poster}
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
