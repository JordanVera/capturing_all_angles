'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { MOSAIC_TILES, mosaicMediaKind, type MosaicTile } from '@/lib/site';

/** Distance (px) from cursor within which tiles start repelling. */
const REPULSION_RADIUS = 240;
/** Maximum displacement (px) at closest proximity. */
const REPULSION_STRENGTH = 110;

const mediaClassName =
  'h-auto w-full transition-transform duration-500 group-hover:scale-110';

type MotionClip = {
  replaceSrc: string;
  src: string;
  width: number;
  height: number;
  layout?: Pick<MosaicTile, 'left' | 'top' | 'width' | 'rotate' | 'z'>;
};

const MOTION_TILES: MotionClip[] = [
  // Featured landscape recaps
  {
    replaceSrc: '/grid-media/10.jpg',
    src: '/mosaic-video/alexis-listening.mp4',
    width: 1280,
    height: 720,
    layout: { left: '36%', top: '22%', width: '32%', rotate: -3, z: 8 },
  },
  {
    replaceSrc: '/grid-media/14.jpg',
    src: '/mosaic-video/remy-martin.mp4',
    width: 1280,
    height: 720,
    layout: { left: '6%', top: '50%', width: '30%', rotate: 2, z: 8 },
  },
  {
    replaceSrc: '/grid-media/8.jpg',
    src: '/mosaic-video/clip-P4rv4AhWInQ.mp4',
    width: 1280,
    height: 720,
    layout: { left: '10%', top: '30%', width: '24%', rotate: -6, z: 7 },
  },
  {
    replaceSrc: '/grid-media/9.jpg',
    src: '/mosaic-video/clip-bDWAvRikwiw.mp4',
    width: 1280,
    height: 720,
    layout: { left: '32%', top: '26%', width: '26%', rotate: 2, z: 8 },
  },
  {
    replaceSrc: '/grid-media/13.jpg',
    src: '/mosaic-video/clip-96ZfEukYlOo.mp4',
    width: 1280,
    height: 720,
    layout: { left: '0%', top: '52%', width: '24%', rotate: -5, z: 7 },
  },
  {
    replaceSrc: '/grid-media/15.jpg',
    src: '/mosaic-video/clip-yRV53kGTBaw.mp4',
    width: 1280,
    height: 720,
    layout: { left: '34%', top: '46%', width: '26%', rotate: -2, z: 8 },
  },
  {
    replaceSrc: '/grid-media/16 .jpg',
    src: '/mosaic-video/clip-YsHfBTjxD3g.mp4',
    width: 1280,
    height: 720,
    layout: { left: '48%', top: '48%', width: '24%', rotate: 5, z: 7 },
  },
  {
    replaceSrc: '/grid-media/18.jpg',
    src: '/mosaic-video/clip-aLNQGNpj7LI.mp4',
    width: 1280,
    height: 720,
    layout: { left: '0%', top: '76%', width: '26%', rotate: 6, z: 7 },
  },
  {
    replaceSrc: '/grid-media/25.jpg',
    src: '/mosaic-video/clip-o1hVmbjCUGo.mp4',
    width: 1280,
    height: 720,
    layout: { left: '18%', top: '38%', width: '22%', rotate: 3, z: 7 },
  },
  {
    replaceSrc: '/grid-media/26.jpg',
    src: '/mosaic-video/clip-yDcxg-EmYgc.mp4',
    width: 1280,
    height: 720,
    layout: { left: '40%', top: '35%', width: '24%', rotate: -5, z: 7 },
  },
  {
    replaceSrc: '/grid-media/29.jpg',
    src: '/mosaic-video/clip-n8YLGwv4pwA.mp4',
    width: 1280,
    height: 720,
    layout: { left: '58%', top: '60%', width: '22%', rotate: -3, z: 7 },
  },
  // Vertical shorts
  {
    replaceSrc: '/grid-media/1.jpg',
    src: '/mosaic-video/short-Is7Q50oSsZM.mp4',
    width: 608,
    height: 1080,
  },
  {
    replaceSrc: '/grid-media/2.jpg',
    src: '/mosaic-video/clip-z5SV2hInZlw.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/3.jpg',
    src: '/mosaic-video/short-Z2U-zW3fsDY.mp4',
    width: 608,
    height: 1080,
  },
  {
    replaceSrc: '/grid-media/4.jpg',
    src: '/mosaic-video/clip-gQCqepBY0Nw.mp4',
    width: 406,
    height: 720,
  },
  {
    replaceSrc: '/grid-media/5.jpg',
    src: '/mosaic-video/clip-jt4HyTxove8.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/6.jpg',
    src: '/mosaic-video/clip-jYIuct0VG8w.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/7.jpg',
    src: '/mosaic-video/clip-kLMK4szjxxo.mp4',
    width: 350,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/11.jpg',
    src: '/mosaic-video/clip-QtGdC6s13go.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/12.jpg',
    src: '/mosaic-video/clip-dMfLkneNO0Y.mp4',
    width: 406,
    height: 720,
  },
  {
    replaceSrc: '/grid-media/17.jpg',
    src: '/mosaic-video/clip-WXYZUdqDCm8.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/19.jpg',
    src: '/mosaic-video/clip-wcaO7BD_8CA.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/20.jpg',
    src: '/mosaic-video/short-C5YwZuhbgYA.mp4',
    width: 608,
    height: 1080,
  },
  {
    replaceSrc: '/grid-media/21.jpg',
    src: '/mosaic-video/clip-01otsbxhh2o.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/22.jpg',
    src: '/mosaic-video/short-jxhiBleq508.mp4',
    width: 608,
    height: 1080,
  },
  {
    replaceSrc: '/grid-media/23.jpg',
    src: '/mosaic-video/clip-OWJfMyUwyhE.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/24.jpg',
    src: '/mosaic-video/clip-DG5d1xR-iTk.mp4',
    width: 360,
    height: 640,
  },
  {
    replaceSrc: '/grid-media/27.jpg',
    src: '/mosaic-video/clip-_ANWQ3TQ3LE.mp4',
    width: 406,
    height: 720,
  },
  {
    replaceSrc: '/grid-media/28.jpg',
    src: '/mosaic-video/short-3-ZQpHKLvM0.mp4',
    width: 480,
    height: 854,
  },
];

function tilesWithMotion(tiles: MosaicTile[]): MosaicTile[] {
  const bySrc = new Map(MOTION_TILES.map((clip) => [clip.replaceSrc, clip]));

  return tiles.map((tile) => {
    const clip = bySrc.get(tile.src);
    if (!clip) return tile;

    return {
      ...tile,
      ...(clip.layout ?? {}),
      src: clip.src,
      kind: 'video' as const,
      intrinsicWidth: clip.width,
      intrinsicHeight: clip.height,
    };
  });
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

    const play = () => {
      void el.play().catch(() => {});
    };

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

export function VideoMosaic({
  tiles = MOSAIC_TILES,
}: {
  tiles?: MosaicTile[];
}) {
  const displayTiles = useMemo(() => tilesWithMotion(tiles), [tiles]);
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
      className="mosaic-scroll-container flex min-h-dvh items-center justify-center overflow-x-auto md:overflow-hidden py-20 md:px-8"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={gridRef}
        className="relative aspect-11/7 w-full min-w-[700px] md:min-w-0 max-w-275"
      >
        {displayTiles.map((tile, index) => {
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
                <MosaicVideo
                  src={tile.src}
                  width={tile.intrinsicWidth}
                  height={tile.intrinsicHeight}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
