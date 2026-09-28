import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot, LabelList, ReferenceLine } from "recharts";
import { LineChart as LineIcon, BarChart3, PieChart as PieIcon, FileText, TrendingUp, TrendingDown, GitCompare, ShieldCheck } from "lucide-react";
import { DATASETS, PALETTE } from "@/data/charts";
import { fmt } from "@/lib/api";
import { AXIS, ChartTip } from "./MiniChart";

const SIGNAL = "#2F5CF0";
const ALERT = "#D6392B";
const MODES = { series: [["abs", "Absolute"], ["yoy", "YoY change %"], ["index", "Indexed (base 100)"]], category: [["abs", "Absolute"], ["share", "Share %"]] };
const ORDERS = [["reported", "As reported"], ["asc", "Ascending"], ["desc", "Descending"]];
const VIEWS = [["line", "Line", LineIcon], ["bar", "Bar", BarChart3], ["pie", "Pie", PieIcon]];
const A_ICON = { spike: TrendingUp, crash: TrendingDown, conflict: GitCompare };

const transform = (ds, mode, order) => {
  const sum = ds.data.reduce((a, b) => a + b.value, 0);
  let rows = ds.data
    .map((d, i, arr) => {
      let v = d.value;
      if (mode === "yoy") v = i === 0 ? null : ((d.value - arr[i - 1].value) / Math.abs(arr[i - 1].value)) * 100;
      if (mode === "index") v = (d.value / arr[0].value) * 100;
      if (mode === "share") v = (d.value / sum) * 100;
      return { label: d.label, value: v == null ? null : +v.toFixed(2) };
    })
    .filter((r) => r.value !== null);
  if (order === "asc") rows = [...rows].sort((a, b) => a.value - b.value);
  if (order === "desc") rows = [...rows].sort((a, b) => b.value - a.value);
  return rows;
};

const unitFor = (ds, mode) => ({ abs: ds.unit, yoy: "% YoY", index: "index", share: "% share" }[mode]);

const Seg = ({ label, children }) => (
  <div className="flex items-center gap-2">
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">{label}</span>
    {children}
  </div>
);
const selCls = "h-8 border border-rule bg-white px-2 text-[12.5px] text-ink outline-none focus:border-ink";
const pill = (on) => `h-8 px-3 text-[12px] border transition-[background-color,color,border-color,transform] duration-200 active:scale-95 ${on ? "border-[#A5B4FC] bg-[#EEF2FF] text-[#4F46E5]" : "border-rule bg-white text-[#3A3A3A] hover:border-ink"}`;

