"use client";
import { useEffect, useRef, useState } from "react";
import { submitApplication, isConfigured, type Application } from "@/lib/form";

const PROGRAMS = [
  "Diploma — 8 months, from zero",
  "Bootcamp — 3 months, I already code",
  "A single sprint",
  "Not sure — help me choose",
];

type State = "idle" | "sending" | "done" | "error";

/** Draft is kept in this browser only, so a refresh or a closed tab on a phone does not lose the text. */
const DRAFT_KEY = "parhoai.apply.draft.v1";
const DRAFT_FIELDS = ["name", "email", "program", "background", "goal", "github"] as const;
type Draft = Partial<Record<(typeof DRAFT_FIELDS)[number], string>>;

function readDraft(): Draft {
  try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}"); } catch { return {}; }
}
function writeDraft(d: Draft) {
  try {
    if (Object.values(d).some(v => v && v.trim())) localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
    else localStorage.removeItem(DRAFT_KEY);
  } catch { /* private mode or storage blocked — the form still works, it just will not remember */ }
}
function clearDraft() { try { localStorage.removeItem(DRAFT_KEY); } catch {} }

export default function ApplyForm() {
  const [state, setState] = useState<State>("idle");
  const [restored, setRestored] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Restore a saved draft once the form is on screen.
  useEffect(() => {
    const form = formRef.current; if (!form) return;
    const d = readDraft(); let any = false;
    DRAFT_FIELDS.forEach(k => {
      const el = form.elements.namedItem(k) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
      if (el && d[k]) { el.value = d[k]!; any = true; }
    });
    setRestored(any);
  }, [state === "idle"]); // eslint-disable-line react-hooks/exhaustive-deps

  function saveDraft() {
    const form = formRef.current; if (!form) return;
    const fd = new FormData(form); const d: Draft = {};
    DRAFT_FIELDS.forEach(k => { d[k] = String(fd.get(k) ?? ""); });
    writeDraft(d);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "");
    if (get("company")) return;               // honeypot — bots fill it, humans never see it

    const app: Application = {
      name: get("name"), email: get("email"), program: get("program"),
      background: get("background"), goal: get("goal"), github: get("github"),
    };

    setState("sending");
    try {
      await submitApplication(app);
      clearDraft();
      setState("done");
    } catch {
      setState("error");
    }
  }

  const field =
    "mt-2 w-full rounded-lg border border-line-strong bg-white px-4 py-3 text-[15px] outline-none " +
    "transition-colors placeholder:text-slateink-light focus:border-jade focus:ring-2 focus:ring-jade/20";
  const label = "block font-mono text-[11px] font-semibold uppercase tracking-[0.13em] text-jade-dark";

  if (state === "done") {
    return (
      <div className="rounded-xl border border-jade bg-jade-soft p-8" role="status">
        <h2 className="font-serif text-2xl font-semibold">Application received.</h2>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-slateink">
          We read every one. You will hear back within three working days — including if we
          think a different program is the better fit for you.
        </p>
        <button onClick={() => setState("idle")} className="btn-ghost mt-6">Send another</button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} onInput={saveDraft} onChange={saveDraft} className="space-y-6" noValidate={false}>
      {restored && (
        <p className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-paper-100 px-4 py-2.5 text-sm text-slateink" role="status">
          <span>We kept what you typed last time.</span>
          <button type="button" className="font-semibold text-jade underline underline-offset-2"
            onClick={() => { clearDraft(); formRef.current?.reset(); setRestored(false); }}>
            Start fresh
          </button>
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">Full name</label>
          <input id="name" name="name" required autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label className={label} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="program">Which program</label>
        <select id="program" name="program" required className={field} defaultValue="">
          <option value="" disabled>Choose one</option>
          {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      <div>
        <label className={label} htmlFor="background">Your background</label>
        <textarea id="background" name="background" rows={4} required className={field}
          placeholder="What you do today, what you have built, and how much you can already code. Be honest — it helps us place you in the right program." />
      </div>

      <div>
        <label className={label} htmlFor="goal">What do you want to be able to build?</label>
        <textarea id="goal" name="goal" rows={3} required className={field}
          placeholder="One specific thing you want to ship in the next year." />
      </div>

      <div>
        <label className={label} htmlFor="github">
          GitHub or portfolio <span className="normal-case tracking-normal text-slateink-light">(optional)</span>
        </label>
        <input id="github" name="github" className={field} placeholder="github.com/yourname" />
      </div>

      {/* honeypot */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" disabled={state === "sending" || !isConfigured}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
        {state === "sending" ? "Sending…" : "Send application"}
      </button>

      {state === "error" && (
        <p role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          That did not go through. Please email the details to{" "}
          <a href="mailto:hello@parhoai.org" className="font-semibold underline">hello@parhoai.org</a> instead.
        </p>
      )}

      {!isConfigured && (
        /* Shown until src/data/formConfig.ts has a Google Form id — see SETUP-FORM.md. */
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          <strong>Applications open shortly.</strong> The form is not taking submissions yet — message us on
          WhatsApp in the meantime and we will get straight back to you.
        </p>
      )}
    </form>
  );
}
