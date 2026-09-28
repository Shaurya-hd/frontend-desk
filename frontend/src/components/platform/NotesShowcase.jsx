import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { MousePointerClick, NotebookPen, Quote, Copy, FileText, Check } from "lucide-react";
import { Eyebrow, FadeUp, MaskLines, EASE } from "@/components/site/Reveal";

const SENTENCES = [
  { id: "s1", t: "India's real GDP grew 9.2% in 2023-24, revised up from the provisional estimate of 8.2%.", c: "MoSPI · Revised Estimates, Feb 2025" },
  { id: "s2", t: "Growth moderated to 6.5% in 2024-25, the slowest in four years.", c: "MoSPI · Provisional Estimates, May 2025" },
  { id: "s3", t: "The economy contracted 5.8% in 2020-21 — the only negative year in the series.", c: "MoSPI · National Accounts Statistics 2023" },
  { id: "s4", t: "Government capital expenditure was budgeted at ₹11.11 lakh crore for 2024-25.", c: "Union Budget 2024-25 · Budget at a Glance" },
];

const STEPS = [
  [MousePointerClick, "Select", "Click any line, figure or chart in an answer."],
  [NotebookPen, "One click", "It lands in Notes instantly — no other app."],
  [Quote, "Always cited", "Every note carries its source. Copy it straight into your draft."],
];

export const NotesShowcase = () => {
  const [notes, setNotes] = useState([SENTENCES[0]]);
  const toggle = (s) => setNotes((xs) => (xs.some((x) => x.id === s.id) ? xs.filter((x) => x.id !== s.id) : [...xs, s]));
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(notes.map((n) => `${n.t}\nSource: ${n.c}`).join("\n\n"));
      toast.success(`${notes.length} note${notes.length > 1 ? "s" : ""} copied with citations.`);
    } catch { toast.error("Clipboard unavailable in this browser."); }
  };

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32" data-testid="notes-showcase">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>Notes</Eyebrow>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[4.8rem]">
            <MaskLines inView lines={["Stop copy-pasting.", <em key="e" className="italic text-signal">Select. Click. Cited.</em>]} />
          </h2>
        </div>
        <FadeUp delay={0.1} className="flex items-end lg:col-span-5">
          <p className="max-w-md text-[16px] leading-relaxed text-[#3A3A3A]">No more shuttling quotes and figures between tabs, docs and chat apps. Notes live inside the Desk, and every one keeps its citation — so fact-checking your draft takes seconds.</p>
        </FadeUp>
      </div>

      <div className="mt-14 grid gap-px border border-ink bg-ink md:grid-cols-3">
        {STEPS.map(([I, t, s], i) => (
          <FadeUp key={t} delay={i * 0.08} className="bg-paper p-6">
            <div className="flex items-center justify-between"><I className="h-5 w-5" /><span className="font-mono text-[10.5px] text-[#8A8A80]">0{i + 1}</span></div>
            <div className="mt-6 font-display text-3xl">{t}</div>
            <div className="mt-1 text-[14px] text-[#4A4A4A]">{s}</div>
          </FadeUp>
        ))}
      </div>

      <FadeUp className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="border border-rule bg-white p-6 lg:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">Research answer · click any sentence</div>
          <div className="mt-4 space-y-1">
            {SENTENCES.map((s, i) => {
              const on = notes.some((n) => n.id === s.id);
              return (
                <button key={s.id} onClick={() => toggle(s)} data-testid={`notes-sentence-${i}`} className={`group flex w-full items-start gap-3 border-l-2 px-4 py-3 text-left font-display text-[21px] leading-snug transition-[background-color,border-color] duration-300 ${on ? "border-signal bg-[#EEF2FF]" : "border-transparent hover:border-rule hover:bg-paper-2"}`}>
                  <span className="flex-1">{s.t}<sup className="ml-1 font-mono text-[10px] text-signal">[{i + 1}]</sup></span>
                  <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center border transition-colors ${on ? "border-signal bg-signal text-white" : "border-rule text-[#9A9A90] group-hover:border-ink group-hover:text-ink"}`}>{on ? <Check className="h-3.5 w-3.5" /> : <NotebookPen className="h-3 w-3" />}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col border border-ink bg-paper-2 p-6 lg:p-8" data-testid="notes-panel">
          <div className="flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">Notes · <span data-testid="notes-panel-count">{notes.length}</span> saved</div>
            <button onClick={copy} disabled={!notes.length} className="flex items-center gap-1.5 border border-ink bg-ink px-3 py-1.5 text-[12px] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-40" data-testid="notes-copy-button"><Copy className="h-3.5 w-3.5" /> Copy with citations</button>
          </div>
          <div className="mt-5 flex-1 space-y-3">
            <AnimatePresence initial={false}>
              {notes.map((n) => (
                <motion.div key={n.id} layout initial={{ opacity: 0, x: -30, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.45, ease: EASE }} className="border border-rule bg-white p-4">
                  <p className="text-[13.5px] leading-relaxed">{n.t}</p>
                  <p className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] text-signal"><FileText className="h-3 w-3" /> {n.c}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            {!notes.length && <p className="text-[13.5px] text-[#6B6B63]">Click a sentence on the left to save it here.</p>}
          </div>
        </div>
      </FadeUp>
    </section>
  );
};
