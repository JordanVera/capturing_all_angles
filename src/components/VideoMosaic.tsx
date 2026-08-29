'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import type { MosaicTile } from '@/lib/site';

const REPULSION_RADIUS = 240;
const REPULSION_STRENGTH = 110;

const mediaClassName =
  'h-auto w-full transition-transform duration-500 group-hover:scale-110';

type MotionClip = {
  src: string;
  width: number;
  height: number;
  layout: Pick<MosaicTile, 'left' | 'top' | 'width' | 'rotate' | 'z'>;
};

const MOTION_TILES: MotionClip[] = [
  // ── Row 1 ──────────────────────────────────────────────
  {
    src: '/mosaic-video/alexis-listening.mp4',
    width: 1280,
    height: 720,
    layout: { left: '-1%', top: '-2%', width: '26%', rotate: -3, z: 5 },
  },
  {
    src: '/mosaic-video/clip-n8YLGwv4pwA.mp4',
    width: 1280,
    height: 720,
    layout: { left: '24%', top: '1%', width: '25%', rotate: 2, z: 7 },
  },
  {
    src: '/mosaic-video/clip-96ZfEukYlOo.mp4',
    width: 1280,
    height: 720,
    layout: { left: '49%', top: '-1%', width: '26%', rotate: -2, z: 6 },
  },
  {
    src: '/mosaic-video/clip-YsHfBTjxD3g.mp4',
    width: 1280,
    height: 720,
    layout: { left: '75%', top: '2%', width: '25%', rotate: 3, z: 5 },
  },
  // ── Row 2 ──────────────────────────────────────────────
  {
    src: '/mosaic-video/remy-martin.mp4',
    width: 1280,
    height: 720,
    layout: { left: '0%', top: '22%', width: '25%', rotate: 2, z: 7 },
  },
  {
    src: '/mosaic-video/clip-bDWAvRikwiw.mp4',
    width: 1280,
    height: 720,
    layout: { left: '24%', top: '25%', width: '25%', rotate: -3, z: 6 },
  },
  {
    src: '/mosaic-video/clip-P4rv4AhWInQ.mp4',
    width: 1280,
    height: 720,
    layout: { left: '49%', top: '22%', width: '26%', rotate: 3, z: 8 },
  },
  {
    src: '/mosaic-video/clip-o1hVmbjCUGo.mp4',
    width: 1280,
    height: 720,
    layout: { left: '75%', top: '26%', width: '24%', rotate: -2, z: 5 },
  },
  // ── Row 3 ──────────────────────────────────────────────
  {
    src: '/mosaic-video/clip-o8dD7Dfisjg.mp4',
    width: 1280,
    height: 720,
    layout: { left: '-1%', top: '46%', width: '26%', rotate: -2, z: 6 },
  },
  {
    src: '/mosaic-video/clip-w_eMkHb4260.mp4',
    width: 1280,
    height: 720,
    layout: { left: '24%', top: '49%', width: '25%', rotate: 3, z: 7 },
  },
  {
    src: '/mosaic-video/clip-Qcn6dnc0zAs.mp4',
    width: 1280,
    height: 720,
    layout: { left: '49%', top: '46%', width: '26%', rotate: -3, z: 6 },
  },
  {
    src: '/mosaic-video/clip-rnxL7a2GWAk.mp4',
    width: 1280,
    height: 720,
    layout: { left: '75%', top: '50%', width: '25%', rotate: 2, z: 5 },
  },
  // ── Row 4 ──────────────────────────────────────────────
  {
    src: '/mosaic-video/clip-yRV53kGTBaw.mp4',
    width: 1280,
    height: 720,
    layout: { left: '0%', top: '70%', width: '26%', rotate: 2, z: 6 },
  },
  {
    src: '/mosaic-video/clip-bah-nQ-aXZg.mp4',
    width: 1280,
    height: 720,
    layout: { left: '25%', top: '73%', width: '25%', rotate: -3, z: 7 },
  },
  {
    src: '/mosaic-video/clip-yDcxg-EmYgc.mp4',
    width: 1280,
    height: 720,
    layout: { left: '50%', top: '70%', width: '26%', rotate: 3, z: 6 },
  },
  {
    src: '/mosaic-video/clip-aLNQGNpj7LI.mp4',
    width: 1280,
    height: 720,
    layout: { left: '76%', top: '74%', width: '24%', rotate: -2, z: 5 },
  },
];

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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;

    const play = () => void el.play().catch(() => {});
    play();
    el.addEventListener('canplay', play);
    return () => el.removeEventListener('canplay', play);
  }, [src]);

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
