import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useLeads } from "./LeadProvider";
import { btnInk, btnLine, arrowCls } from "./Btn";
import { EASE } from "./Reveal";

const LINKS = [
  ["problem", "The problem"],
  ["features", "Product"],
  ["compare", "Why Chople"],
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 30));
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openWaitlist, openEnterprise } = useLeads();

  const go = (id) => {
    setOpen(false);
    if (pathname === "/") lenis?.scrollTo(`#${id}`, { offset: -80 });
    else navigate(`/#${id}`);
  };

  const linkCls = "relative text-[13.5px] text-[#2A2A2A] hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100";

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-40"
      data-testid="site-nav"
    >
      <button onClick={openWaitlist} data-testid="announcement-bar" className="flex h-8 w-full items-center justify-center gap-3 bg-ink font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper/80 transition-colors hover:text-paper">
        <span className="relative flex h-1.5 w-1.5"><span className="pulse-ring absolute inset-0 rounded-full bg-signal" /><span className="relative h-1.5 w-1.5 rounded-full bg-signal" /></span>
        Private beta — now onboarding newsrooms
        <ArrowUpRight className="h-3 w-3" />
      </button>
      <div className={`transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${scrolled || open ? "border-rule bg-paper/80 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className={linkCls} data-testid={`nav-link-${id}`}>{label}</button>
            ))}
            <Link to="/platform" className={`${linkCls} ${pathname === "/platform" ? "after:scale-x-100 text-ink" : ""}`} data-testid="nav-link-platform">Platform</Link>
          </nav>
          <div className="flex items-center gap-2.5">
            <button onClick={openEnterprise} className={`${btnLine} hidden h-10 px-4 text-[13px] sm:inline-flex`} data-testid="nav-enterprise-sales-button">Contact enterprise sales</button>
            <button onClick={openWaitlist} className={`${btnInk} h-10 px-4 text-[13px]`} data-testid="nav-join-waitlist-button">Join waitlist <ArrowUpRight className={arrowCls} /></button>
            <button onClick={() => setOpen((o) => !o)} className="flex h-10 w-10 items-center justify-center border border-rule lg:hidden" data-testid="nav-mobile-menu-button" aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-rule px-5 py-5 lg:hidden" data-testid="nav-mobile-menu">
            <div className="flex flex-col gap-4">
              {LINKS.map(([id, label]) => (
                <button key={id} onClick={() => go(id)} className="text-left font-display text-3xl" data-testid={`mobile-nav-link-${id}`}>{label}</button>
              ))}
              <Link to="/platform" onClick={() => setOpen(false)} className="font-display text-3xl" data-testid="mobile-nav-link-platform">Platform</Link>
              <button onClick={() => { setOpen(false); openEnterprise(); }} className={`${btnLine} mt-2`} data-testid="mobile-enterprise-sales-button">Contact enterprise sales</button>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
};
