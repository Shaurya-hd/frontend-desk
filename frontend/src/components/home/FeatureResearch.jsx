import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertTriangle, X, FileText, ShieldCheck, Search, Loader2 } from "lucide-react";
import { FeatureTitle, FadeUp, MaskLines, EASE } from "@/components/site/Reveal";

const CLAIMS = [
  {
    id: "c1",
    claim: "“The MSME Ministry's budget more than tripled between 2018-19 and 2023-24.”",
    verdict: "Supported",
    tone: "ok",
    summary: "₹6,552.61 cr (2018-19) → ₹22,137.95 cr (2023-24) — a 3.4× increase.",
    sources: [
      { title: "Union Budget — Expenditure Profile", org: "Ministry of Finance", meta: "PDF · Demand for Grants", quote: "Ministry of Micro, Small and Medium Enterprises — Actuals 2018-19: 6,552.61", status: "match" },
      { title: "Union Budget 2024-25 — Expenditure Budget", org: "Ministry of Finance", meta: "PDF · Revised Estimates", quote: "Revised Estimates 2023-24: 22,137.95", status: "match" },
      { title: "Annual Report 2023-24", org: "Ministry of MSME", meta: "PDF · Chapter 2", quote: "…budgetary allocation for the Ministry has increased consistently…", status: "context" },
    ],
  },
  {
    id: "c2",
    claim: "“India's economy grew 8.2% in 2023-24.”",
    verdict: "Conflicting values",
    tone: "warn",
    summary: "Provisional estimate said 8.2% (May 2024). The revised estimate (Feb 2025) says 9.2%. Cite the latest revision.",
    sources: [
      { title: "Provisional Estimates of Annual GDP 2023-24", org: "MoSPI", meta: "Press release · May 2024", quote: "Real GDP… estimated to grow by 8.2 per cent in 2023-24", status: "match" },
      { title: "Revised Estimates of National Income", org: "MoSPI", meta: "Press release · Feb 2025", quote: "…growth rate of Real GDP for 2023-24 revised to 9.2 per cent", status: "conflict" },
    ],
  },
  {
    id: "c3",
    claim: "“Onion exports stayed banned through all of 2024.”",
    verdict: "Not supported",
    tone: "bad",
    summary: "The export ban announced in Dec 2023 was lifted on 4 May 2024, subject to a minimum export price.",
    sources: [
      { title: "DGFT Notification", org: "Directorate General of Foreign Trade", meta: "Gazette · Dec 2023", quote: "Export policy of onions amended from ‘Free’ to ‘Prohibited’…", status: "context" },
      { title: "DGFT Notification", org: "Directorate General of Foreign Trade", meta: "Gazette · May 2024", quote: "…export policy of onion amended from ‘Prohibited’ to ‘Free’ with immediate effect", status: "conflict" },
    ],
  },
];

const TONE = {
  ok: { cls: "bg-emerald-600 text-white", Icon: Check },
  warn: { cls: "bg-amber-500 text-ink", Icon: AlertTriangle },
  bad: { cls: "bg-alert text-white", Icon: X },
};
const STATUS = { match: ["Matches claim", "text-emerald-700 border-emerald-600/30 bg-emerald-50"], context: ["Supporting context", "text-[#4A4A4A] border-rule bg-paper-2"], conflict: ["Contradicts claim", "text-alert border-alert/30 bg-alert/[0.06]"] };
const STEPS = ["Searching 503 approved sources", "Matching documents & passages", "Cross-checking values"];

const Tracer = () => {
  const [active, setActive] = useState(CLAIMS[0]);
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    const ts = [1, 2, 3].map((s) => setTimeout(() => setStep(s), s * 650));
    return () => ts.forEach(clearTimeout);
  }, [active]);
  const T = TONE[active.tone];
  return (
    <div className="border border-ink bg-white" data-testid="claim-tracer">
      <div className="flex flex-wrap gap-px border-b border-ink bg-ink">
        {CLAIMS.map((c, i) => (
          <button key={c.id} onClick={() => setActive(c)} data-testid={`claim-tab-${i}`} className={`flex-1 px-4 py-3 text-left font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors ${active.id === c.id ? "bg-white text-ink" : "bg-paper-2 text-[#6B6B63] hover:bg-white"}`}>
            Claim {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B63]"><Search className="h-3 w-3" /> Verify claim</div>
        <p className="mt-3 font-display text-[26px] leading-[1.15] tracking-tight lg:text-[30px]" data-testid="claim-text">{active.claim}</p>
        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s} className={`flex items-center gap-2 border px-3 py-2 font-mono text-[10.5px] transition-colors duration-300 ${step > i ? "border-ink text-ink" : "border-rule text-[#9A9A90]"}`}>
              {step > i ? <Check className="h-3 w-3" /> : <Loader2 className="h-3 w-3 animate-spin" />} {s}
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {step >= 3 && (
            <motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
              <div className="mt-6 flex items-start gap-4 border-l-2 border-ink bg-paper-2 p-4">
                <span className={`inline-flex shrink-0 items-center gap-1.5 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] ${T.cls}`} data-testid="claim-verdict"><T.Icon className="h-3 w-3" /> {active.verdict}</span>
                <p className="text-[14px] leading-relaxed text-[#2A2A2A]">{active.summary}</p>
              </div>
              <div className="mt-5 space-y-3">
                {active.sources.map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 * i, duration: 0.5, ease: EASE }} className="grid gap-3 border border-rule p-4 sm:grid-cols-[auto_1fr_auto]">
                    <span className="flex h-8 w-8 items-center justify-center bg-ink font-mono text-[11px] text-paper">[{i + 1}]</span>
                    <div>
                      <div className="flex items-center gap-2 text-[13.5px] font-medium"><FileText className="h-3.5 w-3.5 text-[#6B6B63]" />{s.title}</div>
                      <div className="mt-0.5 font-mono text-[10.5px] text-[#6B6B63]">{s.org} · {s.meta}</div>
                      <p className="mt-2 border-l border-signal pl-3 text-[13px] italic text-[#3A3A3A]">{s.quote}</p>
                    </div>
                    <span className={`h-fit border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${STATUS[s.status][1]}`}>{STATUS[s.status][0]}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const POINTS = ["Only trusted, official sources", "Every claim traced to its document", "Contradictions flagged instantly"];

export const FeatureResearch = () => (
  <section id="f-research" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32" data-testid="feature-research">
    <div className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <FeatureTitle n="01" title="Deep Research & Verification" />
          <h3 className="mt-8 font-display text-4xl font-medium leading-[1.02] tracking-[-0.025em] lg:text-[3.4rem]">
            <MaskLines inView lines={["Research and verify any story", <em key="e" className="italic text-signal">from trusted sources.</em>]} />
          </h3>
          <FadeUp delay={0.1}>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#3A3A3A]">Ask a question. Chople finds the evidence in official data and shows you exactly where each fact came from.</p>
            <ul className="mt-8 space-y-3 border-t border-rule pt-6">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[16px]"><span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />{p}</li>
              ))}
            </ul>
            <div className="mt-10 flex items-center gap-4 bg-ink p-5 text-paper" data-testid="sourced-banner">
              <ShieldCheck className="h-8 w-8 shrink-0 text-[#9DB2FF]" />
              <div>
                <p className="font-display text-2xl leading-tight">Every response is backed by a source.</p>
                <p className="mt-1 text-[13px] text-white/60">No more searching dozens of websites, PDFs and archives to verify one story.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
      <FadeUp delay={0.1} className="lg:col-span-7"><Tracer /></FadeUp>
    </div>
  </section>
);
