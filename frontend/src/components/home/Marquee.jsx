const ITEMS = [
  "Union Budget documents",
  "RBI bulletins",
  "MoSPI releases",
  "Lok Sabha & Rajya Sabha Q&A",
  "CAG audit reports",
  "PIB press releases",
  "Census of India",
  "Gazette notifications",
  "Economic Survey",
  "State budgets",
  "Parliamentary committee reports",
  "Your newsroom archive",
];

export const Marquee = () => (
  <section className="relative overflow-hidden border-y border-rule bg-paper py-7" data-testid="sources-marquee">
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-paper to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-paper to-transparent" />
    <div className="marquee-track flex w-max items-center">
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className={`px-8 font-display text-[34px] leading-none tracking-tight md:text-[44px] ${i % 2 ? "italic text-[#6B6B63]" : "text-ink"}`}>{t}</span>
          <span className="h-2 w-2 rotate-45 bg-signal" />
        </span>
      ))}
    </div>
  </section>
);
