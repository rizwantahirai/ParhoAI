import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap flex min-h-[60vh] flex-col items-start justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="h2 mt-3 max-w-[16ch]">That page does not exist.</h1>
      <Link href="/" className="btn-primary mt-8">Back to the homepage</Link>
    </section>
  );
}