export const ChartStudio = ({ fixedKey, compact = false, idPrefix = "studio" }) => {
  const [key, setKey] = useState(fixedKey || "msme");
  const [view, setView] = useState("line");
  const [mode, setMode] = useState("abs");
  const [order, setOrder] = useState("reported");
  const [showValues, setShowValues] = useState(false);
  const [zero, setZero] = useState(true);
  const [showAnoms, setShowAnoms] = useState(true);
  const ds = DATASETS[key];
  const rows = useMemo(() => transform(ds, mode, order), [ds, mode, order]);
  const unit = unitFor(ds, mode);
  const anoms = showAnoms ? ds.anomalies.filter((a) => rows.some((r) => r.label === a.label)) : [];
  const isAnom = (label) => anoms.some((a) => a.label === label);
  const hasNeg = rows.some((r) => r.value < 0);

  const pickDataset = (k) => {
    setKey(k);
    if (!MODES[DATASETS[k].kind].some(([m]) => m === mode)) setMode("abs");
  };
  const table = () => [`${ds.title}\tUnit: ${unit}`, ...rows.map((r) => `${r.label}\t${r.value}`), `Source: ${ds.source}`, "Compiled with Chople's Desk"].join("\n");
  const copy = async () => {
    try { await navigator.clipboard.writeText(table()); toast.success("Data copied — with citation attached."); }
    catch { toast.error("Clipboard unavailable in this browser."); }
  };
  const exportCsv = () => {
    const csv = ["label,value", ...rows.map((r) => `"${r.label}",${r.value}`), `"Source: ${ds.source}",`].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `chople-${ds.key}-${mode}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success("CSV exported with source line.");
  };
  const domain = zero ? [(min) => Math.min(0, min), "auto"] : ["auto", "auto"];
  const labelProps = { dataKey: "value", position: "top", formatter: (v) => fmt(v, 1), style: { fontSize: 10.5, fill: "#3A3A3A", fontFamily: "JetBrains Mono" } };
  const h = compact ? 280 : 360;

  return (
    <div className="border border-ink bg-paper" data-testid={`${idPrefix}-root`}>
      {!fixedKey && (
        <div className="flex overflow-x-auto border-b border-ink no-scrollbar">
          {Object.values(DATASETS).map((d) => (
            <button key={d.key} onClick={() => pickDataset(d.key)} data-testid={`${idPrefix}-dataset-${d.key}`} className={`relative whitespace-nowrap px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${key === d.key ? "bg-ink text-paper" : "text-[#4A4A4A] hover:bg-paper-2"}`}>
              {d.tab}
            </button>
          ))}
        </div>
      )}
      <div className={`grid grid-cols-2 gap-px bg-rule ${compact ? "" : "lg:grid-cols-4"} border-b border-rule`}>
        {ds.kpis.map((k, i) => (
          <motion.div key={`${key}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white p-4 lg:p-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6B6B63]">{k.k}</div>
            <div className="mt-2 text-[19px] font-semibold tracking-tight lg:text-[22px]">{k.v}</div>
            <div className="mt-1 text-[12px] text-[#6B6B63]">{k.s}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-white px-4 py-3">
        <div className="flex flex-wrap items-center gap-4">
          <Seg label="View">
            <div className="flex border border-rule">
              {VIEWS.map(([v, l, I]) => (
                <button key={v} onClick={() => setView(v)} data-testid={`${idPrefix}-view-${v}`} className={`flex h-8 items-center gap-1.5 px-3 text-[12px] transition-colors active:scale-95 ${view === v ? "bg-ink text-paper" : "bg-white text-[#3A3A3A] hover:bg-paper-2"}`}>
                  <I className="h-3.5 w-3.5" /> {l}
                </button>
              ))}
            </div>
          </Seg>
          <Seg label="Values">
            <select value={mode} onChange={(e) => setMode(e.target.value)} className={selCls} data-testid={`${idPrefix}-values-select`}>
              {MODES[ds.kind].map(([m, l]) => <option key={m} value={m}>{l}</option>)}
            </select>
          </Seg>
          <Seg label="Order">
            <select value={order} onChange={(e) => setOrder(e.target.value)} className={selCls} data-testid={`${idPrefix}-order-select`}>
              {ORDERS.map(([o, l]) => <option key={o} value={o}>{l}</option>)}
            </select>
          </Seg>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setShowValues((s) => !s)} className={pill(showValues)} data-testid={`${idPrefix}-toggle-values`}>values</button>
          <button onClick={() => setZero((s) => !s)} className={pill(zero)} data-testid={`${idPrefix}-toggle-zero`}>zero baseline</button>
          <button onClick={() => setShowAnoms((s) => !s)} className={pill(showAnoms)} data-testid={`${idPrefix}-toggle-anomalies`}>anomalies</button>
          <button onClick={copy} className={pill(false)} data-testid={`${idPrefix}-copy-data`}>copy data</button>
          <button onClick={exportCsv} className={pill(false)} data-testid={`${idPrefix}-export`}>export</button>
        </div>
      </div>

      <div className={`grid bg-white ${compact ? "" : "lg:grid-cols-[1fr_300px]"}`}>
        <div className="p-4 lg:p-6" data-testid={`${idPrefix}-chart`}>
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <p className="text-[14px] font-medium">{ds.title}</p>
            <span className="font-mono text-[10.5px] text-[#6B6B63]">{unit}</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={`${key}-${view}-${mode}-${order}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
              {view === "pie" && hasNeg ? (
                <div className="flex flex-col items-start justify-center gap-4 border border-dashed border-rule p-8" style={{ height: h }} data-testid={`${idPrefix}-pie-warning`}>
                  <PieIcon className="h-6 w-6 text-[#9A9A90]" />
                  <p className="max-w-sm font-display text-2xl leading-tight">A pie can't show negative growth.</p>
                  <p className="max-w-sm text-[13.5px] text-[#4A4A4A]">This series contains a contraction. Chople recommends a line chart for change over time.</p>
                  <button onClick={() => setView("line")} className={pill(true)} data-testid={`${idPrefix}-switch-line`}>Switch to line</button>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={h}>
                  {view === "line" ? (
                    <LineChart data={rows} margin={{ top: 22, right: 20, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="#E9E9E1" strokeDasharray="2 4" vertical={false} />
                      <XAxis dataKey="label" tick={AXIS} axisLine={{ stroke: "#9A9A90" }} tickLine={false} padding={{ left: 12, right: 12 }} />
                      <YAxis tick={AXIS} axisLine={false} tickLine={false} width={70} domain={domain} tickFormatter={(v) => fmt(v, 1)} />
                      <Tooltip content={<ChartTip unit={unit} />} cursor={{ stroke: "#0F0F0F", strokeDasharray: "3 3" }} />
                      {hasNeg && <ReferenceLine y={0} stroke="#0F0F0F" />}
                      <Line type="linear" dataKey="value" stroke={SIGNAL} strokeWidth={2.2} dot={{ r: 4, fill: "#fff", stroke: SIGNAL, strokeWidth: 1.8 }} activeDot={{ r: 6 }} animationDuration={1000}>
                        {showValues && <LabelList {...labelProps} />}
                      </Line>
                      {anoms.map((a) => {
                        const r = rows.find((x) => x.label === a.label);
                        return <ReferenceDot key={a.label} x={a.label} y={r.value} r={12} fill="none" stroke={ALERT} strokeWidth={1.6} strokeDasharray="3 2" />;
                      })}
                    </LineChart>
                  ) : view === "bar" ? (
                    <BarChart data={rows} margin={{ top: 22, right: 12, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke="#E9E9E1" strokeDasharray="2 4" vertical={false} />
                      <XAxis dataKey="label" tick={AXIS} axisLine={{ stroke: "#9A9A90" }} tickLine={false} interval={0} />
                      <YAxis tick={AXIS} axisLine={false} tickLine={false} width={70} domain={domain} tickFormatter={(v) => fmt(v, 1)} />
                      <Tooltip content={<ChartTip unit={unit} />} cursor={{ fill: "rgba(47,92,240,0.06)" }} />
                      {hasNeg && <ReferenceLine y={0} stroke="#0F0F0F" />}
                      <Bar dataKey="value" animationDuration={800} maxBarSize={64}>
                        {rows.map((r) => <Cell key={r.label} fill={isAnom(r.label) ? ALERT : SIGNAL} />)}
                        {showValues && <LabelList {...labelProps} />}
                      </Bar>
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Tooltip content={<ChartTip unit={unit} />} />
                      <Pie data={rows} dataKey="value" nameKey="label" innerRadius="52%" outerRadius="86%" paddingAngle={1} stroke="#fff" strokeWidth={2} animationDuration={800}
                        label={showValues ? ({ value }) => fmt(value, 1) : false} labelLine={showValues}>
                        {rows.map((r, i) => <Cell key={r.label} fill={isAnom(r.label) ? ALERT : PALETTE[i % PALETTE.length]} />)}
                      </Pie>
                    </PieChart>
                  )}
                </ResponsiveContainer>
              )}
            </motion.div>
          </AnimatePresence>
          {view === "pie" && !hasNeg && (
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-[11px] text-[#3A3A3A]">
              {rows.map((r, i) => <span key={r.label} className="flex items-center gap-1.5"><span className="h-2 w-2" style={{ background: isAnom(r.label) ? ALERT : PALETTE[i % PALETTE.length] }} />{r.label}</span>)}
            </div>
          )}
        </div>

        <aside className={`border-rule bg-paper-2/60 p-5 ${compact ? "border-t" : "border-t lg:border-l lg:border-t-0"}`} data-testid={`${idPrefix}-anomaly-panel`}>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#6B6B63]">Anomaly detection</div>
          {ds.anomalies.length === 0 ? (
            <p className="mt-4 text-[13.5px] text-[#4A4A4A]">No spikes, crashes or conflicting values detected across sources for this dataset.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {ds.anomalies.map((a) => {
                const I = A_ICON[a.type];
                return (
                  <div key={a.label} className="border border-alert/30 bg-white p-3.5">
                    <div className="flex items-center gap-2 text-[13px] font-medium text-alert"><I className="h-3.5 w-3.5" /> {a.title}</div>
                    <div className="mt-1 font-mono text-[10.5px] text-[#6B6B63]">{a.label}</div>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[#3A3A3A]">{a.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </aside>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink bg-paper px-4 py-3 text-[12px] text-[#4A4A4A]" data-testid={`${idPrefix}-source`}>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#10865B]"><ShieldCheck className="h-3.5 w-3.5" /> Source</span>
        <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> {ds.source}</span>
      </div>
    </div>
  );
};
