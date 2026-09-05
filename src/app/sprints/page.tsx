import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Sprints — short, focused AI courses for engineers",
  description: "Seven short courses: Production ML, PyTorch, Computer Vision, NLP, RAG, AI Agents and MLOps. Three to five weeks each, one project each.",
  openGraph: { url: "/sprints", title: "Sprints — short, focused AI courses for engineers", description: "Seven short courses: Production ML, PyTorch, Computer Vision, NLP, RAG, AI Agents and MLOps. Three to five weeks each, one project each." },
};

const S = [
  { code:"PML", name:"Production ML", tag:"The gap between a notebook model and one that ships.", s:"6 sessions", h:"9 hrs", w:"3 weeks",
    who:"Engineers who can train a model but have never had one audited, deployed or challenged in review.",
    pre:[["Programming","Python, pandas"],["Machine learning","You have trained and evaluated a supervised model"],["Tools","scikit-learn. No GPU needed"],["Not required","Deep learning"]],
    build:"A model that would survive review — leakage-audited, cost-thresholded, SHAP-explained." },
  { code:"DLP", name:"Deep Learning with PyTorch", tag:"Train networks. Do not just call them.", s:"8 sessions", h:"12 hrs", w:"4 weeks",
    who:"Engineers moving beyond scikit-learn who need to build and debug their own training loops.",
    pre:[["Programming","Python, NumPy"],["Mathematics","Matrices, partial derivatives, chain rule"],["Machine learning","PML sprint or equivalent"],["Hardware","GPU access — Colab free tier is enough"]],
    build:"A trained network with a full experiment log — curves, baseline, one ablation." },
  { code:"CV", name:"Computer Vision", tag:"Detection, tracking and video, on real cameras.", s:"10 sessions", h:"15 hrs", w:"5 weeks",
    who:"Engineers building detection, tracking or video analytics on real footage and edge hardware.",
    pre:[["Programming","Python, PyTorch basics"],["Skills","You can debug a training loop unaided"],["Prior","DLP sprint or equivalent"],["Hardware","GPU access, plus your own footage"]],
    build:"A vision system on live video — custom detector, measured mAP and FPS." },
  { code:"NLP", name:"NLP and Transformers", tag:"Fine-tune models. Do not only prompt them.", s:"7 sessions", h:"10.5 hrs", w:"4 weeks",
    who:"Engineers who need a model tuned to their own domain, language or task.",
    pre:[["Programming","Python, PyTorch basics"],["Skills","Training loops"],["Prior","DLP sprint or equivalent"],["Hardware","GPU access"]],
    build:"A fine-tuned language model with a baseline comparison and error analysis." },
  { code:"RAG", name:"RAG in Production", tag:"Retrieval that actually retrieves the right thing.", s:"7 sessions", h:"10.5 hrs", w:"3 weeks",
    who:"Engineers building question-answering or knowledge systems over documents a business owns.",
    pre:[["Programming","Python, REST APIs, JSON"],["Machine learning","Basic literacy only"],["Accounts","An LLM API key"],["Not required","Deep learning, PyTorch, a GPU"]],
    build:"A RAG system over a real corpus, with citations and a measured retrieval score." },
  { code:"AGT", name:"AI Agents and Tool Use", tag:"Systems that decide and act, with guardrails.", s:"6 sessions", h:"9 hrs", w:"3 weeks",
    who:"Engineers putting tool-using LLM features into products people rely on.",
    pre:[["Programming","Python including async, JSON schemas"],["Skills","API design and error handling"],["Prior","RAG recommended, not required"],["Not required","Deep learning, PyTorch, a GPU"]],
    build:"An agentic application with tool calling, evaluation and a measured cost per query." },
  { code:"OPS", name:"MLOps and LLMOps", tag:"Ship it, run it, and know the moment it breaks.", s:"8 sessions", h:"12 hrs", w:"4 weeks",
    who:"Engineers responsible for models in production, and for the pager when they drift.",
    pre:[["Programming","Python, Git, the command line"],["Assets","A trained model of your own to deploy"],["Accounts","A cloud account, GitHub"],["Not required","Prior Docker or Kubernetes"]],
    build:"A deployed, monitored service with CI/CD, model registry and alerting that fires." },
];

export default function Sprints() {
  return (
    <>
      <PageHead kicker="3–5 weeks · one subject" title="Sprints"
        lede="Short, focused courses for working engineers. Take the one you need, not the eight months around it. Together the seven are the three-month bootcamp."
        meta={[{k:"Sprints",v:"7"},{k:"Hours each",v:"9–15"},{k:"Weeks each",v:"3–5"},{k:"Projects",v:"1 each"}]} />

      <section className="py-20 sm:py-28">
        <div className="wrap">
          <div className="rounded-lg border border-line-strong border-l-[3px] border-l-jade bg-jade-soft p-7">
            <h2 className="eyebrow">What depends on what</h2>
            <pre className="mt-4 overflow-x-auto font-mono text-[13px] leading-[1.9] text-ink">{`PML ──▶ DLP ──┬──▶ CV
              └──▶ NLP

RAG ──▶ AGT      no deep learning needed — start here if you build products
OPS              needs a trained model of your own, from anywhere`}</pre>
          </div>

          <div className="mt-12 space-y-6">
            {S.map(sp => (
              <article key={sp.code} className="overflow-hidden rounded-xl border border-line bg-white">
                <div className="flex flex-col gap-3 border-b-2 border-jade px-6 py-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7">
                  <span className="font-serif text-3xl font-bold leading-none text-jade sm:w-20">{sp.code}</span>
                  <div className="flex-1">
                    <h3 className="h3">{sp.name}</h3>
                    <p className="mt-1 font-serif text-[15px] italic text-slateink">{sp.tag}</p>
                  </div>
                  <div className="flex gap-4 font-mono text-xs uppercase tracking-[0.08em] text-slateink-light sm:flex-col sm:gap-1 sm:text-right">
                    <span>{sp.s}</span><span>{sp.h}</span><span>{sp.w}</span>
                  </div>
                </div>
                <div className="grid gap-6 px-6 py-6 sm:px-7 lg:grid-cols-2">
                  <div>
                    <h4 className="eyebrow">Who it is for</h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-slateink">{sp.who}</p>
                  </div>
                  <div>
                    <h4 className="eyebrow">Prerequisites</h4>
                    <dl className="mt-2 space-y-1.5">
                      {sp.pre.map(([k, v]) => (
                        <div key={k} className="flex gap-3">
                          <dt className="w-28 shrink-0 text-[13px] font-bold text-jade-dark">{k}</dt>
                          <dd className="text-sm leading-relaxed text-slateink">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
                <p className="flex flex-col gap-3 border-t border-line bg-paper-100 px-6 py-4 sm:flex-row sm:items-center sm:px-7">
                  <span className="self-start rounded-sm bg-jade px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white">Build</span>
                  <span className="font-serif text-[15px] font-medium">{sp.build}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
