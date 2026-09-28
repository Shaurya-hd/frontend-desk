import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, FadeUp, MaskLines } from "@/components/site/Reveal";
import { SHOT_APP, SHOT_CHART } from "@/components/home/PlatformTeaser";

const CALLOUTS = [
  ["Research Mode", "Ask in plain language. The Desk reads official records and answers with charts, tables and citations."],
  ["Depth control", "Direct for a quick fact, Standard for analysis, Deep for a full investigation."],
  ["Dataset & Canvas", "Pull every figure into a clean dataset, or arrange findings into a story draft."],
  ["Chart controls", "Line, bar or pie. Absolute or change. Zero baseline, copy data, export — all in one bar."],
];

export const PlatformScreens = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const clip = useTransform(scrollYProgress, [0, 0.35], ["inset(12% 8% 12% 8%)", "inset(0% 0% 0% 0%)"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-coal py-24 text-paper lg:py-32" data-testid="platform-screens">
      <div className="pointer-events-none absolute left-1/2 top-40 h-[800px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(47,92,240,0.25),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
        <Eyebrow dark>The real product</Eyebrow>
        <h2 className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[4.8rem]">
          <MaskLines inView lines={["Calm on the surface.", <em key="e" className="italic text-[#9DB2FF]">Every record underneath.</em>]} />
        </h2>
        <motion.div style={{ clipPath: clip }} className="mt-14 overflow-hidden border border-white/15 bg-white">
          <motion.img style={{ y }} src={SHOT_APP} alt="Chople's Desk workspace — Research Mode" className="block w-full scale-[1.08]" loading="lazy" />
        </motion.div>
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <FadeUp className="lg:col-span-7">
            <div className="overflow-hidden border border-white/15 bg-white"><img src={SHOT_CHART} alt="Chople's Desk chart with KPI tiles and controls" className="block w-full" loading="lazy" /></div>
          </FadeUp>
          <div className="grid content-start gap-px bg-white/10 lg:col-span-5">
            {CALLOUTS.map(([t, s], i) => (
              <FadeUp key={t} delay={i * 0.06} className="bg-coal py-5 lg:pl-6">
                <div className="flex items-baseline gap-4"><span className="font-mono text-[10.5px] text-white/35">0{i + 1}</span><span className="font-display text-2xl">{t}</span></div>
                <p className="mt-1.5 pl-9 text-[14px] leading-relaxed text-white/55">{s}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
