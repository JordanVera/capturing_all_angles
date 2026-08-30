'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ScrambleText } from '@/components/ScrambleText';
import type { GalleryImage } from '@/lib/gallery';

type Props = {
  images: GalleryImage[];
};

export function PhotoGallery({ images }: Props) {
  return (
    <main className="min-h-dvh px-8 pt-36 pb-32 md:pt-40">
      {/* Page Header */}
      <div className="mb-16">
        <div className="flex items-end justify-between gap-4">
          <h1
            className="t-nav leading-none"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)' }}
          >
            <ScrambleText text="STILLS" delayMs={80} />
          </h1>
          <span className="t-small mb-1 text-accent">
            <ScrambleText
              text={`${String(images.length).padStart(2, '0')} FRAMES`}
              delayMs={220}
            />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-foreground/15 pt-5">
          <span className="t-small text-muted">
            <ScrambleText text="photographer" delayMs={300} hover={false} />
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
            <ScrambleText text="2026" delayMs={420} hover={false} />
          </span>
        </div>
      </div>

      {/* Contact-Sheet Masonry Grid */}
      <div className="columns-2 gap-2.5 md:columns-3 lg:columns-4">
        {images.map((image, i) => (
          <div
            key={image.src}
            className="gallery-tile group relative mb-2.5 break-inside-avoid overflow-hidden border border-foreground/10 transition-colors duration-300 hover:border-accent"
            style={{ animationDelay: `${Math.min(i * 40, 700)}ms` }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={i < 8}
              placeholder={image.lqip ? 'blur' : 'empty'}
              blurDataURL={image.lqip}
              aria-hidden={!image.alt || undefined}
            />
            {/* Subtle accent wash on hover */}
            <div className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/5" />
            {/* Frame number */}
            <span className="absolute right-2 bottom-2 z-10 t-small text-foreground/25 transition-colors duration-300 group-hover:text-accent">
              [{String(i + 1).padStart(2, '0')}]
            </span>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-20 flex items-center justify-between border-t border-foreground/15 pt-8">
        <span className="t-small text-muted">
          <ScrambleText
            text={`stills · capturing all angles · ${new Date().getFullYear()}`}
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
