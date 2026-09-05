"use client";
import { useState } from "react";
import { submitApplication, isConfigured, PROVIDER, type Application } from "@/lib/form";

const PROGRAMS = [
  "Diploma — 8 months, from zero",
  "Bootcamp — 3 months, I already code",
  "A single sprint",
  "Not sure — help me choose",
];

type State = "idle" | "sending" | "done" | "error";

export default function ApplyForm() {
  const [state, setState] = useState<State>("idle");

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
    <form onSubmit={onSubmit} className="space-y-6" noValidate={false}>
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
        <label className={label} htmlFor="background">Where are you now?</label>
        <textarea id="background" name="background" rows={4} required className={field}
          placeholder="What you do, what you have built, what you can already code. Be honest — it helps us place you correctly." />
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
          <a href="mailto:hello@parhoai.com" className="font-semibold underline">hello@parhoai.com</a> instead.
        </p>
      )}

      {!isConfigured && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">
          <strong>Form not connected yet.</strong> Set <code className="font-mono">NEXT_PUBLIC_FORM_PROVIDER</code>{" "}
          and the matching keys in <code className="font-mono">.env.local</code> — see{" "}
          <code className="font-mono">SETUP-FORM.md</code>. This notice only appears until it is configured.
          {PROVIDER !== "none" && <> Current provider: <code className="font-mono">{PROVIDER}</code>.</>}
        </p>
      )}
    </form>
  );
}
