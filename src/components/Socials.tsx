import { ACTIVE_SOCIAL } from "@/data/social";

const ICON: Record<string, JSX.Element> = {
  Instagram: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  YouTube:   <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 7.5C3 5.6 4.6 4 6.5 4h11C19.4 4 21 5.6 21 7.5v9c0 1.9-1.6 3.5-3.5 3.5h-11C4.6 20 3 18.4 3 16.5z" opacity=".25"/><path d="M10 8.5v7l6-3.5z"/></svg>,
  Facebook:  <span className="font-bold leading-none">f</span>,
  LinkedIn:  <span className="font-bold leading-none">in</span>,
  TikTok:    <span className="font-bold leading-none">♪</span>,
  X:         <span className="font-bold leading-none">𝕏</span>,
};

/** Pill links to every ParhoAI account that has a URL in src/data/social.ts. Renders nothing until one does. */
export default function Socials({ light = false }: { light?: boolean }) {
  if (!ACTIVE_SOCIAL.length) return null;
  const cls = light
    ? "border-white/20 text-white/80 hover:border-jade-bright hover:text-jade-bright"
    : "border-line-strong text-ink hover:border-jade hover:text-jade";
  return (
    <ul className="flex flex-wrap gap-2.5">
      {ACTIVE_SOCIAL.map(s => (
        <li key={s.name}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`ParhoAI on ${s.name}`}
             className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors ${cls}`}>
            {ICON[s.name]} {s.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
