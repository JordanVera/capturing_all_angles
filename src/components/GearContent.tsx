'use client';

import Link from 'next/link';
import { GEAR, GEAR_CATEGORIES } from '@/lib/gear';
import { GearViewer } from '@/components/GearViewer';
import { ScrambleText } from '@/components/ScrambleText';

const camera = GEAR.find((item) => item.id === 'sony-a7');

export function GearContent() {
  if (!camera?.image) return null;

  return (
    <main className="min-h-dvh px-8 pt-36 pb-32 md:pt-40">
      <div className="mb-16">
        <div className="flex items-end justify-between gap-4">
          <h1
            className="t-nav leading-none"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)' }}
          >
            <ScrambleText text="GEAR" delayMs={80} />
          </h1>
          <span className="t-small mb-1 text-accent">
            <ScrambleText text="01 BODY" delayMs={220} />
          </span>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-6 border-t border-foreground/15 pt-5">
          <span className="t-small text-muted">
            <ScrambleText text="kit" delayMs={300} hover={false} />
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

      <div className="mb-12 grid gap-2 border-t border-foreground/15 md:grid-cols-3">
        {GEAR_CATEGORIES.map((category, index) => {
          const item = GEAR.find((entry) => entry.category === category.id);
          const active = category.id === 'camera';
          return (
            <div
              key={category.id}
              className={`flex items-baseline justify-between gap-4 border-b border-foreground/15 py-4 ${
                active ? 'text-foreground' : 'text-muted'
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className={`t-small ${active ? 'text-accent' : 'text-muted'}`}
                >
                  [{String(index + 1).padStart(2, '0')}]
                </span>
                <span className="t-small">{category.label}</span>
              </div>
              <span className="t-small">
                {item?.ready ? item.name : 'soon'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
        <section
          className="gallery-tile md:col-span-8"
          style={{ animationDelay: '120ms' }}
        >
          <GearViewer
            src={camera.image}
            alt={camera.alt ?? camera.name}
            width={camera.width ?? 1200}
            height={camera.height ?? 1050}
            priority
          />
          <div className="mt-3 flex items-center justify-between">
            <span className="t-small text-muted">
              <ScrambleText text={camera.name} delayMs={480} hover={false} />
            </span>
            <span className="t-small text-foreground/25">[01]</span>
          </div>
        </section>

        <aside className="md:sticky md:top-36 md:col-span-4 md:self-start">
          <p className="t-small text-accent">
            <ScrambleText text="body" delayMs={260} hover={false} />
          </p>
          <h2
            className="t-nav mt-3 leading-none"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 4.2rem)' }}
          >
            <ScrambleText text={camera.name} delayMs={300} />
          </h2>
          <p className="mt-6 font-sans text-[1.55rem] leading-[1.55] font-medium text-foreground/85">
            The body behind the stills and the motion. Full-frame Sony, E-mount
            glass, always ready for the unexpected angle.
          </p>
          <dl className="mt-10 border-t border-foreground/15">
            {camera.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between gap-6 border-b border-foreground/15 py-4"
              >
                <dt className="t-small text-muted">{spec.label}</dt>
                <dd className="t-small text-foreground">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="mt-20 flex items-center justify-between border-t border-foreground/15 pt-8">
        <span className="t-small text-muted">
          <ScrambleText
            text="kit · capturing all angles · 2026"
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
