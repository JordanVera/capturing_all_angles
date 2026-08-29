'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import Link from 'next/link';
import { ScrambleText } from '@/components/ScrambleText';

type TallClip = {
  src: string;
  youtubeId: string;
  kind: 'clip' | 'short';
};

const TALL_FILE = /^(clip|short)-(.+)\.mp4$/i;

function parseTallClip(file: string): TallClip {
  const match = TALL_FILE.exec(file);
  const kind = match?.[1]?.toLowerCase() === 'short' ? 'short' : 'clip';
  return {
    src: `/tall-video/${file}`,
    youtubeId: match?.[2] ?? '',
    kind,
  };
}

function ShortClip({
  clip,
  frame,
  delayMs,
  soundOn,
  onToggleSound,
  scrollRoot,
}: {
  clip: TallClip;
  frame: string;
  delayMs: number;
  soundOn: boolean;
  onToggleSound: () => void;
  scrollRoot: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          void el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      {
        root: scrollRoot.current,
        threshold: 0.55,
        rootMargin: '0px 80px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollRoot]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = !soundOn;
    if (soundOn) void el.play().catch(() => {});
  }, [soundOn]);

  const watchHref = clip.youtubeId
    ? clip.kind === 'short'
      ? `https://www.youtube.com/shorts/${clip.youtubeId}`
      : `https://www.youtube.com/watch?v=${clip.youtubeId}`
    : null;

  return (
    <div
      className="gallery-tile group relative w-[42vw] shrink-0 snap-start sm:w-[30vw] lg:w-[22vw] xl:w-[18vw]"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <button
        type="button"
        data-hover-sound
        onClick={onToggleSound}
        aria-pressed={soundOn}
        aria-label={soundOn ? 'Mute clip' : 'Play clip with sound'}
        className="relative block w-full overflow-hidden border border-foreground/15 text-left transition-colors duration-300 hover:border-accent"
      >
        <div className="aspect-9/16 bg-foreground/5">
          <video
            ref={ref}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            src={clip.src}
            muted
            loop
            playsInline
            preload="metadata"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
            tabIndex={-1}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/5" />
        <span className="pointer-events-none absolute top-2 left-2 z-10 t-small text-foreground/40 transition-colors duration-300 group-hover:text-accent">
          [{frame}]
        </span>
        <span className="pointer-events-none absolute right-2 bottom-2 z-10 t-small text-foreground/40 transition-colors duration-300 group-hover:text-accent">
          {soundOn ? 'sound' : 'muted'}
        </span>
      </button>
      {watchHref ? (
        <a
          href={watchHref}
          target="_blank"
          rel="noreferrer"
          className="t-small absolute bottom-2 left-2 z-10 text-foreground/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:text-accent"
        >
          youtube →
        </a>
      ) : null}
    </div>
  );
}

