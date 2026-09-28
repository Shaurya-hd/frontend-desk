import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { MaskLines, EASE } from "@/components/site/Reveal";
import { useLeads } from "@/components/site/LeadProvider";
import { btnInk, btnLine, arrowCls } from "@/components/site/Btn";
import { HeroDemo } from "./HeroDemo";
import { TrustedBy } from "./TrustedBy";

const STATS = [
  ["2M+", "live official sources"],
  ["100%", "answers with citations"],
  ["10 min", "not 2 hours, per story"],
];

export const Hero = () => {
  const { openWaitlist, openEnterprise } = useLeads();
  const stageRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ["start end", "start 0.2"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const mx = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 70, damping: 18 });

  return (
    <section className="relative overflow-hidden pt-32 lg:pt-36" data-testid="hero-section">
      <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[80vh] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 1, ease: EASE }} className="relative flex justify-end" data-testid="hero-built-for">
          <div className="relative mr-2 lg:mr-24">
            <span className="relative inline-block -rotate-2 font-hand text-[34px] font-bold leading-none text-signal sm:text-[44px]">
              <span className="absolute -inset-x-2 bottom-1 top-1/2 -z-10 -skew-x-6 bg-[#DCE4FF]" />
              Built for journalists &amp; media houses
            </span>
            <svg viewBox="0 0 120 110" className="absolute -bottom-24 right-6 hidden h-24 w-28 text-signal lg:block" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <motion.path d="M100 6 C 118 40, 90 80, 40 96" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.8, duration: 1 }} />
              <motion.path d="M52 84 L 38 97 L 55 104" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.6, duration: 0.4 }} />
            </svg>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-10 lg:mt-4 lg:grid-cols-12 lg:gap-8">
          <h1 className="font-display text-[3.4rem] font-medium leading-[0.9] tracking-[-0.035em] text-ink sm:text-[5.5rem] lg:col-span-8 lg:text-[8.6rem]" data-testid="hero-headline">
            <MaskLines
              delay={0.35}
              lines={[
                "Every dataset",
                <>hides a <em className="font-normal italic text-signal">story.</em></>,
                "Find it first.",
              ]}
            />
          </h1>
          <div className="flex flex-col justify-end lg:col-span-4 lg:pb-4">
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1, ease: EASE }} className="max-w-md text-[16px] leading-[1.65] text-[#3A3A3A] md:text-[17px]">
              Chople's Desk is the research desk for newsrooms. Ask any question — it searches trusted, official sources, verifies every claim, and answers as a chart, table or timeline. Always with the source.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 1, ease: EASE }} className="mt-8 flex flex-wrap gap-3">
              <button onClick={openWaitlist} className={`${btnInk} h-12 px-6`} data-testid="hero-join-waitlist-button">Join the waitlist <ArrowUpRight className={arrowCls} /></button>
              <button onClick={openEnterprise} className={`${btnLine} h-12 px-6`} data-testid="hero-enterprise-button">Contact enterprise sales</button>
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-12 grid grid-cols-3 border-y border-rule">
          {STATS.map(([n, l], i) => (
            <div key={l} className={`py-5 ${i ? "border-l border-rule pl-4 sm:pl-8" : ""}`} data-testid={`hero-stat-${i}`}>
              <div className="font-display text-3xl font-medium tracking-tight sm:text-5xl">{n}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6B6B63] sm:text-[11px]">{l}</div>
            </div>
          ))}
        </motion.div>

        <TrustedBy />

        <div className="mt-8 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#6B6B63]">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" /> Watch it answer — live
        </div>

        <div
          ref={stageRef}
          className="relative mt-6 pb-24 [perspective:1800px]"
          onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); }}
          onMouseLeave={() => mx.set(0)}
        >
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1.4, ease: EASE }}
            style={{ rotateX, rotateY, scale, transformOrigin: "50% 0%" }}
          >
            <HeroDemo />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
