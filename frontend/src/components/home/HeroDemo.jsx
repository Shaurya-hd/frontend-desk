import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles, FileText, TrendingUp, NotebookPen, Database, LineChart as LineIcon, BarChart3, PieChart as PieIcon, ShieldCheck } from "lucide-react";
import { MiniChart } from "@/components/charts/MiniChart";
import { DATASETS, RUPEE_GOES_TO, PALETTE } from "@/data/charts";
import { EASE } from "@/components/site/Reveal";

const QUERIES = [
  {
    q: "How has the MSME Ministry's budget changed since 2018-19?",
    intent: "Trend over time",
    format: "Line chart",
    Icon: LineIcon,
    type: "line",
    unit: "₹ cr",
    data: DATASETS.msme.data,
    anomaly: { label: "2021-22", value: 15699.65 },
    note: "Anomaly: +107% jump in 2021-22",
    sources: ["Union Budget · Expenditure Profile", "Ministry of MSME · Annual Report"],
  },
  {
    q: "Compare the top ministries by allocation in Budget 2024-25",
    intent: "Comparison across categories",
    format: "Ranked bar chart",
    Icon: BarChart3,
    type: "bar",
    unit: "₹ lakh cr",
    data: DATASETS.ministries.data,
    note: "Defence receives 2.3× the next ministry",
    sources: ["Union Budget 2024-25 · Expenditure Budget", "Budget at a Glance"],
  },
  {
    q: "Where does each rupee of the Union Budget 2024-25 go?",
    intent: "Composition of a whole",
    format: "Share breakdown",
    Icon: PieIcon,
    type: "pie",
    unit: "paise",
    data: RUPEE_GOES_TO,
    note: "States' share + interest = 40 paise of every rupee",
    sources: ["Budget at a Glance 2024-25 · Rupee Goes To"],
  },
];

const SIDEBAR = [
  { Icon: Search, t: "Research Mode", s: "Deep-dive analysis", active: true },
  { Icon: TrendingUp, t: "Trends", s: "Pattern analysis" },
  { Icon: NotebookPen, t: "Notes", s: "Saved notes & quotes" },
];

export const HeroDemo = () => {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState(0);
  const [phase, setPhase] = useState("typing");
  const cur = QUERIES[qi];

  useEffect(() => {
    let t;
    if (phase === "typing") {
      t = typed < cur.q.length ? setTimeout(() => setTyped((n) => n + 1), 26) : setTimeout(() => setPhase("thinking"), 350);
    } else if (phase === "thinking") {
      t = setTimeout(() => setPhase("answer"), 1100);
    } else {
      t = setTimeout(() => { setQi((i) => (i + 1) % QUERIES.length); setTyped(0); setPhase("typing"); }, 5200);
    }
    return () => clearTimeout(t);
  }, [phase, typed, cur.q.length]);

  return (
    <div className="overflow-hidden border border-ink bg-paper shadow-[10px_10px_0_#0F0F0F]" data-testid="hero-demo">
      <div className="flex h-10 items-center justify-between border-b border-rule bg-paper-2 px-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#6B6B63]">
        <span>Desk / Research mode / New research chat</span>
        <span className="hidden items-center gap-4 sm:flex"><span>Dataset</span><span>Canvas</span></span>
      </div>
      <div className="grid md:grid-cols-[210px_1fr]">
        <aside className="hidden border-r border-rule bg-white/60 p-3 md:block">
          {SIDEBAR.map(({ Icon, t, s, active }) => (
            <div key={t} className={`mb-1.5 flex items-start gap-2.5 px-2.5 py-2 ${active ? "border border-[#C7D2FE] bg-[#EEF2FF]" : ""}`}>
              <Icon className={`mt-0.5 h-3.5 w-3.5 ${active ? "text-[#4F46E5]" : "text-[#6B6B63]"}`} />
              <div><div className={`text-[12.5px] ${active ? "text-[#4F46E5]" : "text-ink"}`}>{t}</div><div className="text-[10.5px] text-[#8A8A80]">{s}</div></div>
            </div>
          ))}
          <div className="mt-3 flex items-center gap-2 px-2.5 text-[12px] text-ink"><Database className="h-3.5 w-3.5" /> Live Sources <span className="font-mono text-[10px] text-[#8A8A80]">503</span></div>
          <div className="mt-6 px-2.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#8A8A80]">Research chats</div>
          {["MSME Budget Allocation", "Crops Under PSS Scheme", "Onion export policy"].map((c, i) => (
            <div key={c} className={`mt-1.5 truncate px-2.5 py-1.5 text-[12px] ${i === 0 ? "bg-paper-2" : "text-[#4A4A4A]"}`}>{c}</div>
          ))}
        </aside>
        <div className="flex min-h-[430px] flex-col p-4 sm:p-6">
          <div className="flex items-center gap-3 border border-rule bg-white px-4 py-3">
            <Search className="h-4 w-4 shrink-0 text-[#8A8A80]" />
            <span className={`text-[14px] text-ink ${phase === "typing" ? "caret" : ""}`} data-testid="hero-demo-query">{cur.q.slice(0, typed)}</span>
          </div>
          <div className="mt-4 flex-1">
            <AnimatePresence mode="wait">
              {phase === "thinking" && (
                <motion.div key="think" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2 pt-2 font-mono text-[11.5px] text-[#6B6B63]">
                  <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse bg-signal" /> Reading 503 approved sources…</p>
                  <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse bg-signal [animation-delay:200ms]" /> Detecting the best format for this question…</p>
                </motion.div>
              )}
              {phase === "answer" && (
                <motion.div key={`a${qi}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.6, ease: EASE }}>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-ink px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-paper" data-testid="hero-demo-format">
                      <Sparkles className="h-3 w-3 text-[#9DB2FF]" /> {cur.intent} → {cur.format}
                    </span>
                    <span className="border border-alert/40 bg-alert/[0.06] px-2.5 py-1 font-mono text-[10.5px] text-alert">{cur.note}</span>
                  </div>
                  <div className={`mt-4 ${cur.type === "pie" ? "grid items-center gap-4 sm:grid-cols-[1fr_1fr]" : ""}`}>
                    <MiniChart type={cur.type} data={cur.data} unit={cur.unit} anomaly={cur.anomaly} height={cur.type === "pie" ? 220 : 250} />
                    {cur.type === "pie" && (
                      <ul className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
                        {cur.data.slice(0, 6).map((d, i) => (
                          <li key={d.label} className="flex items-center justify-between gap-3 border-b border-rule/70 pb-1">
                            <span className="flex items-center gap-2"><span className="h-2 w-2" style={{ background: PALETTE[i] }} />{d.label}</span>
                            <span>{d.value}p</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-rule pt-3">
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#10865B]"><ShieldCheck className="h-3.5 w-3.5" /> Cited</span>
                    {cur.sources.map((s, i) => (
                      <span key={s} className="inline-flex items-center gap-1.5 border border-rule bg-white px-2 py-1 text-[11px] text-[#4A4A4A]"><FileText className="h-3 w-3" /> [{i + 1}] {s}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
