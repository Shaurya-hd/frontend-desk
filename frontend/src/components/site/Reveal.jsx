import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

const lineVariants = {
  hidden: { y: "118%" },
  show: (i) => ({ y: 0, transition: { duration: 1.15, ease: EASE, delay: i } }),
};

export const MaskLines = ({ lines, delay = 0, inView = false, className = "", lineClassName = "" }) => (
  <motion.span
    className={`block ${className}`}
    initial="hidden"
    {...(inView ? { whileInView: "show", viewport: { once: true, margin: "-40px" } } : { animate: "show" })}
  >
    {lines.map((line, i) => (
      <span key={i} className={`block overflow-hidden pb-[0.14em] -mb-[0.14em] ${lineClassName}`}>
        <motion.span className="block" variants={lineVariants} custom={delay + i * 0.11}>
          {line}
        </motion.span>
      </span>
    ))}
  </motion.span>
);

export const FadeUp = ({ children, delay = 0, className = "", y = 28, ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, dark = false, className = "" }) => (
  <div className={`flex items-center gap-3.5 text-[22px] font-semibold tracking-[-0.02em] lg:text-[28px] ${dark ? "text-paper/85" : "text-ink"} ${className}`}>
    <span className="h-3.5 w-3.5 shrink-0 bg-signal" />
    {children}
  </div>
);

export const FeatureTitle = ({ n, title, dark = false }) => (
  <div className={`flex items-center gap-5 border-b pb-5 ${dark ? "border-white/20" : "border-ink"}`} data-testid={`feature-title-${n}`}>
    <span className={`flex h-14 w-14 shrink-0 items-center justify-center font-display text-[28px] font-medium ${dark ? "bg-paper text-ink" : "bg-ink text-paper"}`}>{n}</span>
    <span className={`text-[24px] font-semibold leading-tight tracking-[-0.02em] lg:text-[30px] ${dark ? "text-paper" : "text-ink"}`}>{title}</span>
  </div>
);
