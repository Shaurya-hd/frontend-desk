import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FeatureTitle, FadeUp, MaskLines } from "@/components/site/Reveal";
import { NODES, EDGES, THREAD, THREAD_NOTES, NODE_TYPES } from "@/data/connections";

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const edgeKey = (a, b) => [a, b].sort().join("|");
const THREAD_EDGES = new Set(THREAD.slice(1).map((id, i) => edgeKey(THREAD[i], id)));

const Graph = ({ step, hover, setHover }) => {
  const active = THREAD.slice(0, step + 1);
  const neighbours = useMemo(() => {
    if (!hover) return null;
    return new Set(EDGES.filter((e) => e.includes(hover)).flat());
  }, [hover]);

  return (
    <svg viewBox="0 0 1000 600" className="h-auto w-full" data-testid="connections-graph">
      {EDGES.map(([a, b]) => {
        const k = edgeKey(a, b);
        const lit = hover ? a === hover || b === hover : THREAD_EDGES.has(k) && active.includes(a) && active.includes(b);
        return (
          <motion.line key={k} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
            stroke={lit ? "#2F5CF0" : "rgba(15,15,15,0.12)"} strokeWidth={lit ? 2 : 1}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} />
        );
      })}
      {NODES.map((n) => {
        const on = hover ? neighbours.has(n.id) : active.includes(n.id);
        const current = !hover && THREAD[step] === n.id;
        const c = NODE_TYPES[n.type].color;
        return (
          <g key={n.id} onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} className="cursor-pointer" data-testid={`graph-node-${n.id}`} style={{ opacity: hover || step >= 0 ? (on ? 1 : 0.35) : 1, transition: "opacity 300ms" }}>
            {current && <circle cx={n.x} cy={n.y} r="20" fill="none" stroke="#2F5CF0" strokeWidth="1.5" className="animate-ping origin-center" style={{ transformBox: "fill-box" }} />}
            <circle cx={n.x} cy={n.y} r={on ? 9 : 6} fill={c} stroke="#FFFFFF" strokeWidth="3" style={{ transition: "r 300ms" }} />
            <text x={n.x} y={n.y - 18} textAnchor="middle" fill={on ? "#0F0F0F" : "rgba(15,15,15,0.45)"} fontFamily="IBM Plex Sans" fontSize="15">{n.t}</text>
            <text x={n.x} y={n.y + 28} textAnchor="middle" fill="rgba(15,15,15,0.45)" fontFamily="JetBrains Mono" fontSize="11">{n.date}</text>
          </g>
        );
      })}
    </svg>
  );
};

export const FeatureConnections = () => {
  const [step, setStep] = useState(0);
  const [hover, setHover] = useState(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (hover || paused) return;
    const t = setInterval(() => setStep((s) => (s + 1) % THREAD.length), 1700);
    return () => clearInterval(t);
  }, [hover, paused]);

  return (
    <section id="f-connections" className="relative overflow-hidden border-t border-rule bg-paper py-24 text-ink lg:py-32" data-testid="feature-connections">
      <div className="relative mx-auto max-w-[1440px] px-5 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <FeatureTitle n="03" title="Connections" />
            <h3 className="mt-8 font-display text-4xl font-medium leading-[1.02] tracking-[-0.025em] lg:text-[3.4rem]">
              <MaskLines inView lines={["Connect the dots.", <em key="e" className="italic text-signal">Discover the bigger story.</em>]} />
            </h3>
          </div>
          <FadeUp delay={0.1} className="flex items-end lg:col-span-5">
            <p className="max-w-md text-[17px] leading-relaxed text-[#3A3A3A]">Stories rarely stand alone. Chople links events, people, policies and data to show what connects them.</p>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-px border border-ink bg-ink lg:grid-cols-[1fr_380px]">
          <div className="bg-white p-4 lg:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-4">
              {Object.values(NODE_TYPES).map((t) => (
                <span key={t.label} className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#4A4A4A]"><span className="h-2 w-2 rounded-full" style={{ background: t.color }} />{t.label}</span>
              ))}
              <span className="ml-auto font-mono text-[10.5px] text-[#8A8A80]">Hover any node to see its links</span>
            </div>
            <Graph step={step} hover={hover} setHover={setHover} />
          </div>
          <div className="bg-paper-2 p-6 lg:p-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B63]">Story thread · auto-detected</div>
            <p className="mt-3 font-display text-3xl leading-tight">From a weak monsoon to an election-season U-turn.</p>
            <ol className="mt-6 space-y-1">
              {THREAD.map((id, i) => (
                <li key={id}>
                  <button onClick={() => setStep(i)} data-testid={`thread-step-${i}`} className={`flex w-full gap-4 border-l-2 py-2.5 pl-4 text-left transition-[border-color,background-color] duration-300 ${i === step ? "border-signal bg-white" : i < step ? "border-ink/40" : "border-rule"}`}>
                    <span className="font-mono text-[10.5px] text-[#8A8A80]">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className={`block text-[14px] ${i <= step ? "text-ink" : "text-[#8A8A80]"}`}>{byId[id].t}</span>
                      {i === step && <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-1 block text-[12.5px] leading-relaxed text-[#4A4A4A]">{THREAD_NOTES[id]}</motion.span>}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <FadeUp className="mt-10">
          <p className="font-display text-3xl leading-tight tracking-tight text-ink lg:text-[2.6rem]">Go beyond what happened. <em className="italic text-signal">Discover what connects it.</em></p>
        </FadeUp>
      </div>
    </section>
  );
};
