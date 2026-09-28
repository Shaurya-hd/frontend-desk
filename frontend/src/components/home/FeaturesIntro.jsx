import { useLenis } from "lenis/react";
import { Eyebrow, FadeUp, MaskLines } from "@/components/site/Reveal";

const ITEMS = [
  ["01", "Deep Research & Verification", "Research and verify any story from trusted sources.", "f-research"],
  ["02", "Visualisation & Anomaly Detection", "Don't just give the answer. Show what matters.", "f-visual"],
  ["03", "Connections", "Connect the dots. Discover the bigger story.", "f-connections"],
];

export const FeaturesIntro = () => {
  const lenis = useLenis();
  return (
    <section id="features" className="mx-auto max-w-[1440px] px-5 pb-10 pt-28 lg:px-10 lg:pt-36" data-testid="features-intro">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>The Desk</Eyebrow>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[5.2rem]">
            <MaskLines inView lines={["Chople does the legwork.", <em key="e" className="italic text-signal">You break the story.</em>]} />
          </h2>
        </div>
        <FadeUp delay={0.15} className="flex items-end lg:col-span-5">
          <p className="max-w-md text-[16px] leading-relaxed text-[#3A3A3A]">Three capabilities, one workspace. Each one replaces hours of tab-switching with a single question.</p>
        </FadeUp>
      </div>
      <div className="mt-16 grid border-t border-ink md:grid-cols-3">
        {ITEMS.map(([n, t, s, id], i) => (
          <FadeUp key={n} delay={i * 0.08}>
            <button onClick={() => lenis?.scrollTo(`#${id}`, { offset: -90 })} className={`group block h-full w-full py-8 text-left transition-colors duration-300 hover:bg-paper-2 md:px-6 ${i ? "md:border-l md:border-rule" : ""} border-b border-rule md:border-b-0`} data-testid={`features-toc-${n}`}>
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] text-[#6B6B63]"><span>{n}</span><span className="translate-x-[-6px] opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0 group-hover:opacity-100">JUMP →</span></div>
              <div className="mt-5 font-display text-3xl font-medium leading-tight tracking-tight">{t}</div>
              <div className="mt-2 text-[14px] text-[#4A4A4A]">{s}</div>
            </button>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};
