"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isDone, setDone } from "@/lib/progress";

/* An interactive lesson built from the same episode.json that drives the reel. */

type Scene = { type: string; file?: string; code?: string[]; out?: string | string[]; err?: boolean;
  options?: string[]; answer?: number; cards?: { emoji?: string; code: string; label?: string }[]; title?: string };
type Line = { who?: "student" | "teacher"; say?: string; cap?: string; pause?: number; scene?: Scene; with?: Partial<Scene> & { phase?: string } };
export type Episode = { level: number; of: number; title: string; next: string; cover: { emoji: string; sub: string }; lines: Line[] };

type Block =
  | { kind: "say"; who: "student" | "teacher"; text: string }
  | { kind: "code"; file: string; code: string[]; out: string[] | null; err?: boolean }
  | { kind: "cards"; title?: string; cards: NonNullable<Scene["cards"]> }
  | { kind: "quiz"; file: string; code: string[]; options: string[]; answer: number; why: string };

const asLines = (o: Scene["out"]) => (o === undefined || o === null ? null : Array.isArray(o) ? o : String(o).split("\n"));

function toBlocks(ep: Episode): Block[] {
  const blocks: Block[] = [];
  let scene: Scene | null = null;
  ep.lines.forEach((l) => {
    if (l.scene) scene = { ...l.scene };
    else if (scene && l.with) scene = { ...scene, ...l.with };
    if (!scene || l.pause) return;
    const t = scene.type;
    if (l.scene && t === "code") blocks.push({ kind: "code", file: scene.file || "main.py", code: scene.code || [], out: asLines(scene.out), err: scene.err });
    if (l.scene && t === "cards") blocks.push({ kind: "cards", title: scene.title, cards: scene.cards || [] });
    if (l.scene && t === "quiz") {
      const why = ep.lines.find((x) => x.with?.phase === "reveal");
      blocks.push({ kind: "quiz", file: scene.file || "quiz.py", code: scene.code || [], options: scene.options || [], answer: scene.answer ?? 0, why: why?.cap || why?.say || "" });
      return; // the quiz block asks the question itself
    }
    if (t === "level" || t === "cta" || t === "quiz") return; // spoken lines that only make sense in the video
    if (l.who) blocks.push({ kind: "say", who: l.who, text: l.cap || l.say || "" });
  });
  return blocks;
}

/* tiny Python highlighter */
const KW = /^(if|elif|else|for|while|in|and|or|not|def|return|import|from|as|try|except|finally|with|class|break|continue|pass|True|False|None|lambda|is|yield|raise|global)$/;
const BI = /^(print|input|int|float|str|bool|len|range|type|list|dict|set|tuple|sum|max|min|sorted|open|round|abs|enumerate|zip|map|filter|next)$/;
function Code({ line }: { line: string }) {
  const parts: JSX.Element[] = [];
  const hash = line.indexOf("#"), q = (line.slice(0, Math.max(0, hash)).match(/["']/g) || []).length;
  const body = hash >= 0 && q % 2 === 0 ? line.slice(0, hash) : line, comment = body === line ? "" : line.slice(hash);
  const re = /(f?"[^"]*"?|f?'[^']*'?)|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)|([^A-Za-z_\d"']+)/g;
  let m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(body))) {
    const [tok, s, n, id] = m;
    const c = s ? "text-[#FFC857]" : n ? "text-[#FF9F6B]" : id ? (KW.test(id) ? "text-jade-bright" : BI.test(id) ? "text-[#8FD3FF]" : "") : "text-white/70";
    parts.push(<span key={k++} className={c}>{tok}</span>);
  }
  if (comment) parts.push(<span key={k++} className="text-white/40">{comment}</span>);
  return <>{parts}{"\n"}</>;
}

function CodeCell({ b }: { b: Extract<Block, { kind: "code" }> }) {
  const [ran, setRan] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-ink-700 bg-ink">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="flex gap-1.5">{["#FF6B6B", "#FFC857", "#3DD4AB"].map((c) => <i key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}</span>
        <span className="font-mono text-xs text-white/50">{b.file}</span>
        {b.out ? (
          <button onClick={() => setRan(true)} className="rounded-md bg-jade-bright px-3 py-1 font-mono text-xs font-bold text-ink hover:bg-white">▶ Run</button>
        ) : <span className="w-12" />}
      </div>
      <pre className="overflow-x-auto px-5 py-4 [font-variant-ligatures:none] font-mono text-[15px] leading-relaxed text-white">{b.code.map((l, i) => <Code key={i} line={l} />)}</pre>
      {b.out && ran && (
        <div className={`border-t border-white/10 px-5 py-3 font-mono text-[15px] ${b.err ? "text-[#FF6B6B]" : "text-white"} animate-[rise_.3s_ease-out]`}>
          {b.out.map((o, i) => <div key={i}><span className="text-white/35">&gt; </span>{o}</div>)}
        </div>
      )}
    </div>
  );
}

