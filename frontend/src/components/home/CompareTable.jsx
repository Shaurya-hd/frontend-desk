import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { Eyebrow, FadeUp, MaskLines, EASE } from "@/components/site/Reveal";

const COLS = ["Chople's Desk", "ChatGPT", "Claude", "Other research tools"];
const Y = "y", N = "n", P = "p";
const ROWS = [
  ["Answers only from pre-approved, credible sources", N, N, P],
  ["Every claim traced to the original document", P, P, P],
  ["Detects your question and picks the format — chart, table or timeline", N, N, N],
  ["Interactive charts: switch line, bar & pie, copy & export data", N, N, P],
  ["Flags anomalies & conflicting values across sources", N, N, N],
  ["Direct access to 500+ live official government datasets", N, N, P],
  ["Connects events, people & policies into one narrative", N, N, N],
  ["Searches your newsroom's own internal archive", N, N, P],
  ["One-click notes with citations attached", N, N, N],
  ["Trends that link live news feeds to related coverage", N, N, P],
  ["Built for newsroom deadlines & editorial workflows", N, N, N],
];

const Mark = ({ v, hero }) => {
  if (hero) return <span className="inline-flex h-7 w-7 items-center justify-center bg-signal text-white"><Check className="h-4 w-4" strokeWidth={2.5} /></span>;
  if (v === P) return <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#8A8A80]"><Minus className="h-4 w-4" /> Limited</span>;
  return <span className="inline-flex h-7 w-7 items-center justify-center border border-rule text-[#A8A89E]"><X className="h-3.5 w-3.5" /></span>;
};

export const CompareTable = () => (
  <section className="border-t border-rule bg-paper py-24 lg:py-32" data-testid="compare-table-section">
    <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow>Chople vs other tools</Eyebrow>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[5rem]">
            <MaskLines inView lines={["How is Chople different", <em key="e" className="italic text-signal">from other tools?</em>]} />
          </h2>
        </div>
        <FadeUp delay={0.1} className="flex items-end lg:col-span-4">
          <p className="max-w-sm text-[15px] leading-relaxed text-[#3A3A3A]">General-purpose assistants are brilliant writers. Newsrooms need something else: verified sources, the right format, and a trail back to the document.</p>
        </FadeUp>
      </div>

      <FadeUp className="mt-14 overflow-x-auto no-scrollbar">
        <table className="w-full min-w-[820px] border-collapse" data-testid="compare-table">
          <thead>
            <tr className="border-y-2 border-ink">
              <th className="w-[40%] py-4 pr-4 text-left font-mono text-[10.5px] font-normal uppercase tracking-[0.18em] text-[#6B6B63]">Capability</th>
              {COLS.map((c, i) => (
                <th key={c} className={`px-4 py-4 text-left ${i === 0 ? "bg-ink text-paper" : ""}`}>
                  <span className={`font-display text-[22px] font-medium tracking-tight ${i === 0 ? "" : "text-[#3A3A3A]"}`}>{c}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([label, ...vals], r) => (
              <motion.tr key={label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: r * 0.04, duration: 0.6, ease: EASE }} className="group border-b border-rule transition-colors hover:bg-paper-2" data-testid={`compare-row-${r}`}>
                <td className="py-4 pr-4 text-[15px]"><span className="mr-3 font-mono text-[10.5px] text-[#9A9A90]">{String(r + 1).padStart(2, "0")}</span>{label}</td>
                <td className="bg-ink/[0.03] px-4 py-4"><Mark hero /></td>
                {vals.map((v, i) => <td key={i} className="px-4 py-4"><Mark v={v} /></td>)}
              </motion.tr>
            ))}
            <tr className="border-b-2 border-ink">
              <td className="py-5 pr-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6B63]">Score</td>
              <td className="bg-ink px-4 py-5 font-display text-3xl text-paper" data-testid="compare-score-chople">11 / 11</td>
              {[1, 2, 3].map((c) => (
                <td key={c} className="px-4 py-5 font-display text-3xl text-[#9A9A90]">{ROWS.filter((row) => row[c] === Y).length} / 11</td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="mt-4 font-mono text-[10.5px] text-[#8A8A80]">“Limited” = possible with plug-ins, manual setup or partial coverage. Based on standard, publicly available versions of each product.</p>
      </FadeUp>
    </div>
  </section>
);
