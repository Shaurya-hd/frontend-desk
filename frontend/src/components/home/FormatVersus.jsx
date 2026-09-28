import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareText, Sparkles, FileText, ShieldCheck, Clock } from "lucide-react";
import { Eyebrow, FadeUp, MaskLines, EASE } from "@/components/site/Reveal";
import { MiniChart } from "@/components/charts/MiniChart";
import { DATASETS } from "@/data/charts";

const TIMELINE = [
  ["Aug 2023", "40% export duty imposed on onions"],
  ["Oct 2023", "Minimum export price set at US$800/tonne"],
  ["Dec 2023", "Exports prohibited to curb domestic prices"],
  ["Mar 2024", "Ban extended until further orders"],
  ["May 2024", "Ban lifted; MEP of US$550/tonne and 40% duty"],
  ["Sep 2024", "MEP removed; export duty cut to 20%"],
];

const TABLE = {
  head: ["Indicator", "FY22", "FY23", "FY24"],
  rows: [
    ["Real GDP growth", "9.7%", "7.6%", "9.2%"],
    ["CPI inflation", "5.5%", "6.7%", "5.4%"],
    ["Unemployment (PLFS)", "4.1%", "3.2%", "3.2%"],
  ],
};

const QUERIES = [
  {
    id: "trend",
    q: "What is India's GDP growth trend over the last five years?",
    detected: "Trend over time → Interactive line chart",
    essay: "India's GDP growth over the past several years has been shaped by a variety of domestic and global factors. Before the pandemic, growth had been moderating, partly due to weaker consumption and investment. The COVID-19 pandemic then led to a significant contraction as lockdowns disrupted economic activity. This was followed by a strong rebound as the economy reopened, supported by base effects, government capital expenditure and a recovery in services. In subsequent years growth normalised but remained relatively robust compared to other major economies. It is worth noting that figures may vary depending on the source, revisions and methodology used, so you may want to consult official statistics for precise numbers…",
    sources: ["MoSPI · National Accounts Statistics", "MoSPI · Press release, Feb 2025"],
  },
  {
    id: "compare",
    q: "Compare growth, inflation and unemployment for the last three years.",
    detected: "Comparison across metrics → Table",
    essay: "When comparing growth, inflation and unemployment over the last three years, several broad trends emerge. Economic growth has generally remained strong following the post-pandemic recovery, although it has fluctuated from year to year. Inflation rose at one point due to food and fuel price pressures before easing somewhat, while unemployment appears to have declined according to some surveys. However, different surveys use different definitions, and it can be difficult to compare them directly. Overall the macroeconomic picture suggests resilience, but there are important nuances to consider…",
    sources: ["MoSPI · NAS", "MoSPI · CPI releases", "PLFS Annual Reports"],
  },
  {
    id: "timeline",
    q: "How did India's onion export policy unfold in 2023-24?",
    detected: "Sequence of events → Timeline",
    essay: "India's onion export policy saw a number of changes during 2023 and 2024 as the government sought to balance the interests of consumers and farmers. Concerns about rising domestic prices led to restrictions on exports, including duties and at one stage a prohibition. These measures were controversial among farmers in major growing regions such as Maharashtra, who argued that they depressed prices. Later, the restrictions were relaxed in stages. The exact dates and terms of each measure are important, and it would be advisable to verify them against official notifications…",
    sources: ["DGFT notifications", "Dept. of Consumer Affairs · price data"],
  },
];

const useTyped = (text, speed = 7) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const t = setInterval(() => setN((c) => (c >= text.length ? c : c + 3)), speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return text.slice(0, n);
};

