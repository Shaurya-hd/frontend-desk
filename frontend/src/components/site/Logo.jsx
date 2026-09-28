import { Link } from "react-router-dom";

export const LogoMark = ({ className = "h-8 w-8", dark = false }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <rect width="32" height="32" rx="7" fill={dark ? "#FBFBF9" : "#0F0F0F"} />
    <path d="M23.6 10.2A9.2 9.2 0 1 0 23.6 21.8" fill="none" stroke={dark ? "#0F0F0F" : "#FBFBF9"} strokeWidth="5.2" />
    <rect x="21.2" y="14.2" width="3.6" height="3.6" fill="#2F5CF0" />
  </svg>
);

export const Logo = ({ dark = false, testId = "nav-logo-link" }) => (
  <Link to="/" data-testid={testId} className="group flex items-center gap-2.5">
    <LogoMark dark={dark} className="h-8 w-8 transition-transform duration-500 group-hover:rotate-[-8deg]" />
    <span className="leading-none">
      <span className={`block font-display text-[23px] font-semibold tracking-tight ${dark ? "text-paper" : "text-ink"}`}>Desk</span>
      <span className={`block font-mono text-[9px] uppercase tracking-[0.24em] ${dark ? "text-white/55" : "text-[#6B6B63]"}`}>by Chople</span>
    </span>
  </Link>
);
