import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import PythonLevels from "@/components/PythonLevels";
import CtaBand from "@/components/CtaBand";
import Socials from "@/components/Socials";

const title = "Free Python for AI/ML: 50 levels, one concept a day";
const description = "Learn Python from zero in 50 short reels: one concept a day, with a pause-and-predict quiz and a free cheat sheet for every level.";

export const metadata: Metadata = {
  title, description,
  openGraph: { url: "/python", title, description },
};

export default function Python() {
  return (
    <>
      <PageHead kicker="Free · one concept a day" title="Python for AI/ML"
        lede="Fifty interactive lessons take you from your first print() to classes and generators. Each one is a 35-second reel, code you can run, a quiz, and a cheat sheet to keep. All free, all open now."
        meta={[{ k: "Levels", v: "50" }, { k: "Per level", v: "~35 s" }, { k: "Units", v: "6" }, { k: "Cost", v: "Free" }]}
        actions={<>
          <a href="#levels" className="btn-bright">See all 50 levels</a>
          <Link href="/diploma" className="btn border border-white/25 text-white hover:border-white">Go further: the diploma</Link>
        </>} />

      <section id="levels" className="py-16 sm:py-24">
        <div className="wrap max-w-[860px]">
          <div className="rounded-lg border border-line-strong border-l-[3px] border-l-jade bg-jade-soft p-6">
            <h2 className="eyebrow">How it works</h2>
            <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-ink">
              <li><b>Watch</b> the 35-second reel for each level.</li>
              <li><b>Run the code</b> and <b>take the quiz</b> right on the page.</li>
              <li><b>Keep the cheat sheet</b>, and tick the level off. Your progress is saved in this browser.</li>
            </ul>
            <div className="mt-5"><Socials /></div>
          </div>
          <div className="mt-10"><PythonLevels /></div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
