import { BUILDS } from "@/data/programs";

export default function Builds() {
  return (
    <section id="builds" className="sect scroll-mt-20 bg-paper-warm">
      <div className="wrap">
        <p className="eyebrow">What you build</p>
        <h2 className="h2 mt-4 max-w-[24ch]">Six things that go on your GitHub, not on a certificate.</h2>
        <p className="lede mt-5 max-w-[58ch]">
          Each is a module deliverable. Each is defensible in an interview, because you will
          have to defend it in front of the cohort first.
        </p>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {BUILDS.map((b, i) => (
            <article key={b.t}
              className="group relative flex flex-col bg-white p-7 transition-colors hover:bg-jade-soft/60 sm:p-8">
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] scale-x-0 bg-jade transition-transform duration-300 group-hover:scale-x-100" />
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-sm bg-jade-soft px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-jade-dark">{b.tag}</span>
                <span className="font-mono text-[11px] font-bold text-slateink-faint">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="h3 mt-5">{b.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slateink">{b.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
