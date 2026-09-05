export default function PageHead({ kicker, title, lede, meta }:
  { kicker: string; title: string; lede: string; meta: { k: string; v: string }[] }) {
  return (
    <section className="relative -mt-[68px] overflow-hidden bg-ink pb-14 pt-[118px] text-white sm:pb-16 sm:pt-[140px]">
      <div aria-hidden className="pointer-events-none absolute -right-36 -top-36 h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(61,212,171,0.15),transparent_70%)]" />
      <div className="wrap relative">
        <p className="eyebrow-l">{kicker}</p>
        <h1 className="h1 mt-4 max-w-[18ch] text-white">{title}</h1>
        <p className="lede mt-5 max-w-[56ch] text-white/70">{lede}</p>
        <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/12 pt-7">
          {meta.map(m => (
            <div key={m.k}>
              <dt className="font-serif text-2xl font-semibold text-jade-bright sm:text-[1.75rem]">{m.v}</dt>
              <dd className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.11em] text-white/45">{m.k}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
