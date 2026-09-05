#!/usr/bin/env node
/**
 * Print the field ids of a public Google Form, in question order, and the matching
 * src/data/formConfig.ts block. Usage:
 *   node scripts/google-form-ids.mjs "https://docs.google.com/forms/d/e/<id>/viewform"
 */
const url = process.argv[2];
if (!url) { console.error("usage: node scripts/google-form-ids.mjs <form url>"); process.exit(1); }
const m = url.match(/\/forms\/d\/e\/([A-Za-z0-9_-]+)/);
if (!m) { console.error("That does not look like a .../forms/d/e/<id>/viewform link"); process.exit(1); }
const id = m[1];
const html = await (await fetch(`https://docs.google.com/forms/d/e/${id}/viewform`)).text();
const start = html.indexOf("FB_PUBLIC_LOAD_DATA_ = ");
if (start < 0) { console.error("Form data not found — is the form public (no sign-in required)?"); process.exit(1); }
const json = html.slice(start + 23, html.indexOf(";</script>", start));
const data = JSON.parse(json);
const title = data[1]?.[8] ?? data[3] ?? "";
const questions = (data[1]?.[1] ?? []).filter(q => Array.isArray(q[4]) && q[4][0]).map(q => ({ label: q[1], entry: `entry.${q[4][0][0]}`, required: !!q[4][0][2] }));
console.log(`Form: ${title}\nId:   ${id}\n`);
questions.forEach((q, i) => console.log(`${i + 1}. ${q.label}${q.required ? " *" : ""}  →  ${q.entry}`));
const keys = ["name", "email", "program", "background", "goal", "github", "phone"];
if (questions.length !== keys.length) console.log(`\n!! Expected ${keys.length} questions, found ${questions.length}. Check the form before pasting.`);
console.log(`\n// src/data/formConfig.ts\nexport const GOOGLE_FORM = {\n  id: "${id}",\n  fields: {`);
keys.forEach((k, i) => console.log(`    ${k}:${" ".repeat(11 - k.length)}"${questions[i]?.entry ?? ""}",`));
console.log("  },\n};");
