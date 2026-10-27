import type { MetadataRoute } from "next";
import { LEVELS } from "@/data/python";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://parhoai.org";
  const now = new Date();
  return ["", "/diploma", "/bootcamp", "/sprints", "/instructors", "/apply", "/python"].map(p => ({
    url: `${base}${p}`, lastModified: now,
    changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8,
  })).concat(LEVELS.map(l => ({ url: `${base}/python/${l.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })));
}