function QuizCell({ b, onRight }: { b: Extract<Block, { kind: "quiz" }>; onRight: () => void }) {
  const [pick, setPick] = useState<number | null>(null);
  const right = pick === b.answer;
  return (
    <div className="rounded-2xl border-2 border-[#FFC857] bg-[#FFF8E6] p-5 sm:p-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#8a6400]">⏸ Pause &amp; predict: what prints?</p>
      <div className="mt-4 overflow-hidden rounded-xl bg-ink">
        <pre className="overflow-x-auto px-5 py-4 [font-variant-ligatures:none] font-mono text-[15px] leading-relaxed text-white">{b.code.map((l, i) => <Code key={i} line={l} />)}</pre>
      </div>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
        {b.options.map((o, i) => {
          const state = pick === null ? "" : i === b.answer ? "border-jade bg-jade-soft" : i === pick ? "border-[#FF6B6B] bg-[#FFECEC]" : "opacity-50";
          return (
            <button key={i} disabled={pick !== null} onClick={() => { setPick(i); if (i === b.answer) onRight(); }}
              className={`flex items-center gap-3 rounded-lg border-2 border-line-strong bg-white px-4 py-3 text-left font-mono text-[15px] transition ${state} ${pick === null ? "hover:border-jade" : ""}`}>
              <b className="font-sans">{"ABC"[i]}</b> {o}
              {pick !== null && i === b.answer && <span className="ml-auto">✓</span>}
              {pick === i && i !== b.answer && <span className="ml-auto">✗</span>}
            </button>
          );
        })}
      </div>
      {pick !== null && (
        <p className="mt-4 text-[15px] leading-relaxed text-ink">
          <b>{right ? "🎉 Correct!" : `Not quite — it's ${"ABC"[b.answer]}.`}</b> {b.why.replace(/^Yes!\s*/, "")}
        </p>
      )}
    </div>
  );
}

export default function Lesson({ ep, slug, prev, next }: { ep: Episode; slug: string; prev?: { slug: string; title: string }; next?: { slug: string; title: string } }) {
  const blocks = useMemo(() => toBlocks(ep), [ep]);
  const [done, setDoneState] = useState(false);
  useEffect(() => setDoneState(isDone(slug)), [slug]);
  const complete = () => { setDone(slug, true); setDoneState(true); };

  return (
    <div className="mx-auto max-w-[760px]">
      <div className="grid gap-8 md:grid-cols-[300px_1fr] md:items-start">
        <video src={`/python/video/${slug}.mp4`} poster={`/python/poster/${slug}.jpg`} controls playsInline preload="none"
          className="mx-auto w-full max-w-[300px] rounded-2xl border border-line bg-ink shadow-sm" />
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-jade">Level {ep.level} of {ep.of}</p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-ink">{ep.title}</h2>
          <p className="mt-2 text-slateink">{ep.cover.sub}. Watch the reel, then work through it below: run the code, take the quiz, keep the cheat sheet.</p>
          <a href={`/python/notes/${slug}.jpg`} target="_blank" rel="noopener" className="mt-5 inline-flex rounded-lg border border-jade px-4 py-2 text-sm font-semibold text-jade hover:bg-jade hover:text-white">📒 Open the cheat sheet</a>
        </div>
      </div>

      <div className="mt-12 space-y-4">
        {blocks.map((b, i) =>
          b.kind === "say" ? (
            <div key={i} className={`flex ${b.who === "student" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[16px] leading-relaxed ${b.who === "student" ? "rounded-tl-sm bg-[#FFE8EC] text-ink" : "rounded-tr-sm bg-jade-soft text-ink"}`}>
                <span className={`mb-0.5 block font-mono text-[11px] font-bold uppercase tracking-[0.1em] ${b.who === "student" ? "text-[#C2185B]" : "text-jade"}`}>{b.who === "student" ? "Sana" : "Teacher"}</span>
                {b.text}
              </div>
            </div>
          ) : b.kind === "code" ? <CodeCell key={i} b={b} />
          : b.kind === "cards" ? (
            <div key={i} className="grid grid-cols-2 gap-3">
              {b.cards.map((c, k) => (
                <div key={k} className="rounded-xl border border-line bg-white p-4 text-center">
                  <div className="text-3xl">{c.emoji}</div>
                  <div className="mt-1 font-mono font-bold text-jade">{c.code}</div>
                  <div className="text-sm text-slateink-light">{c.label}</div>
                </div>
              ))}
            </div>
          ) : <QuizCell key={i} b={b} onRight={complete} />
        )}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
        {done ? <span className="rounded-lg bg-jade-soft px-4 py-2.5 font-semibold text-jade">✓ Level {ep.level} complete</span>
              : <button onClick={complete} className="btn-primary">Mark level {ep.level} complete</button>}
        {next && <Link href={`/python/${next.slug}`} className="btn border border-line-strong text-ink hover:border-jade">Next: {next.title} →</Link>}
        {prev && <Link href={`/python/${prev.slug}`} className="text-sm text-slateink hover:text-jade">← {prev.title}</Link>}
      </div>

      <div className="mt-12 rounded-2xl bg-ink p-7 text-white">
        <p className="eyebrow-l">Where this leads</p>
        <h3 className="mt-3 font-serif text-2xl font-semibold">Python is step one. Building AI that ships is the rest.</h3>
        <p className="mt-3 text-white/70">The diploma takes you from zero to deployed computer vision, LLM and agent projects, with engineers who build them for a living. Already code? The bootcamp does it in three months.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/diploma" className="btn-bright">See the diploma</Link>
          <Link href="/bootcamp" className="btn border border-white/25 text-white hover:border-white">See the bootcamp</Link>
          <Link href="/apply" className="btn border border-white/25 text-white hover:border-white">Apply</Link>
        </div>
      </div>
    </div>
  );
}
