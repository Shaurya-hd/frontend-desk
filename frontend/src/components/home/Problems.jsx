import { Search, ShieldCheck, Layers, Archive, Cpu } from "lucide-react";
import { Eyebrow, FadeUp, MaskLines } from "@/components/site/Reveal";

const PROBLEMS = [
  { Icon: Search, title: "Most of the day goes into just finding information", text: "Reporters dig through clunky government sites, portals, PDFs and social media to find basic facts.", fix: "Deep Research" },
  { Icon: ShieldCheck, title: "Every fact is checked by hand", text: "Numbers, quotes and claims are cross-checked across sources manually — under deadline.", fix: "Verification" },
  { Icon: Layers, title: "Information is scattered everywhere", text: "Wires, databases, archives and tools don't connect, so journalists keep switching tabs.", fix: "One desk, 503 sources" },
  { Icon: Archive, title: "Years of reporting sit unused in the archive", text: "Past stories depend on someone remembering them — so research starts from scratch.", fix: "Archive search" },
  { Icon: Cpu, title: "Newsroom tools haven't kept up", text: "Data has exploded, but the workflow is still browsing, spreadsheets and bookmarks.", fix: "Connections & Trends" },
];

export const Problems = () => (
  <section id="problem" className="border-t border-rule bg-paper-2 py-24 lg:py-32" data-testid="problems-section">
    <div className="mx-auto grid max-w-[1440px] gap-14 px-5 lg:grid-cols-12 lg:px-10">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[4.6rem]">
            <MaskLines inView lines={["What's holding", <>newsrooms <em key="e" className="italic text-signal">back.</em></>]} />
          </h2>
          <FadeUp delay={0.1} className="mt-10 border-l-2 border-ink pl-6" data-testid="problem-stat">
            <div className="font-display text-[5.5rem] font-medium leading-none tracking-[-0.04em] lg:text-[7rem]">70–80%</div>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-[#3A3A3A]">of a journalist's research time is spent <strong className="font-medium text-ink">gathering</strong> information — not writing the story.</p>
          </FadeUp>
        </div>
      </div>

      <div className="border-t border-ink lg:col-span-7">
        {PROBLEMS.map(({ Icon, title, text }, i) => (
          <FadeUp key={title} delay={i * 0.06} className="group grid grid-cols-[auto_1fr] gap-5 border-b border-rule py-7 transition-colors duration-300 hover:bg-paper sm:px-4" data-testid={`problem-card-${i + 1}`}>
            <div className="flex items-start gap-4">
              <span className="pt-1 font-mono text-[11px] text-[#8A8A80]">0{i + 1}</span>
              <span className="flex h-10 w-10 items-center justify-center border border-ink bg-paper transition-colors duration-300 group-hover:bg-ink group-hover:text-paper"><Icon className="h-4 w-4" /></span>
            </div>
            <div>
              <h3 className="font-display text-[26px] font-medium leading-[1.1] tracking-tight lg:text-[30px]">{title}</h3>
              <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#4A4A4A]">{text}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);
