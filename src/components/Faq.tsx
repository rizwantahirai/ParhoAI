import { FAQS } from "@/data/programs";

export default function Faq() {
  return (
    <section id="faq" className="sect scroll-mt-20 border-t border-line bg-paper-100">
      <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="h2 mt-3 max-w-[14ch]">Answered plainly.</h2>
          <p className="lede mt-4 max-w-[36ch]">
            Including the ones most course pages avoid.
          </p>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {FAQS.map(f => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start gap-4 font-serif text-lg font-semibold leading-snug marker:hidden">
                <span className="flex-1">{f.q}</span>
                <span aria-hidden className="mt-1 shrink-0 text-jade transition-transform duration-200 group-open:rotate-45">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 2v12M2 8h12"/></svg>
                </span>
              </summary>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-slateink">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
