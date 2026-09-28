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
  ["home", "Home"],
  ["problem", "Problem"],
  ["features", "Features"],
];
const COMPARE = ["compare", "How Desk is different from other tools"];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis(({ scroll }) => setScrolled(scroll > 30));
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openWaitlist, openEnterprise } = useLeads();

  const go = (id) => {
    setOpen(false);
    if (id === "home") {
      if (pathname === "/") lenis?.scrollTo(0);
      else navigate("/");
    } else if (pathname === "/") lenis?.scrollTo(`#${id}`, { offset: -80 });
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
      <div className={`transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${scrolled || open ? "border-rule bg-paper/80 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Logo />
          <nav className="hidden items-center gap-8 xl:flex">
            {LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)} className={linkCls} data-testid={`nav-link-${id}`}>{label}</button>
            ))}
            <Link to="/platform" className={`${linkCls} ${pathname === "/platform" ? "after:scale-x-100 text-ink" : ""}`} data-testid="nav-link-platform">Tools</Link>
            <button onClick={() => go(COMPARE[0])} className={linkCls} data-testid="nav-link-compare">{COMPARE[1]}</button>
          </nav>
          <div className="flex items-center gap-2.5">
            <button onClick={openEnterprise} className={`${btnLine} hidden h-10 px-4 text-[13px] sm:inline-flex`} data-testid="nav-enterprise-sales-button">Contact enterprise sales</button>
            <div className="relative">
              <button onClick={openWaitlist} className={`${btnInk} h-10 px-4 text-[13px]`} data-testid="nav-join-waitlist-button">Join waitlist <ArrowUpRight className={arrowCls} /></button>
              <motion.div
                animate={{ opacity: scrolled ? 0 : 1, y: [0, -5, 0] }}
                transition={{ opacity: { duration: 0.3 }, y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
                className="pointer-events-none absolute right-2 top-full hidden items-start gap-1 pt-1 sm:flex"
                data-testid="nav-individual-hint"
              >
                <span className="mt-5 whitespace-nowrap font-hand text-[22px] font-semibold leading-none text-signal">An individual</span>
                <svg viewBox="0 0 40 40" className="h-9 w-9 text-signal" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 34 C 10 18, 20 10, 30 6" /><path d="M22 4 L 31 5.5 L 28 14" /></svg>
              </motion.div>
            </div>
            <button onClick={() => setOpen((o) => !o)} className="flex h-10 w-10 items-center justify-center border border-rule xl:hidden" data-testid="nav-mobile-menu-button" aria-label="Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-rule px-5 py-5 xl:hidden" data-testid="nav-mobile-menu">
            <div className="flex flex-col gap-4">
              {LINKS.map(([id, label]) => (
                <button key={id} onClick={() => go(id)} className="text-left font-display text-3xl" data-testid={`mobile-nav-link-${id}`}>{label}</button>
              ))}
              <Link to="/platform" onClick={() => setOpen(false)} className="font-display text-3xl" data-testid="mobile-nav-link-platform">Tools</Link>
              <button onClick={() => go(COMPARE[0])} className="text-left font-display text-3xl" data-testid="mobile-nav-link-compare">{COMPARE[1]}</button>
              <button onClick={() => { setOpen(false); openEnterprise(); }} className={`${btnLine} mt-2`} data-testid="mobile-enterprise-sales-button">Contact enterprise sales</button>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
};
