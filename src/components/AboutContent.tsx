'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ScrambleText } from '@/components/ScrambleText';

const PORTRAITS = {
  hero: {
    src: '/images/woah/1.jpg',
    alt: 'Chris Theriot, photographer and videographer based in Houston',
    width: 3243,
    height: 4096,
  },
  full: {
    src: '/images/woah/2.jpg',
    alt: 'Chris Theriot on the red carpet',
    width: 1440,
    height: 1800,
  },
} as const;

const imageFrame =
  'group relative overflow-hidden border border-foreground/10 transition-colors duration-300 hover:border-accent';

export function AboutContent() {
  return (
    <main className="min-h-dvh px-8 pt-36 pb-32 md:pt-40">
      <section>
        <div className="flex items-end justify-between gap-4">
          <h1
            className="t-nav leading-none"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)' }}
          >
            <ScrambleText text="ABOUT" delayMs={80} />
          </h1>
          <span className="t-small mb-1 text-accent">
            <ScrambleText text="01" delayMs={220} />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-foreground/15 pt-5">
          <span className="t-small text-muted">
            <ScrambleText text="chris theriot" delayMs={300} hover={false} />
          </span>
          <span className="t-small text-foreground/20">——</span>
          <span className="t-small text-muted">
            <ScrambleText text="houston, tx" delayMs={360} hover={false} />
          </span>
          <span className="t-small text-foreground/20">——</span>
          <span className="t-small text-muted">
            <ScrambleText text="est. 2016" delayMs={420} hover={false} />
          </span>
        </div>

        <div className="mt-16 grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div className="order-2 md:sticky md:top-36 md:order-1 md:col-span-5 md:self-start">
            <div className="flex flex-col gap-6 font-sans text-[1.55rem] leading-[1.55] font-medium text-foreground/85">
              <p>
                Chris Theriot is a photographer and videographer based in
                Houston, TX. Chris created Capturing All Angles in 2016 when he
                realized his eye behind the camera captured the unexpected
                moments that people want to remember. Photography is more than a
                profession or hobby, but it&apos;s Chris&apos;s passion to
                create art and visuals that would last a lifetime.
              </p>
              <p>
                Chris prides himself on delivering natural, radiant, and quality
                images and videos to his clients. He manages to always remember
                that the small details is what matters, plus he enjoys the
                creative process. Chris knows how to capture the memorable and
                genuine moments, while creating unique visuals from ALL angles.
              </p>
            </div>
          </div>

          <div
            className="gallery-tile order-1 md:order-2 md:col-span-7"
            style={{ animationDelay: '120ms' }}
          >
            <div className={imageFrame}>
              <Image
                src={PORTRAITS.hero.src}
                alt={PORTRAITS.hero.alt}
                width={PORTRAITS.hero.width}
                height={PORTRAITS.hero.height}
                className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 46vw, 24vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/5" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-28 md:mt-40">
        <div className="flex items-end justify-between gap-4">
          <h2
            className="t-nav leading-none"
            style={{ fontSize: 'clamp(2.4rem, 6vw, 7rem)' }}
          >
            <ScrambleText text="behind the lens" delayMs={80} />
          </h2>
          <span className="t-small mb-1 text-accent">
            <ScrambleText text="02" delayMs={220} />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-foreground/15 pt-5">
          <span className="t-small text-muted">
            <ScrambleText text="photographer" delayMs={300} hover={false} />
          </span>
          <span className="t-small text-foreground/20">——</span>
          <span className="t-small text-muted">
            <ScrambleText text="videographer" delayMs={360} hover={false} />
          </span>
        </div>

        <div className="mt-16 grid items-start gap-12 md:grid-cols-12 md:gap-16">
          <div
            className="gallery-tile md:col-span-7"
            style={{ animationDelay: '160ms' }}
          >
            <div className="relative pb-16 md:pb-24">
              <div className={`${imageFrame} w-[86%] md:w-[82%]`}>
                <Image
                  src={PORTRAITS.full.src}
                  alt={PORTRAITS.full.alt}
                  width={PORTRAITS.full.width}
                  height={PORTRAITS.full.height}
                  className="block h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 86vw, 48vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-accent/0 transition-colors duration-300 group-hover:bg-accent/5" />
              </div>
            </div>
          </div>

          <div className="md:sticky md:top-36 md:col-span-5 md:self-start">
            <div className="flex flex-col gap-6 font-sans text-[1.55rem] leading-[1.55] font-medium text-foreground/85">
              {/* <p>
                Chris Theriot is a photographer and videographer based in
                Houston, TX. Chris created Capturing All Angles in 2016 when he
                realized his eye behind the camera captured the unexpected
                moments that people want to remember. Photography is more than a
                profession or hobby, but it&apos;s Chris&apos;s passion to
                create art and visuals that would last a lifetime.
              </p>
              <p>
                Chris prides himself on delivering natural, radiant, and quality
                images and videos to his clients. He manages to always remember
                that the small details is what matters, plus he enjoys the
                creative process. Chris knows how to capture the memorable and
                genuine moments, while creating unique visuals from ALL angles.
              </p> */}
              <p>
                Capturing All Angles, LLC. is an independent photography and
                video production company that specializes in high-quality
                content. CAA is committed to capturing all celebratory moments
                during various occasions through photography and videography.
              </p>
              <p>
                CAA offers photography, filmmaking, commercials, social media
                content, and more depending upon request. Capturing All Angles
                also provides exceptional customer services for each and every
                client. CAA is based in Houston, TX, but Chris has traveled to a
                variety of states for projects too!
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-20 flex items-center justify-between border-t border-foreground/15 pt-8">
        <span className="t-small text-muted">
          <ScrambleText
            text="est. 2016 · houston, tx"
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
