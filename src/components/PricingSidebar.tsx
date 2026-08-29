import { BOOKING_POLICY, PRICING } from '@/lib/pricing';

export function PricingSidebar() {
  return (
    <div className="mt-12 flex flex-col">
      <p className="t-small text-muted">2026–2027 rates</p>

      <div className="mt-4 border-t border-white/20">
        {PRICING.map((section) => (
          <details
            key={section.id}
            className="group border-b border-white/20"
            open={section.id === 'photography'}
          >
            <summary
              data-hover-sound
              className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-4 transition-colors duration-300 select-none hover:text-accent [&::-webkit-details-marker]:hidden"
            >
              <span className="t-small">{section.label}</span>
              <span className="flex shrink-0 items-baseline gap-3">
                {section.from ? (
                  <span className="t-small text-muted">{section.from}</span>
                ) : null}
                <span aria-hidden className="t-small w-4 text-center text-muted">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </span>
            </summary>

            <ul className="flex flex-col gap-5 pb-6">
              {section.packages.map((pkg) => (
                <li key={pkg.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[1.4rem] leading-[1.2] uppercase">
                      {pkg.name}
                    </span>
                    <span className="shrink-0 font-mono text-[1.4rem] leading-[1.2] text-accent uppercase">
                      {pkg.price}
                    </span>
                  </div>
                  {pkg.detail ? (
                    <p className="mt-1 max-w-[28ch] font-mono text-[1.1rem] leading-[1.4] text-muted uppercase">
                      {pkg.detail}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <ul className="mt-8 flex flex-col gap-2">
        {BOOKING_POLICY.map((line) => (
          <li key={line} className="t-small text-muted">
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
