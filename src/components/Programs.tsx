import Link from "next/link";
import { PROGRAMS } from "@/data/programs";

export default function Programs() {
  return (
    <section id="programs" className="sect scroll-mt-20 bg-paper">
      <div className="wrap">
        <p className="eyebrow">Three ways in</p>
        <h2 className="h2 mt-4 max-w-[22ch]">Pick the one that matches where you actually are.</h2>
        <p className="lede mt-5 max-w-[60ch]">
          The same destination — an engineer who can build, deploy and defend an AI system.
          What differs is where you start and how much of it you need.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <article key={p.slug}
              className={`flex flex-col rounded-lg border p-7 transition-shadow hover:shadow-[0_2px_28px_-12px_rgba(10,110,92,0.35)]
                ${i === 1 ? "border-jade bg-jade-soft" : "border-line bg-white"}`}>
              <p className="eyebrow">{p.kicker}</p>
              <h3 className="h3 mt-3">{p.name}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slateink">{p.tagline}</p>

              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 border-y border-line py-3 font-mono text-xs text-slateink">
                <span className="font-semibold text-ink">{p.duration}</span>
                <span>{p.sessions}</span>
                <span>{p.hours}</span>
              </div>

              <ul className="mt-5 space-y-3">
                {p.bullets.map(b => (
                  <li key={b} className="relative pl-5 text-sm leading-relaxed text-slateink">
                    <span aria-hidden className="absolute left-0 top-[7px] h-1.5 w-1.5 rounded-sm bg-jade" />
                    {b}
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-line pt-4 text-sm text-slateink-light">
                <span className="font-semibold text-ink">For: </span>{p.audience}
              </p>

              <Link href={`/${p.slug}`} className={`mt-6 ${i === 1 ? "btn-primary" : "btn-ghost"} w-full`}>
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
