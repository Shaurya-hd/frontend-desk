import { FadeUp } from "@/components/site/Reveal";

const LOGOS = [
  { src: "/logos/ht.svg", alt: "Hindustan Times", h: "h-7" },
  { src: "/logos/indiatoday.png", alt: "India Today", h: "h-10" },
  { src: "/logos/ndtv.svg", alt: "NDTV", h: "h-8" },
  { src: "/logos/republic.svg", alt: "Republic World", h: "h-7" },
];

export const TrustedBy = () => (
  <section className="mt-12 border-y border-rule py-6" data-testid="trusted-by">
    <div className="grid items-center gap-6 lg:grid-cols-[240px_1fr]">
      <FadeUp>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#6B6B63]">Trusted by users from</p>
        <p className="mt-1 font-display text-2xl leading-tight">India's leading newsrooms</p>
      </FadeUp>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent" />
        <div className="logo-track flex w-max items-center">
          {[0, 1, 2, 3].flatMap((r) =>
            LOGOS.map((l, i) => (
              <div key={`${r}-${i}`} className="flex h-20 w-[240px] shrink-0 items-center justify-center border-l border-rule px-8" data-testid={r === 0 ? `trusted-logo-${i}` : undefined}>
                <img src={l.src} alt={l.alt} className={`${l.h} w-auto max-w-[170px] object-contain opacity-60 grayscale transition-[filter,opacity] duration-500 hover:opacity-100 hover:grayscale-0`} loading="lazy" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </section>
);
