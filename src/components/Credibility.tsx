const FROM = ["VSBLTY", "RootBlock Labs", "HAZEN", "JinnByte", "DocNow EHR", "BRICKandMORTAR.ai"];
const EDU  = ["University of Bradford, UK", "LUMS", "UMT Lahore", "FAST NUCES", "University of the Punjab", "GC University Faisalabad"];

export default function Credibility() {
  return (
    <section className="border-b border-line bg-paper py-14 sm:py-16">
      <div className="wrap">
        <h2 className="text-center font-serif text-2xl font-semibold text-ink sm:text-3xl">
          Studied at university. Proven in industry.
        </h2>
        <p className="mx-auto mt-3 max-w-[60ch] text-center text-slateink">
          Your instructors hold engineering and computer-science degrees, three of them at master&rsquo;s level,
          and ship AI and software for real companies. You learn the theory from people who studied it and the
          practice from people who do it.
        </p>
        <p className="mt-9 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-slateink-light">
          Shipped at
        </p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14">
          {FROM.map(n => (
            <li key={n} className="font-serif text-lg font-semibold text-ink/45 transition-colors hover:text-ink sm:text-xl">{n}</li>
          ))}
        </ul>
        <p className="mt-8 border-t border-line pt-7 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-slateink-light">
          Studied at
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {EDU.map(n => (
            <li key={n} className="font-mono text-[11px] uppercase tracking-[0.1em] text-slateink-light">{n}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
