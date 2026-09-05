"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Instructor } from "@/data/programs";

function LinkedIn() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.4 2.4 4.4 5.6V21h-4v-5.3c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9z" />
    </svg>
  );
}
function Arrow({ dir }: { dir: "l" | "r" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={dir === "l" ? "M15 19L8 12l7-7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

export default function InstructorCarousel({ people }: { people: Instructor[] }) {
  const [i, setI] = useState(0);
  const n = people.length;
  const touch = useRef<number | null>(null);
  const region = useRef<HTMLDivElement>(null);

  const go = useCallback((k: number) => setI(((k % n) + n) % n), [n]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!region.current) return;
      if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); go(i - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, go]);

  return (
    <div ref={region} className="relative" role="region" aria-roledescription="carousel" aria-label="Instructors">
      <div className="overflow-hidden rounded-2xl border border-line bg-white"
        onTouchStart={e => { touch.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 48) go(dx < 0 ? i + 1 : i - 1);
          touch.current = null;
        }}>
        <div className="flex transition-transform duration-500 ease-[cubic-bezier(.5,.05,.2,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${i * 100}%)` }}>
          {people.map((p, idx) => (
            <article key={p.slug} aria-hidden={idx !== i}
              className="w-full shrink-0 grow-0 basis-full p-6 sm:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-14">
                <div className="relative mx-auto aspect-square w-full max-w-[380px] overflow-hidden rounded-xl border border-line bg-paper-100">
                  <Image src={`/team/${p.slug}.jpg`} alt={`${p.name}, ${p.role}`} fill
                    sizes="(max-width: 1024px) 90vw, 380px" priority={idx === 0} className="object-cover" />
                  {p.photoPending && (
                    <span className="absolute left-3 top-3 rounded bg-jade px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                      Photo pending
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-col justify-center">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-jade">{p.role}</p>
                  <h2 className="mt-3 font-serif text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[3rem]">{p.name}</h2>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.teaches.map(t => (
                      <li key={t} className="rounded-md bg-jade-soft px-3 py-1.5 text-[13px] font-medium text-jade-dark">{t}</li>
                    ))}
                  </ul>

                  <p className="mt-6 max-w-[52ch] text-[1.0625rem] font-light leading-[1.6] text-slateink">{p.bio}</p>

                  <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-line pt-6 sm:grid-cols-3">
                    {[["Experience", p.exp], ["Previously", p.prev], ["Education", p.edu]].map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.13em] text-slateink-light">{k}</dt>
                        <dd className="mt-1.5 text-[14px] leading-snug text-slateink">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-7">
                    {p.linkedin ? (
                      <a href={p.linkedin} target="_blank" rel="noopener noreferrer" tabIndex={idx === i ? 0 : -1}
                        className="inline-flex items-center gap-2.5 rounded-lg border border-line-strong px-4 py-2.5 font-mono text-[12px] transition-colors hover:border-jade hover:text-jade">
                        <LinkedIn /> LinkedIn
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2.5 font-mono text-[12px] italic text-slateink-light">
                        <LinkedIn /> LinkedIn to be added
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button onClick={() => go(i - 1)} aria-label="Previous instructor"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-white transition-colors hover:border-jade hover:bg-jade hover:text-white">
          <Arrow dir="l" />
        </button>
        <button onClick={() => go(i + 1)} aria-label="Next instructor"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-white transition-colors hover:border-jade hover:bg-jade hover:text-white">
          <Arrow dir="r" />
        </button>

        <div className="ml-1 flex flex-wrap gap-2">
          {people.map((p, idx) => (
            <button key={p.slug} onClick={() => go(idx)} aria-current={idx === i}
              className={`rounded-md border px-3 py-2 text-[13px] font-medium transition-colors ${
                idx === i ? "border-jade bg-jade text-white" : "border-line text-slateink hover:border-jade hover:text-jade"}`}>
              {p.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <span className="ml-auto hidden font-mono text-[11px] uppercase tracking-[0.1em] text-slateink-light sm:block">
          ← → to move · swipe on touch
        </span>
      </div>

      <p aria-live="polite" className="sr-only">{`Instructor ${i + 1} of ${n}: ${people[i].name}`}</p>
    </div>
  );
}
