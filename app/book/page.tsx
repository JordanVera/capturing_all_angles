import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { SiteChrome } from "@/components/SiteChrome";
import { VIDEOS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a shoot — All Angles",
  description:
    "Book a photographer and videographer for editorial, commercial, wedding, or personal work.",
};

export default function BookPage() {
  return (
    <SiteChrome>
      <main className="relative px-8 pt-36 pb-32 md:pt-40">
        <div className="pointer-events-none absolute top-[20%] right-[6%] hidden h-[28vh] w-[32vw] md:block">
          <div
            className="h-full w-full overflow-hidden"
            style={{
              clipPath:
                "polygon(10% 22%, 42% 4%, 86% 12%, 100% 48%, 84% 92%, 38% 100%, 4% 74%)",
            }}
          >
            <video
              className="h-full w-full object-cover opacity-80"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              src={VIDEOS[4]}
            />
          </div>
        </div>

        <div className="relative grid max-w-6xl gap-16 md:grid-cols-12">
          <section className="md:col-span-5">
            <h1 className="t-nav">
              book
              <br />
              a shoot
            </h1>
            <p className="mt-8 max-w-sm font-mono text-[1.4rem] leading-[1.4] text-foreground uppercase">
              Photographer and videographer for editorial, commercial, weddings,
              and personal work. Tell us the frame you need — stills, motion, or both.
            </p>
            <p className="t-small mt-8 text-muted">
              reply within 48 hours
            </p>
          </section>

          <section className="md:col-span-7">
            <BookingForm />
          </section>
        </div>
      </main>
    </SiteChrome>
  );
}