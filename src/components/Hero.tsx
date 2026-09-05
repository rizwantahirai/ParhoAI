import Link from "next/link";

const STATS = [
  { n: "140", l: "Sessions in the diploma" },
  { n: "9+1", l: "Projects and a capstone" },
  { n: "15", l: "Industry capstone briefs" },
  { n: "Urdu + English", l: "Language of instruction" },
];

export default function Hero() {
  return (
    <section className="relative -mt-[68px] overflow-hidden bg-ink pb-20 pt-[140px] text-white sm:pb-28 sm:pt-[190px]">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,214,166,0.18),transparent_68%)]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-56 left-1/4 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(10,110,92,0.34),transparent_70%)]" />
      <div className="wrap relative">
        <p className="eyebrow-l animate-rise">Live cohorts · Lahore and online</p>
        <h1 className="h1 mt-7 max-w-[15ch] animate-rise text-white [animation-delay:60ms]">
          Learn AI by building things that <em className="not-italic text-jade-bright">run</em>.
        </h1>
        <p className="lede mt-6 max-w-[52ch] animate-rise text-white/70 [animation-delay:120ms]">
          Not tutorials. Live cohorts where every module ends in a project that ships to
          your GitHub — from zero computer science, or in three months if you already code.
        </p>
        <div className="mt-11 flex animate-rise flex-col gap-3 sm:flex-row [animation-delay:180ms]">
          <Link href="/apply" className="btn-bright">Apply for the next cohort</Link>
          <Link href="#programs" className="btn-ghost-dark">Compare the three paths</Link>
        </div>

        <dl className="mt-16 grid animate-rise grid-cols-2 gap-x-6 gap-y-9 border-t border-white/12 pt-10 sm:mt-20 lg:grid-cols-4 [animation-delay:240ms]">
          {STATS.map(s => (
            <div key={s.l}>
              <dt className="font-serif text-2xl font-semibold leading-tight text-jade-bright sm:text-[2rem]">{s.n}</dt>
              <dd className="mt-2 font-mono text-[11px] uppercase leading-relaxed tracking-[0.11em] text-white/45">{s.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
