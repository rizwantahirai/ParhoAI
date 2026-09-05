import Link from "next/link";
import { SPRINTS } from "@/data/programs";

export default function SprintStrip() {
  return (
    <section className="sect border-y border-line bg-paper">
      <div className="wrap">
        <p className="eyebrow">Sprints</p>
        <h2 className="h2 mt-4 max-w-[20ch]">Need one thing, not eight months?</h2>
        <p className="lede mt-5 max-w-[56ch]">
          Seven short courses, three to five weeks each, one project each. Together they are
          the three-month bootcamp.
        </p>

        <div className="mt-14 overflow-hidden rounded-xl border border-line bg-white">
          {SPRINTS.map((s, i) => (
            <Link key={s.code} href="/sprints"
              className={`group flex flex-col gap-1 px-5 py-5 transition-colors hover:bg-jade-soft sm:flex-row sm:items-center sm:gap-6 sm:px-7 ${i ? "border-t border-line" : ""}`}>
              <span className="w-14 shrink-0 font-mono text-sm font-bold text-jade">{s.code}</span>
              <span className="flex-1 font-serif text-lg font-semibold group-hover:text-jade-dark">{s.name}</span>
              <span className="font-mono text-xs text-slateink-light sm:w-20">{s.weeks}</span>
              <span className="font-mono text-xs text-slateink-light sm:w-20">{s.h}</span>
              <span className="text-sm text-slateink sm:w-72">{s.need}</span>
            </Link>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[58ch] text-[15px] text-slateink">
            <span className="font-semibold text-ink">RAG and Agents need no deep learning at all.</span>{" "}
            If you build products rather than models, start there.
          </p>
          <Link href="/sprints" className="btn-ghost shrink-0">All seven sprints</Link>
        </div>
      </div>
    </section>
  );
}
