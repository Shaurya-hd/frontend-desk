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
  <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] ${dark ? "text-white/55" : "text-[#4A4A4A]"} ${className}`}>
    <span className={`h-px w-8 ${dark ? "bg-white/40" : "bg-ink"}`} />
    {children}
  </div>
);