function ShortsRow({
  clips,
  soundSrc,
  onToggleSound,
}: {
  clips: TallClip[];
  soundSrc: string | null;
  onToggleSound: (src: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

      const delta = event.deltaY;
      if (delta === 0) return;

      const max = el.scrollWidth - el.clientWidth;
      if (max <= 1) return;

      const left = el.scrollLeft;
      const canMove = (delta > 0 && left < max - 1) || (delta < 0 && left > 1);
      if (!canMove) return;

      event.preventDefault();
      el.scrollLeft += delta;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <>
      <div className="mb-10 flex items-center gap-6">
        <span className="t-small text-muted">shorts</span>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="t-small text-accent">
          {String(clips.length).padStart(2, '0')} →
        </span>
      </div>

      <div className="relative -mx-8 mb-16">
        <div
          ref={scrollerRef}
          role="region"
          aria-label="Short-form videos"
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-proximity gap-2.5 overflow-x-auto overscroll-x-contain px-8 pb-1"
        >
          {clips.map((clip, i) => (
            <ShortClip
              key={clip.src}
              clip={clip}
              frame={String(i + 1).padStart(2, '0')}
              delayMs={Math.min(200 + i * 50, 700)}
              soundOn={soundSrc === clip.src}
              onToggleSound={() => onToggleSound(clip.src)}
              scrollRoot={scrollerRef}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-black to-transparent" />
      </div>
    </>
  );
}

const VIDEOS = [
  {
    id: 'P4rv4AhWInQ',
    start: 0,
    label: 'Streamer Prom 2026',
    meta: 'Houston · 2026',
    frame: '01',
  },
  {
    id: 'yRV53kGTBaw',
    start: 0,
    label: 'Shaunie Henderson - Embrace Recap',
    meta: 'Houston · 2026',
    frame: '02',
  },
  {
    id: 'bDWAvRikwiw',
    start: 0,
    label: 'Not Your Typical Houston',
    meta: 'Houston · 2026',
    frame: '03',
  },
  {
    id: '96ZfEukYlOo',
    start: 0,
    label: 'Not Your Typical Los Angeles',
    meta: 'Los Angeles · 2026',
    frame: '04',
  },
  {
    id: 'N-0iadFqXHA',
    start: 0,
    label: 'Press Play Monday',
    meta: 'Houston · 2026',
    frame: '05',
  },
  {
    id: 'YsHfBTjxD3g',
    start: 0,
    label: 'Light Fest Teens',
    meta: 'Houston · 2026',
    frame: '06',
  },
  {
    id: 'rnxL7a2GWAk',
    start: 0,
    label: 'Light Fest Teens',
    meta: 'Los Angeles · 2026',
    frame: '07',
  },
  {
    id: 'aLNQGNpj7LI',
    start: 0,
    label: 'NLE Choppa - TSU Homecoming',
    meta: 'Houston · 2025',
    frame: '08',
  },
  {
    id: 'iXMF88GkCYQ',
    start: 0,
    label: 'BEATKING Album Release',
    meta: 'Houston · 2024',
    frame: '09',
  },
  {
    id: 'o1hVmbjCUGo',
    start: 0,
    label: 'Tony Nwigwe Recap',
    meta: 'Houston · 2024',
    frame: '10',
  },
  {
    id: 'ThZTZ0DY9Ac',
    start: 0,
    label: 'Remy Martin Recap',
    meta: 'Houston · 2023',
    frame: '11',
  },
  {
    id: 'yu2mtOlEL8c',
    start: 0,
    label: 'Alexis Finley Birthday Recap',
    meta: 'Houston · 2022',
    frame: '12',
  },
  {
    id: 'lRTANapWWGo',
    start: 0,
    label: 'Lamar Cole SXSW Day 1',
    meta: 'Austin · 2022',
    frame: '13',
  },
  {
    id: 'ma6yidwrl0I',
    start: 0,
    label: 'Lamar Cole SXSW Day 2',
    meta: 'Austin · 2022',
    frame: '14',
  },
  {
    id: 'mtSghvLlUwM',
    start: 0,
    label: 'WOW Conference RECAP',
    meta: 'Houston · 2022',
    frame: '15',
  },
  {
    id: 'Zyy1oTdGyCQ',
    start: 0,
    label: 'Alexis Finley Listening Party',
    meta: 'Houston · 2022',
    frame: '16',
  },
] as const;

export function VideoGallery({ shorts }: { shorts: string[] }) {
  const featured = VIDEOS[0];
  const rest = VIDEOS.slice(1);
  const tallClips = shorts.map(parseTallClip);
  const [soundSrc, setSoundSrc] = useState<string | null>(null);

  return (
    <main className="min-h-dvh px-8 pt-36 pb-32 md:pt-40">
      {/* Page Header */}
      <div className="mb-16">
        <div className="flex items-end justify-between gap-4">
          <h1
            className="t-nav leading-none"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)' }}
          >
            <ScrambleText text="MOTION" delayMs={80} />
          </h1>
          <span className="t-small mb-1 text-accent">
            <ScrambleText
              text={
                tallClips.length > 0
                  ? `${VIDEOS.length} FILMS · ${tallClips.length} SHORTS`
                  : `${VIDEOS.length} FILMS`
              }
              delayMs={220}
            />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-foreground/15 pt-5">
          <span className="t-small text-muted">
            <ScrambleText text="videographer" delayMs={300} hover={false} />
          </span>
          <span className="t-small text-foreground/20">——</span>
          <span className="t-small text-muted">
            <ScrambleText
              text="capturing all angles"
              delayMs={360}
              hover={false}
            />
          </span>
          <span className="t-small text-foreground/20">——</span>
          <span className="t-small text-muted">
            <ScrambleText
              text="director / editor"
              delayMs={420}
              hover={false}
            />
          </span>
        </div>
      </div>

      {/* Featured Video */}
      <div className="gallery-tile mb-16" style={{ animationDelay: '100ms' }}>
        <div className="mb-4 flex items-center gap-4">
          <span className="t-small text-accent">[{featured.frame}]</span>
          <span className="t-small text-foreground">{featured.label}</span>
          <span className="t-small ml-auto text-muted">{featured.meta}</span>
        </div>
        <div className="group relative overflow-hidden border border-foreground/15 transition-colors duration-300 hover:border-accent">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featured.id}?rel=0&modestbranding=1&start=${featured.start}`}
              title={featured.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      {tallClips.length > 0 ? (
        <ShortsRow
          clips={tallClips}
          soundSrc={soundSrc}
          onToggleSound={(src) =>
            setSoundSrc((current) => (current === src ? null : src))
          }
        />
      ) : null}

      {/* More Work Divider */}
      <div className="mb-10 flex items-center gap-6">
        <span className="t-small text-muted">more work</span>
        <div className="h-px flex-1 bg-foreground/10" />
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((video, i) => (
          <div
            key={video.id}
            className="gallery-tile group"
            style={{ animationDelay: `${200 + i * 80}ms` }}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="t-small text-accent">[{video.frame}]</span>
              <span className="t-small text-foreground">{video.label}</span>
            </div>
            <div className="relative overflow-hidden border border-foreground/15 transition-colors duration-300 group-hover:border-accent">
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.label}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
            <p className="t-small mt-2 text-muted">{video.meta}</p>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-20 flex items-center justify-between border-t border-foreground/15 pt-8">
        <span className="t-small text-muted">
          <ScrambleText
            text={`motion · capturing all angles · ${new Date().getFullYear()}`}
            delayMs={100}
            hover={false}
          />
        </span>
        <Link
          href="/book"
          className="t-small text-foreground transition-colors duration-300 hover:text-accent"
        >
          <ScrambleText text="book a shoot →" delayMs={180} />
        </Link>
      </div>
    </main>
  );
}
