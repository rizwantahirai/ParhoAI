import type { Metadata } from "next";
import ApplyForm from "@/components/ApplyForm";
import PageHead from "@/components/PageHead";
import { WA_LINK, WA_DISPLAY, WaIcon } from "@/components/WhatsApp";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply for the next ParhoAI cohort — diploma, bootcamp or a single sprint. Ten minutes, and we reply within three working days.",
  openGraph: { url: "/apply", title: "Apply", description: "Apply for the next ParhoAI cohort — diploma, bootcamp or a single sprint. Ten minutes, and we reply within three working days." },
};

export default function Apply() {
  return (
    <>
      <PageHead kicker="Next cohort" title="Apply"
        lede="Ten minutes. We reply within three working days, either way — including if we think a different program is the right one for you."
        meta={[{k:"Cohort size",v:"25 max"},{k:"Reply within",v:"3 days"},{k:"Cost to apply",v:"Free"}]} />
      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ApplyForm />
          <aside className="space-y-8">
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-xl border border-line-strong bg-jade-soft p-5 transition-colors hover:border-jade">
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white">
                <WaIcon size={20} />
              </span>
              <span>
                <span className="block font-serif text-lg font-semibold">Prefer WhatsApp?</span>
                <span className="mt-1 block text-[14px] leading-relaxed text-slateink">
                  Message us on <span className="font-mono">{WA_DISPLAY}</span> — the same
                  questions, answered faster.
                </span>
              </span>
            </a>
            {[
              { h: "What happens next", b: "We read every application. If it looks like a fit you get a short take-home and a fifteen-minute call. No whiteboard interviews." },
              { h: "If you are not ready", b: "We will say so plainly, and tell you which program is right and what to learn first. That is a more useful answer than a place you would struggle in." },
              { h: "Payment", b: "Monthly instalments for the diploma and bootcamp. Sprints are paid upfront. Nothing is due until you have a confirmed place." },
            ].map(c => (
              <div key={c.h} className="border-l-2 border-jade pl-5">
                <h2 className="eyebrow">{c.h}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-slateink">{c.b}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
