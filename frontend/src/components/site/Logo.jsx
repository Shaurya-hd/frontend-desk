import { useId } from "react";
import { Link } from "react-router-dom";

export const LogoMark = ({ className = "h-8 w-8", dark = false }) => {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden="true">
      <defs>
        <mask id={`cm${id}`}>
          <rect x="-100" y="-100" width="200" height="200" fill="#fff" />
          <polygon points="0,0 100,-66 100,66" fill="#000" />
          <rect x="0" y="-6" width="110" height="12" transform="rotate(-133)" fill="#000" />
          <rect x="0" y="-6" width="110" height="12" transform="rotate(133)" fill="#000" />
        </mask>
      </defs>
      <path
        mask={`url(#cm${id})`}
        fillRule="evenodd"
        fill={dark ? "#FBFBF9" : "#0F0F0F"}
        d="M92 0A92 92 0 1 0-92 0A92 92 0 1 0 92 0ZM38 0A38 38 0 1 1-38 0A38 38 0 1 1 38 0Z"
      />
    </svg>
  );
};

export const Logo = ({ dark = false, testId = "nav-logo-link" }) => (
  <Link to="/" data-testid={testId} className="group flex items-center gap-2.5">
    <LogoMark dark={dark} className="h-8 w-8 transition-transform duration-700 group-hover:rotate-[-24deg]" />
    <span className="leading-none">
      <span className={`block font-display text-[23px] font-semibold tracking-tight ${dark ? "text-paper" : "text-ink"}`}>Chople Desk</span>
      <span className={`block font-mono text-[9px] uppercase tracking-[0.24em] ${dark ? "text-white/55" : "text-[#6B6B63]"}`}>Desk by Chople</span>
    </span>
  </Link>
);
