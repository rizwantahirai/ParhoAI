export type Program = {
  slug: string; kicker: string; name: string; tagline: string;
  duration: string; sessions: string; hours: string; audience: string;
  bullets: string[]; cta: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "diploma", kicker: "Start from zero", name: "Applied AI Engineering Diploma",
    tagline: "No computer science background required. Eight months to a shipping engineer.",
    duration: "8 months", sessions: "140 sessions", hours: "210 contact hours",
    audience: "Anyone who can use a computer and read English technical text.",
    bullets: [
      "Starts at the terminal — Linux, Git and Python from nothing",
      "Ten modules through ML, computer vision, NLP, agents and MLOps",
      "Nine projects and a deployed capstone, all public on GitHub",
      "Progression gates so nobody is carried into a module they cannot survive",
    ],
    cta: "See the full curriculum",
  },
  {
    slug: "bootcamp", kicker: "Already code", name: "AI Engineering Bootcamp",
    tagline: "Three months from your first production model to a deployed agentic system.",
    duration: "3 months", sessions: "52 sessions", hours: "78 contact hours",
    audience: "Working engineers who can already program and have trained a model.",
    bullets: [
      "Assumes Python, Git, SQL and basic ML — none of it is retaught",
      "Six modules, each opening with what it will not teach you",
      "Five projects and a capstone, evaluated the way a business would",
      "Entry is assessed: a take-home and a short call before a place is confirmed",
    ],
    cta: "See the bootcamp",
  },
  {
    slug: "sprints", kicker: "One subject", name: "Sprints",
    tagline: "Short, focused courses. Take the one you need, not the eight months around it.",
    duration: "3–5 weeks", sessions: "6–10 sessions", hours: "9–15 hours",
    audience: "Engineers who need one capability, quickly, to production standard.",
    bullets: [
      "Seven sprints — Production ML, PyTorch, CV, NLP, RAG, Agents, MLOps",
      "RAG and Agents need no deep learning at all",
      "One project per sprint, on your GitHub",
      "Credit transfers — finish all seven and you have done the bootcamp",
    ],
    cta: "Browse the sprints",
  },
];

export const SPRINTS = [
  { code: "PML", name: "Production ML", weeks: "3 weeks", h: "9 hrs", need: "Python · pandas · basic ML" },
  { code: "DLP", name: "Deep Learning with PyTorch", weeks: "4 weeks", h: "12 hrs", need: "Python · NumPy · linear algebra" },
  { code: "CV",  name: "Computer Vision", weeks: "5 weeks", h: "15 hrs", need: "PyTorch basics · GPU access" },
  { code: "NLP", name: "NLP and Transformers", weeks: "4 weeks", h: "10.5 hrs", need: "PyTorch basics · GPU access" },
  { code: "RAG", name: "RAG in Production", weeks: "3 weeks", h: "10.5 hrs", need: "Python · REST APIs · no DL needed" },
  { code: "AGT", name: "AI Agents and Tool Use", weeks: "3 weeks", h: "9 hrs", need: "Python · async · no DL needed" },
  { code: "OPS", name: "MLOps and LLMOps", weeks: "4 weeks", h: "12 hrs", need: "Git · CLI · a model to deploy" },
];

export const BUILDS = [
  { t: "A vision system on live video", d: "Collect and label your own data, train a detector, run it on an RTSP stream. Measured mAP and FPS.", tag: "Computer Vision" },
  { t: "An agentic application", d: "RAG over a real corpus, tool calling, guardrails, and a measured cost per query.", tag: "Agentic AI" },
  { t: "A fine-tuned language model", d: "LoRA on your own data, including Urdu and bilingual text, with a baseline and error analysis.", tag: "NLP" },
  { t: "A deployed, monitored service", d: "Dockerised, CI/CD, model registry, drift alerts that actually fire.", tag: "MLOps" },
  { t: "A model that survives review", d: "Leakage-audited, cost-based threshold, SHAP explanations, limitations stated in writing.", tag: "Production ML" },
  { t: "A pipeline that runs unattended", d: "Ingest, clean, store, serve and chart — on a schedule, surviving failure.", tag: "Data" },
];

