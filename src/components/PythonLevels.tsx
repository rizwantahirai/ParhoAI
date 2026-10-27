"use client";
import { useEffect, useState } from "react";
import { LEVELS, UNITS } from "@/data/python";

/** One level unlocks per day, the day its reel is posted. Locked levels show their release date. */
export default function PythonLevels() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    // Pakistan date, so a level unlocks at local midnight
    setToday(new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" }));
  }, []);
  const fmt = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  const open = LEVELS.filter(l => today && l.date <= today).length;

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.1em] text-slateink-light">
        {today ? `${open} of ${LEVELS.length} levels unlocked · a new one every day` : "A new level every day"}
      </p>
      {UNITS.map((unit, u) => (
        <section key={unit} className="mt-12">
          <h2 className="eyebrow">Unit {u + 1} · {unit}</h2>
          <ol className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line bg-white">
            {LEVELS.filter(l => l.unit === unit).map(l => {
              const unlocked = !!today && l.date <= today;
              return (
                <li key={l.slug} className={`flex items-center gap-4 px-5 py-4 sm:px-6 ${unlocked ? "" : "opacity-60"}`}>
                  <span className="w-10 shrink-0 font-mono text-sm font-semibold text-jade">{String(l.level).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-serif text-lg font-semibold text-ink">{l.title}</h3>
                    <p className="truncate text-sm text-slateink-light">{l.hook}</p>
                  </div>
                  {unlocked ? (
                    <a href={`/python/notes/${l.slug}.jpg`} target="_blank" rel="noopener"
                       className="shrink-0 rounded-md border border-jade px-3 py-1.5 text-sm font-semibold text-jade hover:bg-jade hover:text-white">
                      Cheat sheet
                    </a>
                  ) : (
                    <span className="shrink-0 font-mono text-xs uppercase tracking-[0.08em] text-slateink-faint">
                      🔒 {fmt(l.date)}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
