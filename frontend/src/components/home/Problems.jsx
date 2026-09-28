import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Eyebrow, FadeUp, MaskLines, EASE } from "@/components/site/Reveal";

const Card = ({ n, title, text, className = "", children, delay = 0, testId }) => (
  <FadeUp delay={delay} className={`group relative flex flex-col justify-between overflow-hidden p-7 transition-colors duration-500 hover:!bg-[#141414] lg:p-9 ${className}`} data-testid={testId}>
    <div>
      <div className="font-mono text-[11px] tracking-[0.2em] text-white/40">{n}</div>
      <h3 className="mt-5 max-w-md font-display text-[28px] font-medium leading-[1.05] tracking-tight text-paper lg:text-[34px]">{title}</h3>
      <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/60">{text}</p>
    </div>
    <div className="mt-8">{children}</div>
  </FadeUp>
);

const GatherBar = () => (
  <div>
    <div className="flex h-14 w-full overflow-hidden border border-white/15">
      <motion.div initial={{ width: 0 }} whileInView={{ width: "76%" }} viewport={{ once: true }} transition={{ duration: 1.6, ease: EASE, delay: 0.3 }} className="hatch flex items-center bg-alert/20 pl-3 font-mono text-[11px] text-alert">
        <span className="bg-coal px-1.5 py-0.5">GATHERING · 76%</span>
      </motion.div>
      <div className="flex flex-1 items-center justify-center bg-white/[0.06] font-mono text-[11px] text-white/60">WRITING</div>
    </div>
    <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-white/35"><span>0 min</span><span>A 2-hour research session</span><span>120 min</span></div>
  </div>
);

const VerifyRows = () => (
  <div className="space-y-2">
    {["“Allocation rose 3× since 2018”", "“Growth at 8.2% in FY24”", "Quote attributed to minister"].map((c, i) => (
      <div key={c} className="flex items-center justify-between border border-white/10 px-3 py-2 font-mono text-[11.5px] text-white/70">
        <span className="truncate">{c}</span>
        {i === 0 ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Loader2 className="h-3.5 w-3.5 animate-spin text-white/40" />}
      </div>
    ))}
  </div>
);

const TABS = ["gov.in portal", "Budget_2023.pdf", "Wire feed", "X / Twitter", "Archive 2014", "data.xlsx", "RBI bulletin", "Lok Sabha Q&A"];
const ScatterTabs = () => (
  <div className="flex flex-wrap gap-2">
    {TABS.map((t, i) => (
      <motion.span key={t} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.5 }} className="border border-white/15 px-2.5 py-1 font-mono text-[10.5px] text-white/60">{t}</motion.span>
    ))}
  </div>
);

const ArchiveGrid = () => (
  <div className="grid grid-cols-12 gap-1.5">
    {Array.from({ length: 48 }).map((_, i) => (
      <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: i % 11 === 3 ? 1 : 0.18 + (i % 5) * 0.05 }} viewport={{ once: true }} transition={{ delay: i * 0.015 }} className={`aspect-square ${i % 11 === 3 ? "bg-signal" : "bg-white"}`} />
    ))}
    <div className="col-span-12 mt-2 flex justify-between font-mono text-[10px] text-white/35"><span>2008</span><span>4 of 48 archives ever reused</span><span>2025</span></div>
  </div>
);

const ScaleGap = () => (
  <svg viewBox="0 0 300 110" className="h-44 w-full">
    <motion.path d="M0 100 C 120 98, 190 80, 240 40 S 290 4, 300 2" fill="none" stroke="#2F5CF0" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: EASE }} />
    <motion.path d="M0 96 L 300 88" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="4 4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease: EASE }} />
    <text x="205" y="18" fill="#7C98FF" fontFamily="JetBrains Mono" fontSize="9">DATA AVAILABLE</text>
    <text x="190" y="80" fill="rgba(255,255,255,0.5)" fontFamily="JetBrains Mono" fontSize="9">NEWSROOM TOOLS</text>
  </svg>
);

export const Problems = () => (
  <section id="problem" className="relative bg-coal py-28 text-paper lg:py-36" data-testid="problems-section">
    <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow dark>The problem</Eyebrow>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[5.6rem]">
            <MaskLines inView lines={["The problems holding", <>modern newsrooms <em className="italic text-white/50">back.</em></>]} />
          </h2>
        </div>
        <FadeUp delay={0.2} className="flex items-end lg:col-span-4">
          <p className="max-w-sm text-[15px] leading-relaxed text-white/60">Reporters spend most of their day not reporting — but hunting, checking and re-checking information scattered across the internet.</p>
        </FadeUp>
      </div>

      <div className="mt-16 grid gap-px bg-white/10 lg:grid-cols-12">
        <Card n="01" testId="problem-card-1" className="bg-coal lg:col-span-7 lg:row-span-2" title="70–80% of research time is spent just gathering information." text="Journalists repeatedly search poorly designed government websites, news portals, PDFs, archives and social media to find basic information.">
          <div className="font-display text-[7rem] font-medium leading-none tracking-[-0.05em] text-paper lg:text-[10rem]">70<span className="text-white/30">–</span>80<span className="text-signal">%</span></div>
          <div className="mt-6"><GatherBar /></div>
        </Card>
        <Card n="02" testId="problem-card-2" delay={0.08} className="bg-coal lg:col-span-5" title="Every fact has to be verified by hand." text="Claims, statistics, quotes and sources are cross-checked manually across multiple sources — under tight deadlines.">
          <VerifyRows />
        </Card>
        <Card n="03" testId="problem-card-3" delay={0.16} className="bg-coal lg:col-span-5" title="Information is scattered across millions of places." text="Wires, government databases, social media, archives and research tools don't talk to each other — so journalists keep switching between systems.">
          <ScatterTabs />
        </Card>
        <Card n="04" testId="problem-card-4" delay={0.08} className="bg-coal lg:col-span-6" title="Years of reporting stay buried in the archive." text="Internal archives go unused because finding them depends on someone's memory — so stories get researched from scratch, again and again.">
          <ArchiveGrid />
        </Card>
        <Card n="05" testId="problem-card-5" delay={0.16} className="bg-coal lg:col-span-6" title="Newsroom tech hasn't kept pace with the data." text="Data has exploded. The workflow still runs on browsing, spreadsheets, PDFs, bookmarks and repetitive manual work.">
          <ScaleGap />
        </Card>
      </div>
    </div>
  </section>
);
