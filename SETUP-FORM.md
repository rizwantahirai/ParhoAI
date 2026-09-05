# Connecting the application form

The form is built, styled and validated — it just needs somewhere to send responses.
Two options. **Google Forms is free and unlimited; Formspree is easier but capped at 50/month.**

Create `.env.local` in the project root (copy `.env.example`). It is gitignored.

---

## Option A — Google Forms  ·  recommended

Responses land in a Google Sheet you already know how to use. Free, no limit.

### 1. Build the form
Go to [forms.google.com](https://forms.google.com) → blank form → **"ParhoAI Applications"**.

Add six questions **in this order**, with these exact types:

| # | Question | Type | Required |
|---|---|---|---|
| 1 | Full name | Short answer | Yes |
| 2 | Email | Short answer | Yes |
| 3 | Which program | Short answer | Yes |
| 4 | Your background | Paragraph | Yes |
| 5 | What do you want to build? | Paragraph | Yes |
| 6 | GitHub or portfolio | Short answer | No |
| 7 | WhatsApp number | Short answer | Yes |

> Use **Short answer** for "Which program", not multiple choice. Google rejects
> multiple-choice submissions whose value does not match an option exactly.

### 2. Get the form id
Click **Send** → the link icon → copy the URL. It looks like:

```
https://docs.google.com/forms/d/e/1FAIpQLSd7xK...9Qw/viewform
                                  ^^^^^^^^^^^^^^^^^^ this is the form id
```

### 3. Get the six field ids
Open the live form, right-click → **View page source**, then `Ctrl+F` for `entry.`

You will find entries like `"entry.1045781291"`. They appear **in the same order as your
questions**. Copy all six.

*Faster alternative:* open the form, press F12 → Network tab → fill it in with dummy data →
submit → click the `formResponse` request → **Payload**. Every field id is listed against
the value you typed.

### 4. Fill in `.env.local`
```bash
NEXT_PUBLIC_FORM_PROVIDER=google
NEXT_PUBLIC_GOOGLE_FORM_ID=1FAIpQLSd7xK...9Qw
NEXT_PUBLIC_GF_NAME=entry.1045781291
NEXT_PUBLIC_GF_EMAIL=entry.1065046570
NEXT_PUBLIC_GF_PROGRAM=entry.1166974658
NEXT_PUBLIC_GF_BACKGROUND=entry.839337160
NEXT_PUBLIC_GF_GOAL=entry.1974294994
NEXT_PUBLIC_GF_GITHUB=entry.298628668
```

### 5. Send responses to a Sheet
In the form → **Responses** tab → the green Sheets icon → **Create new spreadsheet**.
Turn on **Get email notifications for new responses** from the ⋮ menu.

### Known limitation
Google Forms sends no CORS headers, so the browser cannot read the reply. The site shows
"Application received" once the request leaves the browser — it cannot verify Google stored it.
**Submit one test application yourself and confirm it appears in the Sheet before launch.**

---

## Option B — Formspree  ·  easier, capped

1. [formspree.io](https://formspree.io) → sign up → **New Form**
2. Copy the id from the endpoint `https://formspree.io/f/xzbqwabc` → `xzbqwabc`
3. In `.env.local`:
```bash
NEXT_PUBLIC_FORM_PROVIDER=formspree
NEXT_PUBLIC_FORMSPREE_ID=xzbqwabc
```

Real success and error responses, spam filtering, and it emails you each submission.
Free tier is **50 submissions a month** — fine to start, not for a launch campaign.

---

## Adding the variables on Vercel

Local `.env.local` is not deployed. In Vercel:
**Project → Settings → Environment Variables** → add each key for
**Production, Preview and Development** → then **redeploy**.

`NEXT_PUBLIC_` variables are baked in at build time, so a redeploy is required for
changes to take effect.

---

## Checklist before launch

- [ ] Test submission appears in the Sheet or Formspree dashboard
- [ ] Email notifications on, going to an inbox someone reads
- [ ] Variables added on Vercel and redeployed
- [ ] The amber "Form not connected yet" notice is gone from `/apply`
- [ ] Tested once on a phone — that is where most applications will come from
