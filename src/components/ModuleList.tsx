export type Mod = { n: string; title: string; sub: string; sessions: string; topics: string[]; project: string };

export default function ModuleList({ mods }: { mods: Mod[] }) {
  return (
    <div className="mt-12 space-y-5">
      {mods.map(m => (
        <article key={m.n} className="overflow-hidden rounded-xl border border-line bg-white">
          <div className="flex flex-col gap-3 border-b border-line px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7">
            <span className="font-serif text-3xl font-bold leading-none text-jade">{m.n}</span>
            <div className="flex-1">
              <h3 className="h3">{m.title}</h3>
              <p className="mt-1 font-serif text-[15px] italic text-slateink">{m.sub}</p>
            </div>
            <span className="shrink-0 font-mono text-xs uppercase tracking-[0.1em] text-slateink-light">{m.sessions}</span>
          </div>
          <div className="px-6 py-5 sm:px-7">
            <ul className="flex flex-wrap gap-2">
              {m.topics.map(t => (
                <li key={t} className="rounded-sm bg-paper-100 px-2.5 py-1.5 text-[13px] text-slateink">{t}</li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-[15px]">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-jade-dark">Build&nbsp;&nbsp;</span>
              <span className="font-serif font-medium">{m.project}</span>
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
