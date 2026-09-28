import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Eyebrow, FadeUp, MaskLines, EASE } from "@/components/site/Reveal";

const BEFORE = [
  ["Searching portals & PDFs", 45],
  ["Verifying facts manually", 30],
  ["Building charts in spreadsheets", 20],
  ["Digging through the archive", 15],
  ["Copy-pasting notes & links", 10],
];
const AFTER = [
  ["Ask the question", 1],
  ["Review the sourced answer", 5],
  ["Check citations in one click", 3],
  ["Save notes with citations", 1],
];

const Counter = ({ from, to, className, testId }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!inView) return;
    const c = animate(from, to, { duration: 2.2, ease: EASE, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, from, to]);
  return <span ref={ref} className={className} data-testid={testId}>{v}</span>;
};

const Lane = ({ title, total, steps, dark, delay }) => (
  <div>
    <div className="mb-3 flex items-baseline justify-between">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6B63]">{title}</span>
      <span className="font-mono text-[12px]">{total} min</span>
    </div>
    <div className="flex h-16 w-full border border-ink bg-white">
      {steps.map(([l, m], i) => (
        <motion.div key={l} initial={{ width: 0 }} whileInView={{ width: `${(m / 120) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE, delay: delay + i * 0.12 }}
          className={`group relative h-full overflow-hidden border-r border-white/60 ${dark ? (i % 2 ? "bg-[#1C2F7A]" : "bg-signal") : i % 2 ? "bg-[#C9C3B3]" : "hatch bg-paper-2 text-[#8A8A80]"}`}>
          <span className={`absolute bottom-1.5 left-2 hidden whitespace-nowrap font-mono text-[10px] lg:block ${dark ? "text-white" : "text-ink"}`}>{m}m</span>
        </motion.div>
      ))}
    </div>
    <div className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
      {steps.map(([l, m]) => <div key={l} className="flex justify-between border-b border-rule/70 py-1 text-[13px] text-[#3A3A3A]"><span>{l}</span><span className="font-mono text-[12px] text-[#6B6B63]">{m}m</span></div>)}
    </div>
  </div>
);

export const TimeSaved = () => (
  <section className="border-t border-rule bg-paper-2 py-24 lg:py-32" data-testid="time-saved-section">
    <div className="mx-auto max-w-[1440px] px-5 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>Deadline maths</Eyebrow>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[4.6rem]">
            <MaskLines inView lines={["A story's research,", <em key="e" className="italic text-signal">in ten minutes.</em>]} />
          </h2>
          <FadeUp delay={0.1}>
            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-[#3A3A3A]">The same story research that takes a reporter two hours — searching, checking, charting, noting — is done on the Desk before the editorial meeting ends.</p>
            <div className="mt-10 flex items-end gap-6">
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6B63]">Minutes per story</div>
                <div className="font-display text-[8rem] font-medium leading-[0.85] tracking-[-0.05em] lg:text-[10rem]"><Counter from={120} to={10} testId="time-counter" /></div>
              </div>
              <div className="pb-4 font-mono text-[12px] leading-relaxed text-[#6B6B63]">from 120<br /><span className="text-signal">12× faster</span></div>
            </div>
          </FadeUp>
        </div>
        <FadeUp delay={0.15} className="flex flex-col justify-center gap-12 lg:col-span-7">
          <Lane title="The usual way" total={120} steps={BEFORE} delay={0.1} />
          <Lane title="With Chople's Desk" total={10} steps={AFTER} dark delay={0.5} />
        </FadeUp>
      </div>
    </div>
  </section>
);
