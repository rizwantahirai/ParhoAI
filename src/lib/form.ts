/**
 * Application form delivery.
 *
 * Two providers, both free to start. Pick one in .env.local:
 *
 *   NEXT_PUBLIC_FORM_PROVIDER=google     responses land in a Google Sheet
 *   NEXT_PUBLIC_FORM_PROVIDER=formspree  responses emailed + dashboard
 *
 * See SETUP-FORM.md for step-by-step instructions.
 */

export type Provider = "google" | "formspree" | "none";

export const PROVIDER = (process.env.NEXT_PUBLIC_FORM_PROVIDER || "none") as Provider;

/** Google Form: the long id from .../forms/d/e/<THIS>/viewform */
const GOOGLE_FORM_ID = process.env.NEXT_PUBLIC_GOOGLE_FORM_ID || "";

/** Google Form field ids, e.g. "entry.1234567890" */
export const GOOGLE_FIELDS = {
  name:       process.env.NEXT_PUBLIC_GF_NAME       || "",
  email:      process.env.NEXT_PUBLIC_GF_EMAIL      || "",
  program:    process.env.NEXT_PUBLIC_GF_PROGRAM    || "",
  background: process.env.NEXT_PUBLIC_GF_BACKGROUND || "",
  goal:       process.env.NEXT_PUBLIC_GF_GOAL       || "",
  github:     process.env.NEXT_PUBLIC_GF_GITHUB     || "",
};

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";

export const isConfigured =
  (PROVIDER === "google"    && !!GOOGLE_FORM_ID && !!GOOGLE_FIELDS.email) ||
  (PROVIDER === "formspree" && !!FORMSPREE_ID);

export type Application = {
  name: string; email: string; program: string;
  background: string; goal: string; github: string;
};

export async function submitApplication(a: Application): Promise<void> {
  if (PROVIDER === "formspree") {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(a),
    });
    if (!res.ok) throw new Error("Formspree rejected the submission");
    return;
  }

  if (PROVIDER === "google") {
    const body = new URLSearchParams();
    (Object.keys(GOOGLE_FIELDS) as (keyof typeof GOOGLE_FIELDS)[]).forEach(k => {
      const id = GOOGLE_FIELDS[k];
      if (id) body.append(id, a[k] ?? "");
    });
    // Google Forms sends no CORS headers, so the response is opaque —
    // a resolved promise means the request left the browser, not that Google accepted it.
    await fetch(`https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`, {
      method: "POST", mode: "no-cors", body,
    });
    return;
  }

  throw new Error("No form provider configured");
}
