"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  { href: "/diploma",  label: "Diploma",  meta: "8 months · from zero" },
  { href: "/bootcamp", label: "Bootcamp", meta: "3 months · engineers" },
  { href: "/sprints",  label: "Sprints",  meta: "3–5 weeks · one subject" },
  { href: "/instructors", label: "Instructors", meta: "Who teaches, and what they ship" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const path = usePathname();

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-200 ${solid || open ? "border-b border-line bg-paper/95 backdrop-blur" : "bg-transparent"}`}>
      <nav className="wrap flex h-[68px] items-center gap-6" aria-label="Main">
        <Link href="/" className="shrink-0"><Logo light={!solid && !open} /></Link>

        <div className="ml-2 hidden items-center gap-7 md:flex">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className={`text-[15px] transition-colors ${solid
                ? (path === l.href ? "font-semibold text-ink hover:text-jade" : "text-slateink hover:text-jade")
                : (path === l.href ? "font-semibold text-white hover:text-jade-bright" : "text-white/70 hover:text-jade-bright")}`}>
              {l.label}
            </Link>
          ))}
          <Link href="/#faq" className={`text-[15px] transition-colors ${solid ? "text-slateink hover:text-jade" : "text-white/70 hover:text-jade-bright"}`}>FAQ</Link>
        </div>

        <Link href="/apply" className={`ml-auto hidden md:inline-flex ${solid ? "btn-primary" : "btn-bright"}`}>Apply</Link>

        <button onClick={() => setOpen(v => !v)} aria-expanded={open} aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className={`ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md border md:hidden ${solid || open ? "border-line-strong" : "border-white/30"}`}>
          <span className="relative block h-[14px] w-[20px]">
            <span className={`absolute left-0 h-[2px] w-full transition-all ${solid || open ? "bg-ink" : "bg-white"} ${open ? "top-1.5 rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-1.5 h-[2px] w-full transition-opacity ${solid || open ? "bg-ink" : "bg-white"} ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 h-[2px] w-full transition-all ${solid || open ? "bg-ink" : "bg-white"} ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
          </span>
        </button>
      </nav>

      {/* Positioned against the header on purpose: the header's backdrop-blur would hijack a `fixed` child anyway. */}
      <div id="mobile-menu"
        className={`absolute inset-x-0 top-full z-40 h-[calc(100dvh-68px)] flex-col overflow-y-auto border-t border-line bg-paper md:hidden ${open ? "flex" : "hidden"}`}>
        <div className="wrap flex flex-col py-2">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="border-b border-line py-5">
              <span className="block font-serif text-2xl font-semibold">{l.label}</span>
              <span className="mt-1 block font-mono text-xs text-slateink-light">{l.meta}</span>
            </Link>
          ))}
          <Link href="/#faq" className="border-b border-line py-5 font-serif text-2xl font-semibold">FAQ</Link>
        </div>
        <div className="wrap py-6">
          <Link href="/apply" className="btn-primary w-full">Apply</Link>
        </div>
      </div>
    </header>
  );
}
