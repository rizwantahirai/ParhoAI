import Link from "next/link";
import Socials from "./Socials";

/** Home-page band: the free Python course, for visitors not ready to apply. */
export default function FreePython() {
  return (
    <section className="py-14 sm:py-20">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-2xl bg-ink px-6 py-10 text-white sm:px-10 sm:py-12">
          <div aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(61,212,171,0.18),transparent_70%)]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow-l">Not ready to apply? Start free</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">Python for AI/ML, one concept a day.</h2>
              <p className="mt-4 max-w-[52ch] text-white/70">
                Fifty short reels from your first <code className="font-mono text-jade-bright">print()</code> to classes and generators.
                Each has a quiz to pause and predict, and a free cheat sheet to keep.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/python" className="btn-bright">Start the free course</Link>
              </div>
            </div>
            <div className="space-y-4">
              <dl className="grid grid-cols-3 gap-4 border-t border-white/12 pt-5">
                {[["50", "levels"], ["~35 s", "each"], ["Free", "always"]].map(([v, k]) => (
                  <div key={k}><dt className="font-serif text-2xl font-semibold text-jade-bright">{v}</dt>
                    <dd className="mt-1 font-mono text-[11px] uppercase tracking-[0.11em] text-white/45">{k}</dd></div>
                ))}
              </dl>
              <Socials light />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
