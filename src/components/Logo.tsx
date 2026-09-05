export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`font-serif text-[22px] font-bold tracking-[-0.02em] ${light ? "text-white" : "text-ink"}`}>
      Parho<span className={light ? "text-jade-bright" : "text-jade"}>AI</span>
    </span>
  );
}
