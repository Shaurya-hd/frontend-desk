import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import { Search, TrendingUp, NotebookPen, Database, ChevronDown, PlusCircle, FileText, Pin, Table2, PanelsTopLeft, Send, Plus } from "lucide-react";
import { useLeads } from "@/components/site/LeadProvider";
import { ResearchView, TrendsView, NotesView, SourcesView } from "./AppViews";
import { DEPTHS, LIVE_SOURCES } from "@/data/platform";

const NAV = [
  { id: "research", Icon: Search, t: "Research Mode", s: "Deep-dive analysis" },
  { id: "trends", Icon: TrendingUp, t: "Trends", s: "Pattern analysis" },
  { id: "notes", Icon: NotebookPen, t: "Notes", s: "Saved notes & quotes" },
];
const CHATS = ["MSME Budget Allocation a…", "Crops Under PSS Scheme", "Examine the Ministry of Ski…", "Onion export policy 2023-24"];
const TITLES = { research: "MSME Budget Allocation analysis", trends: "Trends", notes: "Notes", sources: "Live Sources" };

export const AppMock = () => {
  const [view, setView] = useState("research");
  const [notes, setNotes] = useState([]);
  const [depth, setDepth] = useState("standard");
  const [q, setQ] = useState("");
  const [srcOpen, setSrcOpen] = useState(false);
  const { openWaitlist } = useLeads();
  const total = LIVE_SOURCES.reduce((a, [, n]) => a + n, 0);

  const addNote = (n) => {
    if (notes.some((x) => x.id === n.id)) return toast("Already in your notes.");
    setNotes((xs) => [n, ...xs]);
    toast.success("Saved to Notes — citation attached.");
  };
  const ask = (e) => {
    e.preventDefault();
    toast("This is an interactive preview. Join the waitlist to run live research.");
    openWaitlist();
  };

  return (
    <div className="overflow-hidden border border-ink bg-[#FAFAF8] shadow-[12px_12px_0_#0F0F0F]" data-testid="app-mock">
      <div className="grid h-[760px] md:grid-cols-[260px_1fr]">
        <aside className="hidden flex-col border-r border-rule bg-white md:flex">
          <div className="flex items-center gap-2.5 border-b border-rule px-5 py-4">
            <svg viewBox="0 0 32 32" className="h-7 w-7"><rect width="32" height="32" rx="7" fill="#0F0F0F" /><path d="M23.6 10.2A9.2 9.2 0 1 0 23.6 21.8" fill="none" stroke="#FBFBF9" strokeWidth="5.2" /></svg>
            <div className="leading-none"><div className="text-[15px] font-medium">Desk</div><div className="mt-0.5 font-mono text-[9px] tracking-[0.2em] text-[#8A8A80]">BY CHOPLE</div></div>
          </div>
          <div className="space-y-1 p-2.5">
            {NAV.map(({ id, Icon, t, s }) => (
              <button key={id} onClick={() => setView(id)} data-testid={`app-nav-${id}`} className={`flex w-full items-start gap-3 rounded-md border px-3 py-2.5 text-left transition-colors ${view === id ? "border-[#C7D2FE] bg-[#EEF2FF]" : "border-transparent hover:bg-paper-2"}`}>
                <Icon className={`mt-0.5 h-4 w-4 ${view === id ? "text-[#4F46E5]" : "text-[#4A4A4A]"}`} />
                <span><span className={`block text-[13.5px] ${view === id ? "text-[#4F46E5]" : "text-ink"}`}>{t}{id === "notes" && notes.length > 0 && <span className="ml-2 rounded bg-[#4F46E5] px-1.5 py-0.5 font-mono text-[9.5px] text-white" data-testid="app-notes-count">{notes.length}</span>}</span><span className="block text-[11.5px] text-[#8A8A80]">{s}</span></span>
              </button>
            ))}
            <button onClick={() => { setSrcOpen((o) => !o); setView("sources"); }} data-testid="app-nav-sources" className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13.5px] transition-colors hover:bg-paper-2 ${view === "sources" ? "bg-paper-2" : ""}`}>
              <Database className="h-4 w-4 text-[#4A4A4A]" /> <span className="font-medium">Live Sources</span> <span className="font-mono text-[11px] text-[#8A8A80]">{total}</span>
              <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${srcOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          <div className="flex items-center justify-between px-5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A8A80]">Research chats <PlusCircle className="h-3.5 w-3.5" /></div>
          <div className="mt-2 space-y-0.5 px-2.5">
            {CHATS.map((c, i) => (
              <button key={c} onClick={() => setView("research")} data-testid={`app-chat-${i}`} className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] ${i === 0 && view === "research" ? "bg-paper-2 text-ink" : "text-[#4A4A4A] hover:bg-paper-2"}`}>
                <FileText className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{c}</span>
              </button>
            ))}
          </div>
          <div className="mt-auto p-3">
            <button onClick={() => toast("Request any official source — our team indexes it for you.")} className="flex w-full items-center justify-center gap-2 rounded-md border border-[#C7D2FE] bg-[#EEF2FF] py-2.5 text-[13px] text-[#4F46E5]" data-testid="app-request-source"><Plus className="h-3.5 w-3.5" /> Request a Source</button>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-rule bg-[#FAFAF8] px-5">
            <div className="flex items-center gap-2 text-[14.5px] font-medium" data-testid="app-title">{TITLES[view]} <Pin className="h-3.5 w-3.5 text-[#8A8A80]" /></div>
            <div className="flex items-center gap-4 text-[12.5px] text-[#4A4A4A]">
              <button onClick={() => toast("Dataset view: every figure in this chat as a clean table.")} className="flex items-center gap-1.5 hover:text-ink" data-testid="app-dataset-button"><Table2 className="h-3.5 w-3.5" /> Dataset</button>
              <button onClick={() => toast("Canvas: arrange charts, notes and sources into a story draft.")} className="flex items-center gap-1.5 hover:text-ink" data-testid="app-canvas-button"><PanelsTopLeft className="h-3.5 w-3.5" /> Canvas</button>
            </div>
          </div>
          <div className="md:hidden flex gap-1 overflow-x-auto border-b border-rule p-2 no-scrollbar">
            {[...NAV, { id: "sources", t: "Sources" }].map((n) => (
              <button key={n.id} onClick={() => setView(n.id)} className={`whitespace-nowrap rounded px-3 py-1.5 text-[12.5px] ${view === n.id ? "bg-[#EEF2FF] text-[#4F46E5]" : "text-[#4A4A4A]"}`} data-testid={`app-mobile-nav-${n.id}`}>{n.t}</button>
            ))}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto" data-lenis-prevent>
            <AnimatePresence mode="wait">
              <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {view === "research" && <ResearchView onNote={addNote} notes={notes} />}
                {view === "trends" && <TrendsView onOpen={() => setView("research")} />}
                {view === "notes" && <NotesView notes={notes} onRemove={(id) => setNotes((xs) => xs.filter((n) => n.id !== id))} goResearch={() => setView("research")} />}
                {view === "sources" && <SourcesView />}
              </motion.div>
            </AnimatePresence>
          </div>
          {view === "research" && (
            <form onSubmit={ask} className="shrink-0 border-t border-rule bg-[#FAFAF8] px-5 py-3">
              <div className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
                <span className="mr-1 font-mono text-[10px] tracking-[0.16em] text-[#6B6B63]">DEPTH</span>
                {Object.keys(DEPTHS).map((d) => (
                  <button type="button" key={d} onClick={() => setDepth(d)} data-testid={`app-depth-${d}`} className={`rounded border px-2.5 py-1 capitalize ${depth === d ? "border-[#A5B4FC] bg-[#EEF2FF] text-[#4F46E5]" : "border-rule bg-white text-[#3A3A3A]"}`}>{d}</button>
                ))}
                <span className="ml-2 text-[#6B6B63]" data-testid="app-depth-caption">{DEPTHS[depth]}</span>
              </div>
              <div className="mt-2.5 flex gap-2.5">
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about spending, schemes or performance across years and ministries..." className="h-11 min-w-0 flex-1 rounded-md border border-rule bg-[#F2F2EE] px-4 text-[13.5px] outline-none focus:border-[#A5B4FC]" data-testid="app-query-input" />
                <button type="submit" className="flex h-11 w-11 items-center justify-center rounded-md bg-[#C7D2FE] text-[#4F46E5] transition-colors hover:bg-[#4F46E5] hover:text-white" data-testid="app-query-send"><Send className="h-4 w-4" /></button>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-[11.5px] text-[#4A4A4A]"><span className="flex items-center gap-1.5"><FileText className="h-3 w-3 text-[#4F46E5]" /> Sources cited from official government data only</span><span className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3 text-[#4F46E5]" /> Grounded in indexed public records</span></div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
