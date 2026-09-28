import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Search, TrendingUp, NotebookPen, Database } from "lucide-react";
import { Eyebrow, FadeUp, MaskLines } from "@/components/site/Reveal";
import { btnPaper, arrowCls } from "@/components/site/Btn";

export const SHOT_APP = "https://customer-assets-0z36b82j.emergentagent.net/job_c2a08c72-c761-4cab-b1c1-73ef8ad622bd/artifacts/jevb52vr_image.webp";
export const SHOT_CHART = "https://customer-assets-0z36b82j.emergentagent.net/job_c2a08c72-c761-4cab-b1c1-73ef8ad622bd/artifacts/jcbrdzz0_image.webp";

const MODES = [
  [Search, "Research Mode", "Deep-dive analysis across official data"],
  [TrendingUp, "Trends", "Your news feed, connected to past coverage"],
  [NotebookPen, "Notes", "Select, save, cite — without leaving the Desk"],
  [Database, "Live Sources", "503 official sources, always current"],
];

export const PlatformTeaser = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [180, -120]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-coal py-24 text-paper lg:py-32" data-testid="platform-teaser">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(47,92,240,0.22),transparent_62%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow dark>The platform</Eyebrow>
            <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[5rem]">
              <MaskLines inView lines={["Step inside", <em key="e" className="italic text-[#9DB2FF]">the Desk.</em>]} />
            </h2>
          </div>
          <FadeUp delay={0.1} className="flex flex-col items-start justify-end gap-6 lg:col-span-5">
            <p className="max-w-md text-[16px] leading-relaxed text-white/60">A calm, focused workspace — research, trends, notes and live sources in one place. See the real product and try it yourself.</p>
            <Link to="/platform" className={btnPaper} data-testid="platform-teaser-cta">Explore the platform <ArrowUpRight className={arrowCls} /></Link>
          </FadeUp>
        </div>

        <div className="relative mt-16 h-[360px] sm:h-[520px] lg:h-[720px]">
          <motion.div style={{ y: y1 }} className="absolute left-0 top-0 w-[92%] overflow-hidden border border-white/15 bg-white shadow-[0_40px_120px_-20px_rgba(47,92,240,0.35)] [clip-path:inset(0_0_0_0)] lg:w-[78%]">
            <div className="flex h-7 items-center gap-1.5 border-b border-rule bg-paper-2 px-3"><span className="h-2 w-2 bg-rule" /><span className="h-2 w-2 bg-rule" /><span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#8A8A80]">desk.chople.in</span></div>
            <img src={SHOT_APP} alt="Chople's Desk research workspace" className="block w-full" loading="lazy" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 w-[70%] overflow-hidden border border-white/15 bg-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] lg:w-[54%]">
            <img src={SHOT_CHART} alt="Chople's Desk interactive chart with KPI tiles" className="block w-full" loading="lazy" />
          </motion.div>
        </div>

        <div className="relative z-10 mt-16 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map(([I, t, s], i) => (
            <FadeUp key={t} delay={i * 0.06} className="bg-coal p-6">
              <I className="h-5 w-5 text-[#9DB2FF]" />
              <div className="mt-5 font-display text-2xl">{t}</div>
              <div className="mt-1 text-[13.5px] text-white/55">{s}</div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
