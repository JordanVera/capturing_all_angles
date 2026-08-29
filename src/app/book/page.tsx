import type { Metadata } from 'next';
import { BookingForm } from '@/components/BookingForm';
import { PricingSidebar } from '@/components/PricingSidebar';
import { SiteChrome } from '@/components/SiteChrome';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Book a shoot — All Angles',
  description:
    'Book a photographer and videographer for editorial, commercial, wedding, or personal work.',
};

export default function BookPage() {
  return (
    <SiteChrome>
      <main className="relative px-8 pt-36 pb-32 md:pt-40">
        <div className="pointer-events-none absolute top-[20%] right-[6%] hidden w-[26vw] md:block">
          <div className="h-full w-full overflow-hidden">
            <Image
              src="/woah.jpg"
              alt="Book"
              width={100}
              height={100}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="relative grid max-w-6xl gap-16 md:grid-cols-12">
          <section className="no-scrollbar md:sticky md:top-36 md:col-span-5 md:max-h-[calc(100dvh-17rem)] md:overflow-y-auto md:pr-4">
            <h1 className="t-nav">
              book
              <br />a shoot
            </h1>
            <p className="mt-8 max-w-sm font-mono text-[1.4rem] leading-[1.4] text-foreground uppercase">
              Photographer and videographer for editorial, commercial, weddings,
              and personal work. Tell us the frame you need — stills, motion, or
              both.
            </p>
            <p className="t-small mt-8 text-muted">reply within 48 hours</p>
            <div className="hidden md:block">
              <PricingSidebar />
            </div>
          </section>

          <section className="md:col-span-7">
            <BookingForm />
          </section>

          <section className="md:hidden">
            <PricingSidebar />
          </section>
        </div>
      </main>
    </SiteChrome>
  );
}
