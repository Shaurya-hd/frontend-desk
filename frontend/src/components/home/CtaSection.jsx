import { ArrowUpRight, Building2, Check } from "lucide-react";
import { Eyebrow, FadeUp, MaskLines } from "@/components/site/Reveal";
import { WaitlistForm } from "@/components/site/LeadForms";
import { useLeads } from "@/components/site/LeadProvider";
import { SOCIALS } from "@/components/site/Footer";
import { btnPaper, arrowCls } from "@/components/site/Btn";

const PHOTO = "https://images.unsplash.com/photo-1613743575064-a645fae50d2e?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";
const PERKS = ["Custom source libraries for your beats", "Search across your internal archive", "Team workspaces, shared notes & SSO", "Dedicated onboarding for your newsroom"];

export const CtaSection = ({ id = "join" }) => {
  const { openEnterprise } = useLeads();
  return (
    <section id={id} className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32" data-testid="cta-section">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>Early access</Eyebrow>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[5rem]">
            <MaskLines inView lines={["Your next story is", <em key="e" className="italic text-signal">already in the data.</em>]} />
          </h2>
          <FadeUp delay={0.1}>
            <p className="mt-8 max-w-md text-[16px] leading-relaxed text-[#3A3A3A]">Join the waitlist for Chople's Desk. We're onboarding journalists and newsrooms in small batches through 2026.</p>
            <div className="mt-10"><WaitlistForm prefix="cta-waitlist" /></div>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6B63]">Follow the build</span>
              {SOCIALS.map(({ href, handle, Icon, id: sid }) => (
                <a key={sid} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-2 text-[14px] underline-offset-4 hover:underline" data-testid={`cta-${sid}-link`}>
                  <Icon className="h-4 w-4" /> {handle}
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
        <FadeUp delay={0.15} className="lg:col-span-6">
          <div className="relative h-full min-h-[560px] overflow-hidden border border-ink">
            <img src={PHOTO} alt="Reading the morning paper" className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05] transition-transform duration-[2s] hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
              <div className="border border-white/15 bg-coal/70 p-6 text-paper backdrop-blur-xl lg:p-8" data-testid="enterprise-card">
                <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#9DB2FF]"><Building2 className="h-3.5 w-3.5" /> For media houses</div>
                <p className="mt-3 font-display text-3xl leading-tight lg:text-4xl">Bring Chople's Desk to your whole newsroom.</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {PERKS.map((p) => <li key={p} className="flex items-start gap-2 text-[13.5px] text-white/75"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9DB2FF]" />{p}</li>)}
                </ul>
                <button onClick={openEnterprise} className={`${btnPaper} mt-6`} data-testid="cta-enterprise-button">Contact enterprise sales <ArrowUpRight className={arrowCls} /></button>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
