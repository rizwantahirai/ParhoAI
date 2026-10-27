/**
 * ParhoAI's social accounts. Paste each full profile URL; empty ones are hidden everywhere.
 * Careful: "Parho AI" at parhoai.com is a different business. Only add accounts we own.
 */
export const SOCIAL: { name: string; url: string; handle: string }[] = [
  { name: "Instagram", url: "", handle: "" },
  { name: "TikTok",    url: "", handle: "" },
  { name: "YouTube",   url: "", handle: "" },
  { name: "Facebook",  url: "", handle: "" },
  { name: "LinkedIn",  url: "", handle: "" },
  { name: "X",         url: "", handle: "" },
];
export const ACTIVE_SOCIAL = SOCIAL.filter(s => s.url);
