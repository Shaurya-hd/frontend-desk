import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Sparkles, NotebookPen, Check, Copy, FileText, ArrowRight, Link2, Trash2, Database } from "lucide-react";
import { ChartStudio } from "@/components/charts/ChartStudio";
import { FINDINGS, SOURCES, FEED, LIVE_SOURCES } from "@/data/platform";

const copyText = async (text, msg) => {
  try { await navigator.clipboard.writeText(text); toast.success(msg); }
  catch { toast.error("Clipboard unavailable in this browser."); }
};

export const ResearchView = ({ onNote, notes }) => (
  <div className="mx-auto max-w-[980px] space-y-6 p-5 lg:p-8" data-testid="app-research-view">
    <div className="ml-auto w-fit max-w-[80%] rounded-lg bg-[#EEF2FF] px-4 py-3 text-[14px] text-[#1E1B4B]">Examine MSME budget allocation trends and key schemes since 2018-19</div>
    <div className="flex flex-wrap items-center gap-2 font-mono text-[10.5px] text-[#6B6B63]">
      <span className="flex items-center gap-1.5 rounded bg-ink px-2 py-1 text-paper"><Sparkles className="h-3 w-3 text-[#9DB2FF]" /> Trend + scheme comparison → KPIs, line chart, findings</span>
      <span>Standard depth · 14 documents read · 6.2s</span>
    </div>
    <ChartStudio fixedKey="msme" compact idPrefix="app-chart" />
    <div className="rounded-lg border border-rule bg-white p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">Key findings · select to save</div>
      <div className="mt-3 divide-y divide-rule">
        {FINDINGS.map((f) => {
          const saved = notes.some((n) => n.id === f.id);
          return (
            <div key={f.id} className="group flex items-start gap-4 py-3.5">
              <p className="flex-1 text-[14px] leading-relaxed">{f.text} <span className="font-mono text-[11px] text-[#4F46E5]">{f.cite.split(" ")[0]}</span></p>
              <button onClick={() => onNote({ ...f, from: "MSME Budget Allocation analysis" })} data-testid={`app-add-note-${f.id}`} className={`flex shrink-0 items-center gap-1.5 rounded border px-2.5 py-1.5 text-[11.5px] transition-[background-color,color,opacity] ${saved ? "border-emerald-600/30 bg-emerald-50 text-emerald-700" : "border-rule bg-white text-[#3A3A3A] opacity-70 hover:border-[#A5B4FC] hover:text-[#4F46E5] group-hover:opacity-100"}`}>
                {saved ? <Check className="h-3.5 w-3.5" /> : <NotebookPen className="h-3.5 w-3.5" />} {saved ? "Saved" : "Add to notes"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
    <div className="rounded-lg border border-rule bg-white p-5">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">Sources</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {SOURCES.map(([t, m], i) => (
          <div key={t} className="flex items-start gap-3 rounded border border-rule p-3">
            <span className="font-mono text-[11px] text-[#4F46E5]">[{i + 1}]</span>
            <div><div className="flex items-center gap-1.5 text-[13px] font-medium"><FileText className="h-3.5 w-3.5 text-[#6B6B63]" />{t}</div><div className="mt-0.5 text-[11.5px] text-[#6B6B63]">{m}</div></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const TrendsView = ({ onOpen, prefix = "app" }) => {
  const [sel, setSel] = useState(FEED[0]);
  return (
    <div className="grid min-h-full lg:grid-cols-[1fr_1.1fr]" data-testid={`${prefix}-trends-view`}>
      <div className="border-r border-rule p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">Your news feed · live</div>
        <div className="mt-3 space-y-2">
          {FEED.map((f) => (
            <button key={f.id} onClick={() => setSel(f)} data-testid={`${prefix}-trend-${f.id}`} className={`w-full rounded-lg border p-4 text-left transition-colors ${sel.id === f.id ? "border-[#A5B4FC] bg-[#EEF2FF]" : "border-rule bg-white hover:border-[#A5B4FC]"}`}>
              <div className="flex items-center justify-between font-mono text-[10px] text-[#6B6B63]"><span className="uppercase tracking-[0.14em]">{f.tag}</span><span>{f.meta}</span></div>
              <div className="mt-1.5 text-[14px] font-medium leading-snug">{f.h}</div>
              <div className="mt-2 flex items-center gap-1.5 text-[11.5px] text-[#4F46E5]"><Link2 className="h-3 w-3" /> {f.links.length} connections found</div>
            </button>
          ))}
        </div>
      </div>
      <div className="p-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">Connections</div>
        <p className="mt-2 text-[16px] font-medium leading-snug" data-testid={`${prefix}-trend-selected`}>{sel.h}</p>
        <div className="relative mt-5 space-y-3 border-l border-[#A5B4FC] pl-5">
          {sel.links.map(([k, v], i) => (
            <motion.div key={sel.id + i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="relative rounded-lg border border-rule bg-white p-3.5">
              <span className="absolute -left-[25px] top-4 h-2 w-2 rounded-full bg-[#4F46E5]" />
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#4F46E5]">{k}</div>
              <div className="mt-1 text-[13.5px]">{v}</div>
            </motion.div>
          ))}
        </div>
        <button onClick={onOpen} className="mt-6 flex items-center gap-2 rounded-md bg-ink px-4 py-2.5 text-[13px] text-paper transition-transform active:scale-95" data-testid={`${prefix}-trend-open-research`}>Open in Research Mode <ArrowRight className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
};

export const NotesView = ({ notes, onRemove, goResearch }) => {
  const all = notes.map((n) => `${n.text}\nSource: ${n.cite}`).join("\n\n");
  if (!notes.length)
    return (
      <div className="flex h-full min-h-[500px] flex-col items-center justify-center p-8 text-center" data-testid="app-notes-empty">
        <NotebookPen className="h-8 w-8 text-[#A5B4FC]" />
        <p className="mt-4 text-[16px] font-medium">No notes yet</p>
        <p className="mt-1 max-w-xs text-[13px] text-[#6B6B63]">Select any finding in Research Mode and click “Add to notes” — the citation comes with it.</p>
        <button onClick={goResearch} className="mt-5 rounded-md bg-ink px-4 py-2.5 text-[13px] text-paper" data-testid="app-notes-go-research">Go to Research Mode</button>
      </div>
    );
  return (
    <div className="mx-auto max-w-[820px] p-5 lg:p-8" data-testid="app-notes-view">
      <div className="flex items-center justify-between">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]">{notes.length} saved · citations attached</div>
        <button onClick={() => copyText(all, "All notes copied with citations.")} className="flex items-center gap-1.5 rounded-md border border-[#A5B4FC] bg-[#EEF2FF] px-3 py-1.5 text-[12px] text-[#4F46E5]" data-testid="app-notes-copy-all"><Copy className="h-3.5 w-3.5" /> Copy all with citations</button>
      </div>
      <div className="mt-4 space-y-3">
        {notes.map((n) => (
          <motion.div key={n.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-rule bg-white p-4" data-testid={`app-note-${n.id}`}>
            <p className="text-[14px] leading-relaxed">{n.text}</p>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-rule pt-3">
              <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#4F46E5]"><FileText className="h-3 w-3" />{n.cite}</span>
              <span className="flex gap-2">
                <button onClick={() => copyText(`${n.text}\nSource: ${n.cite}`, "Note copied with citation.")} className="text-[#6B6B63] hover:text-ink" aria-label="Copy note" data-testid={`app-note-copy-${n.id}`}><Copy className="h-3.5 w-3.5" /></button>
                <button onClick={() => onRemove(n.id)} className="text-[#6B6B63] hover:text-alert" aria-label="Delete note" data-testid={`app-note-delete-${n.id}`}><Trash2 className="h-3.5 w-3.5" /></button>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const SourcesView = () => {
  const max = Math.max(...LIVE_SOURCES.map(([, n]) => n));
  return (
    <div className="mx-auto max-w-[820px] p-5 lg:p-8" data-testid="app-sources-view">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#6B6B63]"><Database className="h-3.5 w-3.5" /> 503 live, pre-approved sources · updated continuously</div>
      <div className="mt-5 space-y-2.5">
        {LIVE_SOURCES.map(([t, n], i) => (
          <div key={t} className="rounded-lg border border-rule bg-white p-3.5">
            <div className="flex items-center justify-between text-[13.5px]"><span>{t}</span><span className="font-mono text-[12px] text-[#4F46E5]">{n}</span></div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded bg-[#F0F0EB]"><motion.div initial={{ width: 0 }} animate={{ width: `${(n / max) * 100}%` }} transition={{ delay: i * 0.05, duration: 0.8 }} className="h-full bg-[#4F46E5]" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};
