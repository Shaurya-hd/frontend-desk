import { useLenis } from "lenis/react";
import { ShieldCheck, BarChart3, Waypoints, ArrowRight } from "lucide-react";
import { Eyebrow, FadeUp, MaskLines } from "@/components/site/Reveal";

const FEATURES = [
  {
    n: "01",
    Icon: ShieldCheck,
    title: "Deep Research & Verification",
    text: "Ask any question. Chople searches trusted, official sources and checks every claim against the original document.",
    gets: ["Answers from approved sources only", "Every claim linked to its source"],
    id: "f-research",
  },
  {
    n: "02",
    Icon: BarChart3,
    title: "Visualisation & Anomaly Detection",
    text: "Answers come as the right chart, table or timeline — and unusual spikes, drops or conflicting figures are flagged.",
    gets: ["Auto-picked charts you can switch", "Anomalies highlighted for you"],
    id: "f-visual",
  },
  {
    n: "03",
    Icon: Waypoints,
    title: "Connections",
    text: "Chople links events, people, policies and data across stories to reveal the bigger narrative behind the news.",
    gets: ["Hidden links between stories", "Triggering events surfaced"],
    id: "f-connections",
  },
];

export const FeaturesIntro = () => {
  const lenis = useLenis();
  return (
    <section id="features" className="mx-auto max-w-[1440px] px-5 pb-8 pt-28 lg:px-10 lg:pt-36" data-testid="features-intro">
      <div className="max-w-4xl">
        <Eyebrow>What Chople Desk does</Eyebrow>
        <h2 className="mt-6 font-display text-5xl font-medium leading-[1] tracking-[-0.025em] sm:text-6xl lg:text-[4.6rem]">
          <MaskLines inView lines={["Three tools. One research desk.", <em key="e" className="italic text-signal">Built for journalists.</em>]} />
        </h2>
        <FadeUp delay={0.1}>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-[#3A3A3A]">Chople Desk does the searching, checking and charting — so reporters spend their time on the story, not the legwork.</p>
        </FadeUp>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {FEATURES.map(({ n, Icon, title, text, gets, id }, i) => (
          <FadeUp key={n} delay={i * 0.08} className="h-full">
            <button
              onClick={() => lenis?.scrollTo(`#${id}`, { offset: -90 })}
              className="group flex h-full w-full flex-col border border-ink bg-white p-8 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0_#0F0F0F]"
              data-testid={`features-toc-${n}`}
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center bg-ink text-paper transition-colors duration-300 group-hover:bg-signal"><Icon className="h-5 w-5" /></span>
                <span className="font-display text-4xl font-medium text-[#C9C3B3]">{n}</span>
              </div>
              <h3 className="mt-8 text-[24px] font-semibold leading-tight tracking-[-0.02em]">{title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-[#4A4A4A]">{text}</p>
              <ul className="mt-6 space-y-2 border-t border-rule pt-5">
                {gets.map((g) => (
                  <li key={g} className="flex items-center gap-2.5 text-[15px] text-ink"><span className="h-1.5 w-1.5 bg-signal" />{g}</li>
                ))}
              </ul>
              <span className="mt-auto flex items-center gap-2 pt-8 text-[15px] font-medium text-signal">See how it works <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></span>
            </button>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};
