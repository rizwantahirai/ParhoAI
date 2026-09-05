import type { Metadata } from "next";
import { Newsreader, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsApp";

const serif = Newsreader({ subsets: ["latin"], weight: ["400","500","600","700"], variable: "--font-serif", display: "swap", adjustFontFallback: false });
const sans  = Source_Sans_3({ subsets: ["latin"], weight: ["300","400","500","600","700"], variable: "--font-sans", display: "swap" });
const mono  = JetBrains_Mono({ subsets: ["latin"], weight: ["400","500","700"], variable: "--font-mono", display: "swap" });

const SITE = "https://parhoai.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "ParhoAI — Learn AI by building things that run", template: "%s · ParhoAI" },
  description:
    "Live AI engineering cohorts taught in Urdu and English. An eight-month diploma from zero computer science, a three-month bootcamp for working engineers, and seven focused sprints.",
  keywords: ["AI course Pakistan","machine learning bootcamp Lahore","AI engineering diploma","computer vision course","LLM course Urdu","MLOps training"],
  openGraph: {
    type: "website", url: SITE, siteName: "ParhoAI",
    title: "ParhoAI — Learn AI by building things that run",
    description: "Live AI engineering cohorts in Urdu and English. Projects on your GitHub, not certificates on your wall.",
  },
  twitter: { card: "summary_large_image", title: "ParhoAI", description: "Learn AI by building things that run." },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#0F1618", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-3 focus:rounded focus:bg-jade focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
