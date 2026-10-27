import { PRICES, PRICE_NOTE, pkr } from "@/data/pricing";

/** Launch price with the regular price struck through, plus the monthly option where there is one. */
export default function PriceTag({ program, dark = false, note = false }: { program: keyof typeof PRICES; dark?: boolean; note?: boolean }) {
  const p = PRICES[program];
  const off = Math.round((1 - p.launch / p.list) * 100);
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`font-serif text-3xl font-semibold ${dark ? "text-jade-bright" : "text-ink"}`}>{pkr(p.launch)}</span>
        <s className={`text-base ${dark ? "text-white/45" : "text-slateink-faint"}`}>{pkr(p.list)}</s>
        <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] ${dark ? "bg-jade-bright/15 text-jade-bright" : "bg-jade-soft text-jade"}`}>{off}% off</span>
        {p.unit && <span className={`text-sm ${dark ? "text-white/60" : "text-slateink-light"}`}>{p.unit}</span>}
      </div>
      {p.monthly && (
        <p className={`mt-1.5 text-sm ${dark ? "text-white/70" : "text-slateink"}`}>
          or <b>{pkr(p.monthly.amount)}/month</b> for {p.monthly.months} months
        </p>
      )}
      {note && <p className={`mt-1.5 text-xs ${dark ? "text-white/45" : "text-slateink-light"}`}>{PRICE_NOTE}</p>}
    </div>
  );
}
