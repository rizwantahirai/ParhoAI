import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://parhoai.org";
  const now = new Date();
  return ["", "/diploma", "/bootcamp", "/sprints", "/instructors", "/apply"].map(p => ({
    url: `${base}${p}`, lastModified: now,
    changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8,
  }));
}
