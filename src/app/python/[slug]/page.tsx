import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Lesson, { type Episode } from "@/components/Lesson";
import { LEVELS } from "@/data/python";

export const dynamicParams = false;
export function generateStaticParams() { return LEVELS.map(l => ({ slug: l.slug })); }

const load = (slug: string): Episode =>
  JSON.parse(fs.readFileSync(path.join(process.cwd(), "src/content/python", `${slug}.json`), "utf8"));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const l = LEVELS.find(x => x.slug === params.slug)!;
  const title = `Python Level ${l.level}: ${l.title} · free interactive lesson`;
  const description = `Learn ${l.title} in Python: a 35-second reel, runnable examples, a quiz and a free cheat sheet. Level ${l.level} of 50 in ParhoAI's free Python for AI/ML course.`;
  return { title, description, openGraph: { url: `/python/${l.slug}`, title, description, images: [`/python/poster/${l.slug}.jpg`] } };
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const i = LEVELS.findIndex(x => x.slug === params.slug);
  const prev = LEVELS[i - 1], next = LEVELS[i + 1];
  return (
    <>
      <section className="relative -mt-[68px] bg-ink pb-10 pt-[110px] text-white">
        <div className="wrap max-w-[760px]">
          <Link href="/python" className="font-mono text-xs uppercase tracking-[0.12em] text-jade-bright hover:text-white">← Python for AI/ML · all 50 levels</Link>
          <h1 className="h1 mt-4 text-white">{LEVELS[i].title}</h1>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-jade-bright" style={{ width: `${(LEVELS[i].level / 50) * 100}%` }} /></div>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-white/45">Level {LEVELS[i].level} of 50 · {LEVELS[i].unit}</p>
        </div>
      </section>
      <section className="py-12 sm:py-16"><div className="wrap">
        <Lesson ep={load(params.slug)} slug={params.slug}
          prev={prev && { slug: prev.slug, title: prev.title }} next={next && { slug: next.slug, title: next.title }} />
      </div></section>
    </>
  );
}
