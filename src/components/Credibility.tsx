const FROM = ["VSBLTY", "RootBlock Labs", "HAZEN", "JinnByte", "DocNow EHR", "BRICKandMORTAR.ai"];
const EDU  = ["University of Bradford", "FAST NUCES", "University of the Punjab", "GC University Faisalabad"];

export default function Credibility() {
  return (
    <section className="border-b border-line bg-paper py-14 sm:py-16">
      <div className="wrap">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.16em] text-slateink-light">
          Taught by engineers who have shipped at
        </p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {FROM.map(n => (
            <li key={n} className="font-serif text-lg font-semibold text-ink/45 transition-colors hover:text-ink sm:text-xl">{n}</li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-line pt-7">
          {EDU.map(n => (
            <li key={n} className="font-mono text-[11px] uppercase tracking-[0.1em] text-slateink-light">{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
