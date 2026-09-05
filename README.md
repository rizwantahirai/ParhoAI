# parhoai-web

The ParhoAI website. Next.js 14 (App Router) · TypeScript · Tailwind.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

---

## Deploying — Hostinger domain, Vercel hosting

**1. Push to GitHub**
```bash
git init
git add .
git commit -m "ParhoAI website"
git branch -M main
git remote add origin git@github.com:<you>/parhoai-web.git
git push -u origin main
```

**2. Import to Vercel**
vercel.com → Add New → Project → import the repo. Next.js is detected automatically;
no build settings to change. First deploy gives you `parhoai-web.vercel.app`.

**3. Add the domain in Vercel**
Project → Settings → Domains → add `parhoai.org` **and** `www.parhoai.org`.
Vercel will show the DNS records it wants.

**4. Point Hostinger's DNS at Vercel**
Hostinger → Domains → parhoai.org → DNS / Nameservers → **DNS Zone**:

| Type | Name | Value | TTL |
|---|---|---|---|
| A | `@` | `76.76.21.21` | 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |

Delete any existing `A @` or `CNAME www` records first — duplicates break resolution.
**Use Hostinger's DNS zone, not their nameserver-change option.** Keep the domain
registered at Hostinger; only the records point at Vercel.

Propagation is usually minutes, up to 24 hours. Vercel issues the SSL certificate itself
once records resolve — do not buy an SSL certificate from Hostinger.

**5. Confirm**
`https://parhoai.org` and `https://www.parhoai.org` both load and both show a padlock.
Set the canonical redirect (www → apex, or the reverse) in Vercel → Domains.

---

## Application form

The form on `/apply` posts to Google Forms or Formspree, chosen with an environment
variable. **See `SETUP-FORM.md`.** Until it is configured the page shows an amber notice
and the submit button is disabled, so nothing is silently lost.

## Structure

```
src/
├── app/
│   ├── layout.tsx        fonts, metadata, nav, footer
│   ├── page.tsx          home
│   ├── diploma/          8-month program
│   ├── bootcamp/         3-month program
│   ├── sprints/          seven short courses
│   ├── apply/            application form
│   ├── sitemap.ts        auto sitemap.xml
│   └── robots.ts         auto robots.txt
├── components/           Nav, Footer, Hero, Programs, Builds, Faq, ...
└── data/programs.ts      all homepage copy in one file
```

**Editing content:** most homepage text lives in `src/data/programs.ts`.
Curriculum lives inside each page file as a `MODS` array.

---

## Responsive

Mobile-first throughout. Breakpoints: `sm` 640 · `md` 768 · `lg` 1024.
Below `md` the nav becomes a full-screen panel with a hamburger; every grid collapses to
one column; the sprint table reflows to stacked rows. Test at 360px, 768px and 1440px.

---

## Before launch

- [ ] Connect the application form — see `SETUP-FORM.md` (Google Forms or Formspree)
- [ ] Add a real favicon and an OG share image (`public/opengraph-image.png`, 1200×630)
- [ ] Add the teaching team section with real photos
- [ ] Add pricing, or a clear "request pricing" path
- [ ] Set up Vercel Analytics or Plausible
- [ ] Add Google Search Console and submit `parhoai.org/sitemap.xml`
- [ ] Decide on the canonical: apex or www
