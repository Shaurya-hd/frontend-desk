import { Link } from "react-router-dom";
import { ArrowUpRight, Linkedin } from "lucide-react";
import { LogoMark } from "./Logo";
import { useLeads } from "./LeadProvider";

const XIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

export const SOCIALS = [
  { href: "https://x.com/Chople_it", label: "X / Twitter", handle: "@Chople_it", Icon: XIcon, id: "x" },
  { href: "https://www.linkedin.com/company/chople/", label: "LinkedIn", handle: "company/chople", Icon: Linkedin, id: "linkedin" },
];

export const Footer = () => {
  const { openWaitlist, openEnterprise } = useLeads();
  const col = "font-mono text-[10px] uppercase tracking-[0.22em] text-white/40";
  const item = "group flex items-center gap-2 text-[14px] text-white/75 transition-colors hover:text-paper";
  return (
    <footer className="relative overflow-hidden bg-coal text-paper" data-testid="site-footer">
      <div className="dot-grid-dark absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1440px] px-5 pt-24 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <LogoMark dark className="h-10 w-10" />
            <p className="mt-6 max-w-sm font-display text-3xl leading-[1.1] text-paper/90">Research and data intelligence for the modern newsroom.</p>
          </div>
          <div className="md:col-span-2">
            <p className={col}>Product</p>
            <div className="mt-5 space-y-3">
              <Link to="/platform" className={item} data-testid="footer-platform-link">Platform</Link>
              <Link to="/#features" className={item} data-testid="footer-features-link">Features</Link>
              <Link to="/#compare" className={item} data-testid="footer-compare-link">Compare</Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className={col}>Follow</p>
            <div className="mt-5 space-y-3">
              {SOCIALS.map(({ href, label, Icon, id }) => (
                <a key={id} href={href} target="_blank" rel="noreferrer" className={item} data-testid={`footer-${id}-link`}>
                  <Icon className="h-3.5 w-3.5" /> {label}
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-3">
            <p className={col}>Get started</p>
            <div className="mt-5 space-y-3">
              <button onClick={openWaitlist} className={item} data-testid="footer-waitlist-button">Join the waitlist <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
              <button onClick={openEnterprise} className={item} data-testid="footer-enterprise-button">Contact enterprise sales <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
            </div>
          </div>
        </div>
        <div className="select-none pt-6 font-display text-[23vw] font-semibold leading-[0.78] tracking-[-0.04em] text-paper/[0.07] lg:text-[21vw]" aria-hidden="true">Chople</div>
        <div className="flex flex-col justify-between gap-2 border-t border-white/10 py-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Chople. All rights reserved.</span>
          <span>Every answer, cited.</span>
        </div>
      </div>
    </footer>
  );
};
