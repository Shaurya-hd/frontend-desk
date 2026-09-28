import { Table2, LineChart as LineIcon, GanttChart } from "lucide-react";
import { FeatureTitle, FadeUp, MaskLines } from "@/components/site/Reveal";
import { ChartStudio } from "@/components/charts/ChartStudio";

const FORMATS = [
  { Icon: Table2, q: "“Compare the three schemes…”", f: "Comparison", to: "Table" },
  { Icon: LineIcon, q: "“GDP growth over five years…”", f: "Trend", to: "Line chart" },
  { Icon: GanttChart, q: "“How did the policy unfold…”", f: "Sequence of events", to: "Timeline" },
];

export const FeatureVisual = () => (
  <section id="f-visual" className="border-y border-rule bg-paper-2 py-24 lg:py-32" data-testid="feature-visual">
    <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <FeatureTitle n="02" title="Visualisation & Anomaly Detection" />
          <h3 className="mt-8 font-display text-4xl font-medium leading-[1.02] tracking-[-0.025em] lg:text-[3.4rem]">
            <MaskLines inView lines={["Don't just give the answer.", <em key="e" className="italic text-signal">Show what matters.</em>]} />
          </h3>
        </div>
        <FadeUp delay={0.1} className="flex items-end lg:col-span-5">
          <p className="max-w-md text-[17px] leading-relaxed text-[#3A3A3A]">Chople picks the clearest format for every answer — and points out anything unusual in the numbers.</p>
        </FadeUp>
      </div>

      <div className="mt-14 grid gap-px border border-rule bg-rule md:grid-cols-3">
        {FORMATS.map(({ Icon, q, f, to }, i) => (
          <FadeUp key={to} delay={i * 0.08} className="group flex items-center justify-between gap-4 bg-paper p-5 transition-colors hover:bg-white" data-testid={`format-card-${i}`}>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">{f}</div>
              <div className="mt-1.5 font-display text-xl italic text-[#3A3A3A]">{q}</div>
            </div>
            <div className="flex shrink-0 items-center gap-2 border border-ink px-3 py-2 text-[12.5px] font-medium transition-colors group-hover:bg-ink group-hover:text-paper">
              <Icon className="h-4 w-4" /> {to}
            </div>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={0.1} className="mt-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[16px] font-medium">Try it: switch between line, bar and pie.</p>
          <p className="font-mono text-[10.5px] text-[#8A8A80]">Figures shown for demonstration</p>
        </div>
        <ChartStudio idPrefix="studio" />
      </FadeUp>

      <FadeUp className="mt-10">
        <p className="font-display text-3xl leading-tight tracking-tight lg:text-[2.6rem]">Turn hours of research into insights you understand <em className="italic text-signal">in seconds.</em></p>
      </FadeUp>
    </div>
  </section>
);
