"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LEVELS, UNITS } from "@/data/python";
import { doneSet, onProgress } from "@/lib/progress";

/** All 50 levels, each linking to its interactive lesson. Ticks show what this visitor has completed. */
export default function PythonLevels() {
  const [done, setDone] = useState<Set<string>>(new Set());
  useEffect(() => { const load = () => setDone(doneSet()); load(); return onProgress(load); }, []);
  const next = LEVELS.find(l => !done.has(l.slug)) || LEVELS[0];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line bg-white p-5">
        <div className="min-w-[200px] flex-1">
          <p className="font-mono text-xs uppercase tracking-[0.1em] text-slateink-light">Your progress · {done.size} of {LEVELS.length} levels</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-200"><div className="h-full bg-jade transition-all" style={{ width: `${(done.size / LEVELS.length) * 100}%` }} /></div>
        </div>
        <Link href={`/python/${next.slug}`} className="btn-primary">{done.size ? `Continue: Level ${next.level}` : "Start Level 1"}</Link>
      </div>
      {UNITS.map((unit, u) => (
        <section key={unit} className="mt-12">
          <h2 className="eyebrow">Unit {u + 1} · {unit}</h2>
          <ol className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
            {LEVELS.filter(l => l.unit === unit).map(l => (
              <li key={l.slug}>
                <Link href={`/python/${l.slug}`} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-jade-soft sm:px-6">
                  <span className="w-10 shrink-0 font-mono text-sm font-semibold text-jade">{String(l.level).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-serif text-lg font-semibold text-ink">{l.title}</h3>
                    <p className="truncate text-sm text-slateink-light">{l.hook}</p>
                  </div>
                  <span className={`shrink-0 text-sm font-semibold ${done.has(l.slug) ? "text-jade" : "text-slateink-faint"}`}>{done.has(l.slug) ? "✓ Done" : "Start →"}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
