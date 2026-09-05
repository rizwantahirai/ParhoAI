const POINTS = [
  { n: "01", t: "Projects, not playlists",
    d: "Every module ends in something deployed and public. Nine of them by the end of the diploma. The portfolio is the qualification — the certificate is a formality." },
  { n: "02", t: "Real data, mess included",
    d: "No Titanic. No Iris. Datasets with missing values, leakage traps and lies in them, because that is what you will be handed on day one of a job." },
  { n: "03", t: "We publish what we do not teach",
    d: "Backpropagation derivations, foundation models from scratch, Kubernetes. A course that claims everything teaches nothing." },
  { n: "04", t: "Entry is assessed, honestly",
    d: "If you are not ready for the bootcamp we say so and point you at the diploma. Carrying an unprepared student hurts them and slows the cohort." },
];

export default function Difference() {
  return (
    <section className="sect border-y border-line bg-paper-100">
      <div className="wrap">
        <p className="eyebrow">Why this is different</p>
        <h2 className="h2 mt-4 max-w-[20ch] text-ink">Most AI courses teach you to follow along.</h2>
        <p className="lede mt-5 max-w-[58ch]">
          You finish, you have watched forty hours, and you still cannot start a project from
          an empty folder. We built this the other way around.
        </p>
        <div className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {POINTS.map(p => (
            <div key={p.n} className="border-t-2 border-jade pt-6">
              <span className="font-mono text-xs font-bold tracking-[0.14em] text-jade">{p.n}</span>
              <h3 className="h3 mt-3">{p.t}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-slateink">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
