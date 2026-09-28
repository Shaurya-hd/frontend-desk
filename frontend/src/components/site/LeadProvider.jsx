import { createContext, useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { WaitlistForm, EnterpriseForm } from "./LeadForms";

const LeadCtx = createContext(null);
export const useLeads = () => useContext(LeadCtx);

const Panel = ({ open, onOpenChange, eyebrow, title, text, children, testId }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent data-lenis-prevent data-testid={testId} className="max-h-[92vh] max-w-xl overflow-y-auto rounded-none border border-ink bg-paper p-0 sm:rounded-none">
      <div className="border-b border-rule bg-paper-2 px-8 pb-6 pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-signal">{eyebrow}</p>
        <DialogTitle className="mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight">{title}</DialogTitle>
        <DialogDescription className="mt-3 max-w-md text-[14px] leading-relaxed text-[#4A4A4A]">{text}</DialogDescription>
      </div>
      <div className="px-8 py-7">{children}</div>
    </DialogContent>
  </Dialog>
);

export const LeadProvider = ({ children }) => {
  const [waitlist, setWaitlist] = useState(false);
  const [enterprise, setEnterprise] = useState(false);
  return (
    <LeadCtx.Provider value={{ openWaitlist: () => setWaitlist(true), openEnterprise: () => setEnterprise(true) }}>
      {children}
      <Panel open={waitlist} onOpenChange={setWaitlist} testId="waitlist-dialog" eyebrow="Private beta · 2026" title="Join the Chople's Desk waitlist" text="We're onboarding journalists and newsrooms in small batches. Tell us where you work and we'll save you a seat.">
        <WaitlistForm prefix="waitlist-dialog" />
      </Panel>
      <Panel open={enterprise} onOpenChange={setEnterprise} testId="enterprise-dialog" eyebrow="For media houses" title="Talk to enterprise sales" text="Custom source libraries, internal archive search, team workspaces and SSO — tailored to your newsroom.">
        <EnterpriseForm />
      </Panel>
    </LeadCtx.Provider>
  );
};
