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

const MOTION_CLIP = {
  videoId: 'Zyy1oTdGyCQ',
  start: 18,
  end: 24,
  /** Landscape still this clip replaces in the collage. */
  replaceSrc: '/grid-media/10.jpg',
} as const;

const YT_API_SRC = 'https://www.youtube.com/iframe_api';
const YT_ENDED = 0;

type YouTubePlayer = {
  destroy: () => void;
  mute: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
};

type YouTubePlayerEvent = {
  data: number;
  target: YouTubePlayer;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        target: HTMLElement,
        options: {
          videoId: string;
          width: string;
          height: string;
          host: string;
          playerVars: Record<string, string | number>;
          events: {
            onReady: (event: YouTubePlayerEvent) => void;
            onStateChange: (event: YouTubePlayerEvent) => void;
          };
        },
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();

  return new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };

    if (!document.querySelector(`script[src="${YT_API_SRC}"]`)) {
      const tag = document.createElement('script');
      tag.src = YT_API_SRC;
      tag.async = true;
      document.head.appendChild(tag);
    }
  });
}

function MosaicYouTubeClip({
  videoId,
  start,
  end,
}: {
  videoId: string;
  start: number;
  end: number;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const pollRef = useRef<number | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let cancelled = false;

    const clearPoll = () => {
      if (pollRef.current !== null) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };

    const restartClip = (player: YouTubePlayer) => {
      player.seekTo(start, true);
      player.playVideo();
    };

    const attach = async () => {
      await loadYouTubeApi();
      if (cancelled || !boxRef.current || !window.YT?.Player) return;

      boxRef.current.replaceChildren();
      const target = document.createElement('div');
      target.className = 'h-full w-full';
      boxRef.current.appendChild(target);

      const player = new window.YT.Player(target, {
        videoId,
        width: '100%',
        height: '100%',
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          start,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            if (cancelled) return;
            event.target.mute();
            restartClip(event.target);
            clearPoll();
            pollRef.current = window.setInterval(() => {
              const current = event.target.getCurrentTime?.() ?? 0;
              const state = event.target.getPlayerState?.();
              if (
                current < start - 0.05 ||
                current >= end - 0.15 ||
                state === YT_ENDED
              ) {
                restartClip(event.target);
              }
            }, 150);
          },
          onStateChange: (event) => {
            if (event.data === YT_ENDED) restartClip(event.target);
          },
        },
      });

      playerRef.current = player;
    };

    void attach();

    return () => {
      cancelled = true;
      clearPoll();
      try {
        playerRef.current?.destroy();
      } catch {
        // iframe may already be gone
      }
      playerRef.current = null;
    };
  }, [videoId, start, end]);

  return (
    <div
      className={`${mediaClassName} relative aspect-video overflow-hidden bg-black`}
    >
      <div
        ref={boxRef}
        className="pointer-events-none absolute inset-0 scale-[1.35]"
        aria-hidden
      />
    </div>
  );
}

function tilesWithMotion(tiles: MosaicTile[]): MosaicTile[] {
  const match = tiles.findIndex((tile) => tile.src === MOTION_CLIP.replaceSrc);
  const swapAt =
    match >= 0 ? match : Math.min(9, Math.max(tiles.length - 1, 0));
  if (tiles.length === 0) return tiles;

  return tiles.map((tile, index) =>
    index === swapAt
      ? {
          ...tile,
          src: `https://www.youtube.com/watch?v=${MOTION_CLIP.videoId}`,
          kind: 'video',
        }
      : tile,
  );
}

function isYouTubeSrc(src: string) {
  return src.includes('youtube.com') || src.includes('youtu.be');
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
              {isYouTubeSrc(tile.src) ? (
                <MosaicYouTubeClip
                  videoId={MOTION_CLIP.videoId}
                  start={MOTION_CLIP.start}
                  end={MOTION_CLIP.end}
                />
              ) : kind === 'image' ? (
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
