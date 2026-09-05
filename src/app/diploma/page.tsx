import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import ModuleList, { Mod } from "@/components/ModuleList";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Applied AI Engineering Diploma — 8 months from zero",
  description: "An eight-month, 140-session diploma taking you from no computer science background to a shipping AI engineer. Live cohorts in Urdu and English, nine projects and a deployed capstone.",
  openGraph: { url: "/diploma", title: "Applied AI Engineering Diploma — 8 months from zero", description: "An eight-month, 140-session diploma taking you from no computer science background to a shipping AI engineer. Live cohorts in Urdu and English, nine projects and a deployed capstone." },
};

const MODS: Mod[] = [
  { n: "01", title: "Foundations", sub: "The computer stops being a mystery box.", sessions: "14 sessions",
    topics: ["Linux & the shell","Git & GitHub","Python fundamentals","Documentation"], project: "A command-line tool" },
  { n: "02", title: "Engineering", sub: "Stop writing scripts. Start writing software.", sessions: "16 sessions",
    topics: ["Collections","OOP","pytest & TDD","Type hints","Big-O & data structures"], project: "A tested, installable package" },
  { n: "03", title: "Data and the internet", sub: "Get data from anywhere to anywhere.", sessions: "16 sessions",
    topics: ["HTTP & networking","REST APIs","FastAPI","SQL & Postgres","NumPy & pandas"], project: "A pipeline that runs unattended" },
  { n: "04", title: "Machine learning", sub: "The classical toolkit still wins most real problems.", sessions: "16 sessions",
    topics: ["Math for ML","scikit-learn","Gradient boosting","Evaluation","Data leakage"], project: "End-to-end machine learning" },
  { n: "05", title: "Deep learning", sub: "Neural networks, without the magic.", sessions: "12 sessions",
    topics: ["PyTorch","Training loops","Optimizers","Regularization","Debugging runs"], project: "A trained network, from scratch" },
  { n: "06", title: "Computer Vision", sub: "Detection, video, and the edge.", sessions: "16 sessions",
    topics: ["OpenCV","CNNs","Transfer learning","YOLO","Tracking & RTSP","Edge deployment"], project: "A vision system on live video" },
  { n: "07", title: "NLP and Transformers", sub: "Text, embeddings, fine-tuning.", sessions: "12 sessions",
    topics: ["Tokenization","Attention","Hugging Face","LoRA","Urdu & multilingual"], project: "A fine-tuned language model" },
  { n: "08", title: "Agentic AI and LLMs", sub: "RAG, tools, agents, guardrails.", sessions: "16 sessions",
    topics: ["Prompting","Structured output","Vector stores","RAG","Tool calling","Agents","Guardrails"], project: "An agentic application" },
  { n: "09", title: "DevOps and MLOps", sub: "Ship it, run it, and know when it breaks.", sessions: "12 sessions",
    topics: ["Docker","CI/CD","Cloud & IAM","MLflow","Model registry","Monitoring & drift"], project: "A deployed, monitored service" },
  { n: "10", title: "LLMOps and capstone", sub: "Running systems that are not deterministic.", sessions: "10 sessions",
    topics: ["Tracing","Prompt versioning","Online eval","Caching & routing","vLLM","Compliance"], project: "Capstone — deployed, documented, defended" },
];

export default function Diploma() {
  return (
    <>
      <PageHead kicker="8 months · start from zero" title="Applied AI Engineering Diploma"
        lede="No computer science background required. One hundred and forty sessions from the terminal to a deployed agentic system, with nine projects and a capstone along the way."
        meta={[{k:"Duration",v:"8 months"},{k:"Sessions",v:"140"},{k:"Contact hours",v:"210"},{k:"Modules",v:"10"},{k:"Projects",v:"9 + 1"}]} />

      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-8 lg:grid-cols-3">
          {[
            { h: "Who this is for", b: "Anyone who can use a computer and read English technical text. No prior coding. Module 1 starts at the terminal." },
            { h: "What it takes", b: "Four sessions a week, ninety minutes each, plus six to eight hours of self-study. The self-study is not optional and we say so before you enrol." },
            { h: "What you leave with", b: "Nine projects and a deployed capstone, all public and all defensible in an interview." },
          ].map(c => (
            <div key={c.h} className="border-l-2 border-jade pl-5">
              <h2 className="eyebrow">{c.h}</h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-slateink">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <div className="wrap">
          <p className="eyebrow">The curriculum</p>
          <h2 className="h2 mt-3 max-w-[22ch]">Ten modules. Each one ends in something you shipped.</h2>
          <ModuleList mods={MODS} />
          <p className="mt-8 text-sm text-slateink">
            Full session-by-session outline, all 140 sessions, is available as a PDF —{" "}
            <Link href="/apply" className="font-semibold text-jade underline underline-offset-2">request it with your application</Link>.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
