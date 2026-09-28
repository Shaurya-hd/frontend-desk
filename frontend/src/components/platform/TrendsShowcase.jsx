import { useLenis } from "lenis/react";
import { Eyebrow, FadeUp, MaskLines } from "@/components/site/Reveal";
import { TrendsView } from "./AppViews";

export const TrendsShowcase = () => {
  const lenis = useLenis();
  return (
    <section className="border-t border-rule bg-paper-2 py-24 lg:py-32" data-testid="trends-showcase">
      <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow>Trends</Eyebrow>
            <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[4.8rem]">
              <MaskLines inView lines={["Every headline,", <em key="e" className="italic text-signal">already connected.</em>]} />
            </h2>
          </div>
          <FadeUp delay={0.1} className="flex items-end lg:col-span-5">
            <p className="max-w-md text-[16px] leading-relaxed text-[#3A3A3A]">Trends watches your news feeds and links each story to past coverage in your archive, the datasets behind it and related developments — then hands it to Research Mode in one click.</p>
          </FadeUp>
        </div>
        <FadeUp className="mt-14 overflow-hidden border border-ink bg-[#FAFAF8] shadow-[10px_10px_0_#0F0F0F]">
          <TrendsView onOpen={() => lenis?.scrollTo("#app-mock-anchor", { offset: -100 })} />
        </FadeUp>
      </div>
    </section>
  );
};
