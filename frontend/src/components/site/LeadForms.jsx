import { useState } from "react";
import { toast } from "sonner";
import { Check, ArrowUpRight, Loader2 } from "lucide-react";
import { api, errorMessage } from "@/lib/api";
import { btnInk, btnPaper, arrowCls } from "./Btn";

const fieldCls = (dark) =>
  `w-full h-11 px-3.5 text-[14px] border outline-none transition-colors duration-200 rounded-none ${
    dark
      ? "bg-white/[0.04] border-white/15 text-paper placeholder:text-white/35 focus:border-paper"
      : "bg-white border-rule text-ink placeholder:text-[#9A9A90] focus:border-ink"
  }`;

export const Field = ({ label, dark, as = "input", children, ...props }) => {
  const Tag = as;
  return (
    <label className="block">
      <span className={`mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] ${dark ? "text-white/50" : "text-[#6B6B63]"}`}>{label}</span>
      {as === "select" ? (
        <select className={fieldCls(dark)} {...props}>{children}</select>
      ) : (
        <Tag className={`${fieldCls(dark)} ${as === "textarea" ? "h-24 py-3 resize-none" : ""}`} {...props} />
      )}
    </label>
  );
};

const Done = ({ dark, title, text, testId }) => (
  <div data-testid={testId} className={`flex items-start gap-4 border p-6 ${dark ? "border-white/15" : "border-rule bg-white"}`}>
    <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-signal text-white"><Check className="h-4 w-4" /></span>
    <div>
      <p className={`font-display text-2xl ${dark ? "text-paper" : "text-ink"}`}>{title}</p>
      <p className={`mt-1 text-sm ${dark ? "text-white/60" : "text-[#4A4A4A]"}`}>{text}</p>
    </div>
  </div>
);

const useSubmit = (endpoint, initial, onSuccess) => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post(endpoint, form);
      setDone(true);
      onSuccess?.(data);
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setLoading(false);
    }
  };
  return { form, set, submit, loading, done };
};

export const WaitlistForm = ({ dark = false, prefix = "waitlist", onDone }) => {
  const { form, set, submit, loading, done } = useSubmit(
    "/waitlist",
    { name: "", email: "", organisation: "", role: "" },
    (d) => {
      toast.success(d.status === "exists" ? "You're already on the list — we'll be in touch." : "You're on the waitlist.");
      onDone?.();
    }
  );
  if (done) return <Done dark={dark} testId={`${prefix}-success`} title="You're on the list." text="We're onboarding newsrooms in batches. Expect a note from our team soon." />;
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" data-testid={`${prefix}-form`}>
      <Field dark={dark} label="Full name" required value={form.name} onChange={set("name")} placeholder="Aarti Sharma" data-testid={`${prefix}-name-input`} />
      <Field dark={dark} label="Work email" type="email" required value={form.email} onChange={set("email")} placeholder="aarti@newsroom.in" data-testid={`${prefix}-email-input`} />
      <Field dark={dark} label="Organisation" value={form.organisation} onChange={set("organisation")} placeholder="Publication / media house" data-testid={`${prefix}-org-input`} />
      <Field dark={dark} label="Role" value={form.role} onChange={set("role")} placeholder="Data journalist, editor…" data-testid={`${prefix}-role-input`} />
      <button type="submit" disabled={loading} className={`${dark ? btnPaper : btnInk} sm:col-span-2 h-12`} data-testid={`${prefix}-submit-button`}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Join the waitlist <ArrowUpRight className={arrowCls} /></>}
      </button>
    </form>
  );
};

export const EnterpriseForm = ({ onDone }) => {
  const { form, set, submit, loading, done } = useSubmit(
    "/enterprise",
    { name: "", email: "", organisation: "", role: "", team_size: "", message: "" },
    () => {
      toast.success("Thanks — our enterprise team will reach out within one working day.");
      onDone?.();
    }
  );
  if (done) return <Done testId="enterprise-success" title="Request received." text="Our team will contact you within one working day to set up a newsroom walkthrough." />;
  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" data-testid="enterprise-form">
      <Field label="Full name" required value={form.name} onChange={set("name")} placeholder="Your name" data-testid="enterprise-name-input" />
      <Field label="Work email" type="email" required value={form.email} onChange={set("email")} placeholder="you@mediahouse.com" data-testid="enterprise-email-input" />
      <Field label="Media house" required value={form.organisation} onChange={set("organisation")} placeholder="Organisation" data-testid="enterprise-org-input" />
      <Field label="Role" value={form.role} onChange={set("role")} placeholder="Editor-in-chief, CTO…" data-testid="enterprise-role-input" />
      <div className="sm:col-span-2">
        <Field as="select" label="Newsroom size" value={form.team_size} onChange={set("team_size")} data-testid="enterprise-size-select">
          <option value="">Select size</option>
          <option>1–25 journalists</option>
          <option>26–100 journalists</option>
          <option>101–500 journalists</option>
          <option>500+ journalists</option>
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field as="textarea" label="What would you like to research?" value={form.message} onChange={set("message")} placeholder="Beats, archives, data sources you care about…" data-testid="enterprise-message-input" />
      </div>
      <button type="submit" disabled={loading} className={`${btnInk} sm:col-span-2 h-12`} data-testid="enterprise-submit-button">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Request enterprise access <ArrowUpRight className={arrowCls} /></>}
      </button>
    </form>
  );
};
