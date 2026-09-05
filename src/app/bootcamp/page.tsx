import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import ModuleList, { Mod } from "@/components/ModuleList";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "AI Engineering Bootcamp — 3 months for working engineers",
  description: "A three-month, 52-session conversion course for engineers who already program. Production ML, deep learning, computer vision, NLP, agentic AI and MLOps.",
  openGraph: { url: "/bootcamp", title: "AI Engineering Bootcamp — 3 months for working engineers", description: "A three-month, 52-session conversion course for engineers who already program. Production ML, deep learning, computer vision, NLP, agentic AI and MLOps." },
};

const MODS: Mod[] = [
  { n: "01", title: "Production-grade ML", sub: "You know how to train a model. This is what separates one that ships.", sessions: "6 sessions",
    topics: ["Cost-based thresholds","Calibration","Leakage audits","Nested CV","Optuna","SHAP"], project: "A model that would survive review" },
  { n: "02", title: "Deep learning", sub: "Neural networks, without the magic.", sessions: "8 sessions",
    topics: ["PyTorch","Training loops","Optimizers & schedules","Mixed precision","Debugging runs"], project: "A trained network, from scratch" },
  { n: "03", title: "Computer Vision", sub: "Detection, video, and the edge.", sessions: "10 sessions",
    topics: ["OpenCV","CNNs","Transfer learning","YOLO","Segmentation","Tracking","ONNX & TensorRT"], project: "A vision system on live video" },
  { n: "04", title: "NLP and Transformers", sub: "Text, embeddings, fine-tuning.", sessions: "7 sessions",
    topics: ["Tokenization","Attention","Hugging Face","Fine-tuning","LoRA & QLoRA"], project: "A fine-tuned language model" },
  { n: "05", title: "Agentic AI and LLMs", sub: "RAG, tools, agents, guardrails.", sessions: "12 sessions",
    topics: ["Prompting","Structured output","Vector stores","RAG ×3","LLM evaluation","Tool calling","Agents","Prompt injection"], project: "An agentic application" },
  { n: "06", title: "Production and capstone", sub: "MLOps, LLMOps, and shipping the thing.", sessions: "9 sessions",
    topics: ["Docker","Serving","CI/CD","Model registry","Drift","LLMOps tracing","Caching & routing"], project: "Capstone — deployed, documented, defended" },
];

const PRE = [
  ["Programming","Python at working level — functions, classes, virtual environments, packaging."],
  ["Tooling","Git and GitHub: branches, merges, pull requests. Comfortable in a terminal."],
  ["Data","SQL joins and aggregates. pandas for loading, cleaning and reshaping."],
  ["Web","HTTP verbs and status codes, REST, JSON. You have called and ideally built an API."],
  ["ML fundamentals","Train/test split, overfitting, a confusion matrix. You have trained at least one scikit-learn model."],
  ["Experience","You have built and maintained something real. This assumes engineering judgement, not just syntax."],
];

export default function Bootcamp() {
  return (
    <>
      <PageHead kicker="3 months · you already code" title="AI Engineering Bootcamp"
        lede="A conversion course, not an introduction. Fifty-two sessions from your first production-grade model to a deployed agentic system."
        meta={[{k:"Duration",v:"3 months"},{k:"Sessions",v:"52"},{k:"Contact hours",v:"78"},{k:"Modules",v:"6"},{k:"Projects",v:"5 + 1"}]} />

      <section className="py-20 sm:py-28">
        <div className="wrap">
          <div className="rounded-lg border border-line-strong border-l-[3px] border-l-jade bg-jade-soft p-7 sm:p-9">
            <h2 className="eyebrow">Prerequisites — this course does not teach these</h2>
            <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2">
              {PRE.map(([k, v]) => (
                <div key={k} className="sm:flex sm:gap-4">
                  <dt className="font-serif text-lg font-semibold sm:w-36 sm:shrink-0">{k}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-slateink sm:mt-0">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 border-t border-line pt-5 text-[15px] leading-relaxed text-slateink">
              <span className="font-semibold text-ink">Entry is assessed.</span>{" "}
              A short take-home and a fifteen-minute call before a place is confirmed. Admitting
              someone who does not meet the bar wastes their money and slows the cohort — if you
              are not there yet, the eight-month diploma is the right route.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-20 sm:py-28">
        <div className="wrap">
          <p className="eyebrow">The curriculum</p>
          <h2 className="h2 mt-3 max-w-[24ch]">Six modules. Each opens with what it will not teach you.</h2>
          <ModuleList mods={MODS} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
