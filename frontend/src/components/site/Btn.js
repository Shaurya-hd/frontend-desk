const base =
  "group inline-flex items-center justify-center gap-2 h-11 px-5 text-[14px] font-medium tracking-[-0.005em] border transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none";

export const btnInk = `${base} bg-ink text-paper border-ink hover:bg-transparent hover:text-ink`;
export const btnLine = `${base} bg-transparent text-ink border-ink hover:bg-ink hover:text-paper`;
export const btnPaper = `${base} bg-paper text-ink border-paper hover:bg-transparent hover:text-paper`;
export const btnLineDark = `${base} bg-transparent text-paper border-white/30 hover:bg-paper hover:text-ink hover:border-paper`;
export const arrowCls = "h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";
