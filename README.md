# Thamizh Selvan — Portfolio

Editorial, premium portfolio site for **Thamizh Selvan — Full-Stack Developer · Software Engineer** (Chennai, India).

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion**, fully static, deployable to Vercel with zero config.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command           | What it does                          |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Dev server with hot reload            |
| `npm run build`   | Production build (static, 17 routes)  |
| `npm run start`   | Serve the production build            |
| `npm run lint`    | ESLint (Next core-web-vitals + TS)    |
| `npx tsc --noEmit`| Type check                            |

## Deploy (Vercel)

1. Push the repo to GitHub and import it in Vercel — no configuration needed.
2. **Set `NEXT_PUBLIC_SITE_URL`** to your production origin (e.g. `https://your-domain.com`). This is used for `metadataBase`, Open Graph URLs, `sitemap.xml` and `robots.txt`. Without it, Vercel’s `VERCEL_URL` is used as a fallback (fine for preview, use your real domain for production).
3. Drop the resume PDF into `public/resume/` (see TODO list below) and redeploy.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Fonts, metadata, JSON-LD Person, nav/footer/action-bar shell
│   ├── template.tsx            # Page-transition wrapper (respects reduced motion)
│   ├── page.tsx                # Home: hero, stats, selected work, about, experience, skills, contact
│   ├── work/page.tsx           # All projects grid + "Also built" row
│   ├── work/[slug]/page.tsx    # Static case studies (generateStaticParams)
│   ├── about/page.tsx
│   ├── experience/page.tsx     # Timeline + auto-hidden awards section
│   ├── skills/page.tsx
│   ├── contact/page.tsx        # mailto + copy-email (no form, no backend)
│   ├── not-found.tsx           # 404
│   ├── sitemap.ts  robots.ts  opengraph-image.tsx
│   └── globals.css             # Design tokens, type scale, buttons, marquee
├── components/
│   ├── nav.tsx                 # Floating glass pill nav + mobile overlay
│   ├── action-bar.tsx          # Floating bottom action pill (mail/resume/work)
│   ├── footer.tsx
│   ├── section.tsx             # Editorial section w/ sticky label
│   ├── project-card.tsx        # Title + ↗ View Project + big media card
│   ├── faq.tsx                 # Numbered accordion
│   ├── copy-email.tsx          # Copy button + aria-live toast
│   ├── motion.tsx              # Reveal, SplitHeading (two-tone/script), Stagger, Magnetic
│   └── icons.tsx               # Inline SVG set (no icon library)
├── content/                    # ✏️ ALL EDITABLE TEXT LIVES HERE
│   ├── site.ts                 # Identity, links, about, stats, leadership
│   ├── projects.ts             # Projects + "Also built"
│   ├── experience.ts           # Timeline + awards (hidden when empty)
│   ├── skills.ts               # Skill groups
│   └── faqs.ts                 # FAQ accordion content
└── lib/
    ├── utils.ts                # cn(), isTbd() — placeholder detection
    └── seo.ts                  # Base URL + JSON-LD Person
```

**Rule of thumb:** if it’s words, numbers or links, it belongs in `src/content/`. Components never hardcode copy.

---

## How-to

### Add a project

1. Open `src/content/projects.ts`.
2. Copy an existing object in the `projects` array and edit it. Minimum viable entry:

   ```ts
   {
     slug: "my-new-project",        // URL: /work/my-new-project
     title: "My New Project",
     subtitle: "",                  // leave empty to hide
     summary: "One-liner shown on cards.",
     role: "",                      // leave empty to hide
     year: "2026",
     stack: ["Next.js", "PostgreSQL"],
     scope: ["Full-stack platform"],
     overview: "", problem: "", approach: "", challenges: "", outcome: "",
     keyFeatures: [],
     github: "https://github.com/…",
     liveDemo: "https://…",
     screenshots: [],
   }
   ```

3. Done — the card appears on Home, `/work`, and the static page is generated at build.

Empty / `TODO_*` fields are **hidden automatically** (never rendered as visible text).

### Set a live demo link

In `src/content/projects.ts`, replace the placeholder:

```ts
liveDemo: "TODO_LIVE_DEMO_URL",   // ← before: disabled “Demo coming soon” button
liveDemo: "https://my-app.vercel.app",  // ← after: working “Live demo” button
```

### Swap screenshots

1. Drop images in `public/projects/<slug>/` (recommended: `1600×1000` PNG/WebP for the hero, same ratio for gallery shots).
2. Register them in `src/content/projects.ts`:

   ```ts
   screenshots: [
     { src: "/projects/my-new-project/dashboard.png", alt: "Organizer dashboard listing interview slots" },
     { src: "/projects/my-new-project/evaluation.png", alt: "Evaluation workflow for HR volunteers" },
   ],
   ```

3. First screenshot becomes the hero + card image; the rest form the gallery. Until then, a typographic placeholder panel is shown. **Always write real alt text.**

### Add an award / hackathon / certification

`src/content/experience.ts` → push to `awards`:

```ts
export const awards: Award[] = [
  { kind: "Hackathon", title: "…", issuer: "…", year: "2025", url: "" },
];
```

The section is **completely hidden** while the array is empty.

### Edit resume / global links / contact

All in `src/content/site.ts`: `resumePath`, `email`, `linkedin`, `github`, `forese`, `footerNote`.

---

## Design system (summary)

Styled after the reference `ruchitdesigns.framer.website` — dark, high-contrast, Space Grotesk display with a hot pink-red accent.

- **Palette:** canvas `#111112` · surface `#1f1f1f` / `#2b2b2b` · text `#f0f0f0`/`#fafafa` · muted `#b8b8b8` · accent **`#ea0044`**
- **Type:** Space Grotesk **700** (display, tight `-0.04em` tracking) + Roboto (body) + Caveat (script accent words), auto-loaded via `next/font`
- **Scale:** `display-xl / display-lg / display-md / eyebrow / script` utilities in `globals.css`
- **Signature components:**
  - `.glass-pill` — floating blurred nav + action bar (`rgba(130,130,130,.1)` + `blur(10px)`, 32px radius)
  - `.btn-solid` — accent pill with outer glow + inset white highlight (24px radius)
  - `.tag` — hairline pill that fills accent on hover
  - `SplitHeading` — two-tone headings: split text on `\n` (line 1 default, line 2 accent); wrap a word in `*asterisks*` for the script face
  - `<FaqAccordion />` — numbered accordion (content in `content/faqs.ts`)
  - `<ActionBar />` — floating bottom action pill (appears past the hero, hides on `/contact`)
