import type { Metadata } from "next";
import InstructorCarousel from "@/components/InstructorCarousel";
import PageHead from "@/components/PageHead";
import CtaBand from "@/components/CtaBand";
import { INSTRUCTORS } from "@/data/programs";

export const metadata: Metadata = {
  title: "Instructors",
  description: "The engineers who teach at ParhoAI — thirty-three years of shipped computer vision, machine learning and production systems between them.",
};

export default function Instructors() {
  return (
    <>
      <PageHead kicker="Who teaches" title="Instructors"
        lede="Practising engineers, not career trainers. Thirty-three years between them of computer vision, machine learning and production systems that other people depend on."
        meta={[{k:"Instructors",v:"5"},{k:"Years combined",v:"33+"},{k:"Cohort size",v:"25 max"}]} />

      <section className="py-20 sm:py-28">
        <div className="wrap">
          <p className="lede max-w-[64ch]">
            Everyone who teaches here builds computer-vision and AI systems for a living.
            The curriculum is the work, taught by people still doing it — which is why there
            are modules on tracking, RTSP streams and drift monitoring at all. Those are the
            things that break in production, and you only learn them by having them break on you.
          </p>

          <div className="mt-14">
            <InstructorCarousel people={INSTRUCTORS} />
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
