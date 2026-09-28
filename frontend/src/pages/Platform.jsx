import { motion } from "framer-motion";
import { MousePointerClick } from "lucide-react";
import { Eyebrow, MaskLines, EASE } from "@/components/site/Reveal";
import { AppMock } from "@/components/platform/AppMock";
import { NotesShowcase } from "@/components/platform/NotesShowcase";
import { TrendsShowcase } from "@/components/platform/TrendsShowcase";
import { TimeSaved } from "@/components/home/TimeSaved";
import { CtaSection } from "@/components/home/CtaSection";

export default function Platform() {
  return (
    <div data-testid="platform-page">
      <section className="relative overflow-hidden pt-36 lg:pt-44">
        <div className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[70vh] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-12">
            <h1 className="font-display text-[3.4rem] font-medium leading-[0.9] tracking-[-0.035em] sm:text-[5.5rem] lg:col-span-8 lg:text-[7.6rem]" data-testid="platform-headline">
              <MaskLines delay={0.3} lines={["Tools Inside", <>Chople's <em key="e" className="italic text-signal">Desk.</em></>]} />
            </h1>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease: EASE }} className="flex flex-col justify-end lg:col-span-4 lg:pb-4">
              <p className="max-w-md text-[16px] leading-relaxed text-[#3A3A3A]">This is the workspace journalists use every day. It's interactive — switch modes, change the chart, save findings to Notes and follow a trend.</p>
              <p className="mt-5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-signal"><MousePointerClick className="h-3.5 w-3.5" /> Click around — it's live</p>
            </motion.div>
          </div>
          <Eyebrow className="mt-12">Research Mode</Eyebrow>
          <motion.div initial={{ opacity: 0, y: 70 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1.3, ease: EASE }} className="mt-8 pb-24" id="app-mock-anchor">
            <AppMock />
          </motion.div>
        </div>
      </section>
      <NotesShowcase />
      <TrendsShowcase />
      <TimeSaved />
      <CtaSection id="platform-join" />
    </div>
  );
}