export const FAQS = [
  { q: "Do I need a computer science degree?", a: "No. The eight-month diploma starts at the terminal and assumes nothing. The three-month bootcamp does assume you already program — entry is assessed, and if you are not there yet we will tell you and point you at the diploma." },
  { q: "What language are classes taught in?", a: "Urdu and English, mixed the way engineers in Pakistan actually work. Explanation and discussion happen in whichever makes the idea land fastest. All material, code, documentation and assignments are in English, because that is the language the job is in — and every technical term is taught in English from day one." },
  { q: "How much time does this take outside class?", a: "Six to eight hours a week for the diploma, eight to ten for the bootcamp. This is not optional. A student who does only the contact hours will finish the course and struggle in interviews — we say this before you enrol, not after." },
  { q: "Do I need a GPU?", a: "Not to start. Colab's free tier covers most of the teaching. The computer vision and fine-tuning modules need more, and we tell you exactly what to budget before those modules begin." },
  { q: "Do you guarantee a job?", a: "No, and be careful with anyone who does. What we guarantee is a portfolio of deployed, documented projects you can defend in an interview, plus interview practice in the final module." },
  { q: "Is there a certificate?", a: "Yes, but the portfolio is the qualification. Nobody has ever been hired on the strength of a certificate from a company they had not heard of." },
];

export type Instructor = {
  slug: string; name: string; role: string; teaches: string[];
  exp: string; prev: string; edu: string; bio: string;
  linkedin?: string; photoPending?: boolean;
};

export const INSTRUCTORS: Instructor[] = [
  {
    slug: "rizwan-tahir", name: "Rizwan Tahir", role: "Founder · Machine Learning",
    teaches: ["Machine learning", "Agentic AI", "MLOps"],
    exp: "6 years · ML & Data Science", prev: "VSBLTY · RootBlock Labs",
    edu: "University of Bradford, UK",
    bio: "Runs the machine-learning side — data pipelines, agentic AI and MLOps. Six years building and shipping computer-vision products at companies selling into that market.",
    linkedin: "https://www.linkedin.com/in/rizwanxfd/",
  },
  {
    slug: "hasnain-amjad", name: "Hasnain Amjad", role: "Co-founder · Computer Vision",
    teaches: ["Deep learning", "Computer vision"],
    exp: "9 years · Computer Vision & AI", prev: "HAZEN · RootBlock Labs · VSBLTY",
    edu: "University of Bradford, UK",
    bio: "Nine years building computer-vision and AI systems in production. Teaches the detection, tracking and edge-deployment modules — the parts most courses skip.",
    photoPending: true,
  },
  {
    slug: "talha", name: "Talha", role: "Co-founder · Engineering",
    teaches: ["Software engineering", "Delivery"],
    exp: "7.5 years · Software engineering",
    prev: "BRICKandMORTAR.ai · Digital Division Pakistan · ZEREFLAB",
    edu: "GC University Faisalabad",
    bio: "Seven and a half years building and shipping software. Teaches the engineering discipline — structure, testing and code review — that separates a script from a system.",
    linkedin: "https://www.linkedin.com/in/mtikram0/", photoPending: true,
  },
  {
    slug: "hammad-hassan", name: "Hammad Hassan", role: "Integration & DevOps",
    teaches: ["DevOps", "MLOps", "Deployment"],
    exp: "9 years · Software engineering", prev: "JinnByte · FrizHub",
    edu: "MS Computer Science, FAST NUCES",
    bio: "Nine years in production software. Teaches Docker, CI/CD, serving and monitoring — how a model stops being a notebook and starts being a service someone depends on.",
    linkedin: "https://www.linkedin.com/in/hammad-hassan-501/",
  },
  {
    slug: "usama-ikram", name: "Usama Ikram", role: "Full-Stack & Platform",
    teaches: ["Web platform", "APIs", "LLM integration"],
    exp: "2 years · Full-stack engineering", prev: "DocNow EHR",
    edu: "BS Software Engineering, University of the Punjab",
    bio: "Builds the web and app platform. Teaches the FastAPI, interface and integration sessions — how a model reaches an actual user.",
    linkedin: "https://www.linkedin.com/in/usamaikram19/", photoPending: true,
  },
];
