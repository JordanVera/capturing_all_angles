'use client';

import Link from 'next/link';
import { ScrambleText } from '@/components/ScrambleText';
//www.youtube.com/watch?v=

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

export function VideoGallery() {
  const featured = VIDEOS[0];
  const rest = VIDEOS.slice(1);

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
            <ScrambleText text={`${VIDEOS.length} FILMS`} delayMs={220} />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-foreground/15 pt-5">
          <span className="t-small text-muted">
            <ScrambleText text="videographer" delayMs={300} hover={false} />
          </span>
          <span className="t-small text-foreground/20">——</span>
          <span className="t-small text-muted">
            <ScrambleText text="all angles" delayMs={360} hover={false} />
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
            text="motion · all angles · 2026"
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