- **Motion:** masked word-by-word heading reveals, scroll reveals, accordion height animation, page transitions — all disabled under `prefers-reduced-motion`
- **A11y:** skip link, semantic landmarks, `:focus-visible` ring, aria-live copy toast, alt text on all images. Note: accent `#ea0044` on canvas measures ~4.1:1 — fine for the large display text it's used on, but kept off small body copy.

---

## TODO — everything still to fill

> Search the repo for `TODO_` to find these in code. Placeholders never render as visible UI.

### 🔴 Blocking / user action

| # | What | Where |
|---|------|-------|
| 1 | **Drop the resume PDF** as `Thamizh_Selvan_Resume.pdf` | `public/resume/` (folder exists) |
| 2 | **Set site URL** for sitemap/OG (`NEXT_PUBLIC_SITE_URL` env, or replace `TODO_SITE_URL`) | env / `src/content/site.ts` → `siteUrl` |
| 3 | **Live demo URL — OnlineMocks2026** (`TODO_LIVE_DEMO_URL`) | `src/content/projects.ts` |
| 4 | **Live demo URL — HR-DB** (`TODO_LIVE_DEMO_URL`) | `src/content/projects.ts` |
| 5 | **Live demo URL — Aegis** (`TODO_LIVE_DEMO_URL`) | `src/content/projects.ts` |
| 6 | **Live demo URL — Report Generation System** (`TODO_LIVE_DEMO_URL`) | `src/content/projects.ts` |

### 🟡 Content placeholders (UI hides them until filled)

| # | What | Where |
|---|------|-------|
| 7 | `role` + `year` for all 4 projects (`TODO_ROLE`, `TODO_YEAR`) | `src/content/projects.ts` |
| 8 | `challenges` for OnlineMocks2026 + HR-DB (`TODO_CHALLENGES`) | `src/content/projects.ts` |
| 9 | **Aegis** full case study: overview, problem, approach, challenges, outcome (`TODO_*`) | `src/content/projects.ts` |
| 10 | **Report Generation System** full case study: summary + all blocks (`TODO_*`) | `src/content/projects.ts` |
| 11 | `stack` arrays for Aegis + Report Generation System (currently empty → hidden) | `src/content/projects.ts` |
| 12 | `scope` for Report Generation System (empty → hidden) | `src/content/projects.ts` |
| 13 | `keyFeatures` for Aegis + Report Generation System (empty → hidden) | `src/content/projects.ts` |
| 14 | Screenshots for any project (empty → typographic placeholder) | `public/projects/<slug>/` + `src/content/projects.ts` |

### 🟢 Optional / nice-to-have

| # | What | Where |
|---|------|-------|
| 15 | Awards/hackathons/certifications list (section hidden while `awards = []`) | `src/content/experience.ts` |
| 16 | `orgUrl` for ISTD SVCE + VCodez (empty → org shown as plain text) | `src/content/experience.ts` |
| 17 | Verify/replace the PULSE’26 link in “Also built” | `src/content/projects.ts` → `alsoBuilt` |
| 18 | Add a portrait photo to the About statement band (currently typographic) | `src/app/about/page.tsx` |
| 19 | Dark-mode toggle (tokens exist; ivory is the shipped default) | `globals.css` |

### ⚠️ Do-not-change reminders

- **No phone number** appears anywhere in `src/` — keep it that way.
- No fabricated metrics: every number on the site (900+, 180+, 800+, 100+, 6, 70%) comes from `site.ts`, `projects.ts`, or `experience.ts`. Don’t add new ones without a source.
- All four GitHub links are final: `Onlinemocks2026`, `hr-database26`, `aegis`, `report_generation`.

---

© 2026 Thamizh Selvan A