const ChopleAnswer = ({ id }) => {
  if (id === "trend") return <MiniChart type="line" data={DATASETS.gdp.data} unit="% growth" anomaly={{ label: "FY21", value: -5.8 }} height={260} />;
  if (id === "compare")
    return (
      <table className="w-full border-collapse text-[13.5px]" data-testid="versus-table">
        <thead><tr>{TABLE.head.map((h) => <th key={h} className="border-b border-ink py-2.5 text-left font-mono text-[10.5px] font-normal uppercase tracking-[0.14em] text-[#6B6B63]">{h}</th>)}</tr></thead>
        <tbody>
          {TABLE.rows.map((r) => (
            <tr key={r[0]} className="transition-colors hover:bg-paper-2">
              {r.map((c, i) => <td key={i} className={`border-b border-rule py-3 ${i ? "font-mono" : "font-medium"}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  return (
    <ol className="relative ml-2 border-l border-ink" data-testid="versus-timeline">
      {TIMELINE.map(([d, t], i) => (
        <motion.li key={d} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative pb-4 pl-6 last:pb-0">
          <span className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 ${i === 2 || i === 4 ? "bg-signal" : "bg-ink"}`} />
          <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#6B6B63]">{d}</div>
          <div className="text-[14px]">{t}</div>
        </motion.li>
      ))}
    </ol>
  );
};

export const FormatVersus = () => {
  const [qi, setQi] = useState(0);
  const cur = QUERIES[qi];
  const essay = useTyped(cur.essay);
  return (
    <section id="compare" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32" data-testid="format-versus">
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow>Answers in the right shape</Eyebrow>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] sm:text-6xl lg:text-[5rem]">
            <MaskLines inView lines={["Chatbots write essays.", <>Chople answers the way <em key="e" className="italic text-signal">journalists read.</em></>]} />
          </h2>
        </div>
        <FadeUp delay={0.1} className="flex items-end lg:col-span-4">
          <p className="max-w-sm text-[15.5px] leading-relaxed text-[#3A3A3A]">General AI tools like ChatGPT and Claude reply in long, subjective prose. Chople detects what kind of question you asked and answers in the format you can use in seconds — with the source attached.</p>
        </FadeUp>
      </div>

      <FadeUp className="mt-12 flex flex-wrap gap-2">
        {QUERIES.map((q, i) => (
          <button key={q.id} onClick={() => setQi(i)} data-testid={`versus-query-${q.id}`} className={`border px-4 py-2.5 text-left text-[13.5px] transition-[background-color,color,border-color] duration-300 ${qi === i ? "border-ink bg-ink text-paper" : "border-rule bg-white text-[#3A3A3A] hover:border-ink"}`}>
            “{q.q}”
          </button>
        ))}
      </FadeUp>

      <div className="mt-6 grid gap-px border border-ink bg-ink lg:grid-cols-2">
        <div className="flex flex-col bg-paper-2 p-6 lg:p-8" data-testid="versus-chatbot-panel">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6B6B63]"><MessageSquareText className="h-3.5 w-3.5" /> General chatbots · ChatGPT, Claude</span>
            <span className="font-mono text-[10px] text-[#8A8A80]">Essay format</span>
          </div>
          <p className="mt-6 min-h-[280px] flex-1 font-display text-[19px] leading-[1.55] text-[#4A4A4A]">{essay}<span className="caret" /></p>
          <div className="mt-6 grid grid-cols-3 gap-px border border-rule bg-rule font-mono text-[10.5px]">
            <div className="bg-paper-2 p-3"><div className="text-[#8A8A80]">FORMAT</div><div className="mt-1 text-ink">Paragraphs</div></div>
            <div className="bg-paper-2 p-3"><div className="text-[#8A8A80]">SOURCES</div><div className="mt-1 text-alert">Not guaranteed</div></div>
            <div className="bg-paper-2 p-3"><div className="text-[#8A8A80]">TIME TO INSIGHT</div><div className="mt-1 text-ink">~2 min reading</div></div>
          </div>
        </div>
        <div className="flex flex-col bg-white p-6 lg:p-8" data-testid="versus-chople-panel">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink"><Sparkles className="h-3.5 w-3.5 text-signal" /> Chople's Desk</span>
            <span className="bg-ink px-2 py-1 font-mono text-[10px] text-paper" data-testid="versus-detected">{cur.detected}</span>
          </div>
          <div className="mt-6 min-h-[280px] flex-1">
            <AnimatePresence mode="wait">
              <motion.div key={cur.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }}>
                <ChopleAnswer id={cur.id} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-rule pt-4">
            <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#10865B]"><ShieldCheck className="h-3.5 w-3.5" /> Cited</span>
            {cur.sources.map((s, i) => <span key={s} className="inline-flex items-center gap-1.5 border border-rule px-2 py-1 text-[11.5px] text-[#4A4A4A]"><FileText className="h-3 w-3" />[{i + 1}] {s}</span>)}
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[10.5px] text-ink"><Clock className="h-3.5 w-3.5" /> ~5 sec to insight</span>
          </div>
        </div>
      </div>
    </section>
  );
};
