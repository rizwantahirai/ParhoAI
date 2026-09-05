import Link from "next/link";
import { WA_LINK, WaIcon } from "./WhatsApp";

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-jade-dark py-20 text-white sm:py-24">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(61,212,171,0.22),transparent_70%)]" />
      <div className="wrap relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="h2 max-w-[18ch] text-white">Next cohort starts soon. Places are limited to 25.</h2>
          <p className="lede mt-4 max-w-[48ch] text-white/70">
            Applications take ten minutes. We reply within three working days, either way — or just message us on WhatsApp.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/apply" className="btn-bright">Apply now</Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-ghost-dark"><WaIcon /> Ask on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
