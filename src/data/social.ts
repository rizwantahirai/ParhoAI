/**
 * ParhoAI's social accounts. Paste each full profile URL; empty ones are hidden everywhere.
 * Careful: "Parho AI" at parhoai.com is a different business. Only add accounts we own.
 */
export const SOCIAL: { name: string; url: string; handle: string }[] = [
  { name: "Instagram", url: "https://www.instagram.com/parhoaiorg/", handle: "@parhoaiorg" },
  { name: "TikTok",    url: "", handle: "" },
  { name: "YouTube",   url: "", handle: "" },
  { name: "Facebook",  url: "", handle: "" },
  { name: "LinkedIn",  url: "https://www.linkedin.com/company/parhoaiorg/", handle: "parhoaiorg" },
  { name: "Snapchat",  url: "https://www.snapchat.com/add/parhoai.org", handle: "parhoai.org" },
  { name: "X",         url: "", handle: "" },
];
export const ACTIVE_SOCIAL = SOCIAL.filter(s => s.url);
