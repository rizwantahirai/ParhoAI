import Link from "next/link";
import Logo from "./Logo";
import { WA_LINK, WA_DISPLAY, WaIcon } from "./WhatsApp";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Live AI engineering cohorts. Taught in Urdu and English, built in English, assessed on what you ship.
          </p>
        </div>
        <div>
          <h3 className="eyebrow-l">Programs</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/diploma" className="hover:text-jade-bright">Diploma — 8 months</Link></li>
            <li><Link href="/bootcamp" className="hover:text-jade-bright">Bootcamp — 3 months</Link></li>
            <li><Link href="/sprints" className="hover:text-jade-bright">Sprints — 3–5 weeks</Link></li>
            <li><Link href="/instructors" className="hover:text-jade-bright">Instructors</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="eyebrow-l">Get in touch</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li><Link href="/apply" className="hover:text-jade-bright">Apply</Link></li>
            <li>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-jade-bright">
                <WaIcon size={15} /> {WA_DISPLAY}
              </a>
            </li>
            <li><a href="mailto:hello@parhoai.com" className="hover:text-jade-bright">hello@parhoai.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40 sm:flex-row sm:justify-between">
          <span>ParhoAI · parhoai.com</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
