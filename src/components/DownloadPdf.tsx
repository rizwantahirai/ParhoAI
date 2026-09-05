import { DOWNLOADS, type Download } from "@/data/programs";

function Icon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
    </svg>
  );
}

/** Hero button: the full curriculum PDF for one program. Opens in a new tab so it can be read or saved. */
export function DownloadButton({ slug, dark = true }: { slug: Download["slug"]; dark?: boolean }) {
  const d = DOWNLOADS.find(x => x.slug === slug)!;
  return (
    <a href={d.file} target="_blank" rel="noopener" className={dark ? "btn-ghost-dark" : "btn-ghost"} data-download={d.slug}>
      <Icon />
      <span>Download the outline <span className="opacity-60">· PDF · {d.pages} pages</span></span>
    </a>
  );
}

/** One-line note under a curriculum section. */
export function DownloadNote({ slug, what }: { slug: Download["slug"]; what: string }) {
  const d = DOWNLOADS.find(x => x.slug === slug)!;
  return (
    <p className="mt-8 text-sm text-slateink">
      {what}{" "}
      <a href={d.file} target="_blank" rel="noopener" className="font-semibold text-jade underline underline-offset-2">
        Download the PDF
      </a>{" "}
      <span className="text-slateink-light">({d.pages} pages).</span>
    </p>
  );
}

/** Row of all three PDFs, used on the homepage under the program cards. */
export function DownloadRow() {
  return (
    <div className="mt-10 flex flex-col gap-4 rounded-lg border border-line bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slateink">
        <span className="font-semibold text-ink">Prefer to read it properly?</span> Every session, every project, as a PDF.
      </p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {DOWNLOADS.map(d => (
          <li key={d.slug}>
            <a href={d.file} target="_blank" rel="noopener" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-jade hover:text-jade-dark">
              <Icon className="h-3.5 w-3.5" />{d.label}
              <span className="font-mono text-[11px] font-normal text-slateink-light">{d.pages} pp</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
