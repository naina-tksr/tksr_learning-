# TKSR Learning Website — Complete Detailed Report

**Prepared:** 23 September 2026
**Project location:** `C:\Users\LENOVO\Documents\Opencode Project\tksr-learning\`
**Live (local):** http://localhost:5174
**Model site:** built to mirror edgexlearning.com

---

## 1. Executive Summary

TKSR Learning is a marketing website for an online training company. It was built
from scratch as a Vue 3 single-page application (SPA) styled after the EdgeX
Learning site (edgexlearning.com), with original TKSR branding, content and
contact details. The site markets training programs in DevOps, Agile & Scrum,
Software Testing, Project Management and Interview Preparation.

The application is a **front-end-only** website: all content is stored in a typed
TypeScript data file, rendered by Vue components, and styled with hand-written
CSS. There is **no backend, database or payment system** at present — forms and
sign-in are demos.

---

## 2. Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) | Matches the user's existing `frontend` project stack |
| Routing | Vue Router 4 (HTML5 history mode) | Enables clean URLs like `/courses`, `/about-us` |
| Build tool | Vite 5 | Fast dev server + optimized production builds |
| Language | TypeScript 5.9 (strict mode) | Type safety for data + templates |
| Styling | Hand-written CSS (global tokens + scoped styles) | Full design control, no heavy UI framework |
| Type checking | vue-tsc 2.x | Catches template/type errors at build time |
| Fonts | Google Fonts — Inter (400–900) | Modern, readable marketing typography |
| Favicon | Inline SVG (`public/favicon.svg`) | Gradient "TK" mark |

No external UI library is used — everything (cards, buttons, marquees, dropdowns,
comparison table, timeline) is custom CSS, keeping the bundle small
(~150 KB production, ~50 KB gzipped total across all chunks).

---

## 3. How the Project Was Built (the journey, start → end)

1. **Reference analysis** — Fetched edgexlearning.com and mapped its full
   structure: hero, hiring-partner logo strip, course category tabs, success
   stories + review ratings, awards, live webinars stats, corporate workforce
   section, industry logos, expert stats, "Why us vs others" comparison table,
   lead-capture form, and a multi-column footer.
2. **Requirements confirmation** — Confirmed with the user: Vue 3 + Vite, Home +
   Core pages (Home, Courses, About, Contact, Sign In), and placeholder contact
   info (later replaced with real details).
3. **Scaffold** — Created `package.json`, Vite/TS configs, `index.html`, global
   CSS design system, router, and data layer in `tksr-learning/`.
4. **Components** — Built `SiteHeader`, `SiteFooter`, `CourseCard`, `LogoMarquee`.
5. **Views** — Built the five page views, Home being the largest (~530 lines of
   template + styles covering 12 sections).
6. **Build & type-check** — Fixed strict-TS issues (unused imports, ref typing)
   and an old `vue-tsc`/TypeScript incompatibility by upgrading `vue-tsc` to 2.x.
7. **QA with Playwright** — Verified every page renders with **zero console
   errors**, no horizontal overflow on desktop **or** mobile, dropdowns and the
   hamburger menu work, category filtering works, and the mobile layout was fixed
   (icon-only "Talk to Adviser" button) after detecting a 41px overflow.
8. **Contact update** — Replaced all placeholder contact details with the real
   ones (see §8) — a one-file change in `src/data/site.ts`.
9. **Screenshots** — Full-page screenshots of all 5 pages (desktop + mobile)
   saved in `shots/` for review.

---

## 4. Project File Structure

```
tksr-learning/
├── package.json            # deps + scripts (dev / build / preview)
├── vite.config.ts          # Vite + Vue plugin, port 5174
├── tsconfig.json           # strict TypeScript config
├── tsconfig.node.json      # TS config for the Vite config file
├── index.html              # SPA shell, meta tags, Inter font, favicon
├── README.md               # setup + customization guide
├── shots/                  # Playwright screenshots of every page
├── public/
│   └── favicon.svg         # gradient "TK" logo mark
└── src/
    ├── main.ts             # app bootstrap (createApp + router)
    ├── App.vue             # layout: SiteHeader + <router-view> + SiteFooter
    ├── router.ts           # route table + scroll behavior
    ├── env.d.ts            # Vite client types
    ├── styles/
    │   └── main.css        # design tokens, buttons, sections, forms, stats
    ├── data/
    │   └── site.ts         # ALL site data (courses, categories, partners, contact)
    ├── components/
    │   ├── SiteHeader.vue  # topbar, brand, nav, dropdowns, mobile menu
    │   ├── SiteFooter.vue  # 5-column footer with links + socials + legal
    │   ├── CourseCard.vue  # reusable course card
    │   └── LogoMarquee.vue # animated 2-row partner logo marquee
    └── views/
        ├── HomeView.vue    # full marketing landing page (12 sections)
        ├── CoursesView.vue # searchable/filterable course catalog
        ├── AboutView.vue   # company story + timeline
        ├── ContactView.vue # contact cards + form + partner CTAs
        └── SignInView.vue  # demo login card
```

---

## 5. Design System (in `src/styles/main.css`)

**Color tokens:**
- Primary blue `#1d4ed8` / gradient `linear-gradient(120deg, #1d4ed8 → #6d28d9 → #7c3aed)`
- Accent orange `#f97316` (CTA buttons: call now, request demo)
- Ink `#0b1630` / muted slate `#5a6b85`
- Soft background `#f4f7fd`, dark `#0b1630` panels (success stories, webinars)
- Success green `#16a34a` for confirmation messages

**Typography:** Inter, headings 800–900 weight with tight letter-spacing; hero
uses `clamp()` for fluid sizing (2.1rem → 3.4rem).

**Reusable primitives:** `.container` (1200px max), `.section` spacing,
`.eyebrow` pill labels, buttons (primary-gradient, accent-orange, outline, white,
ghost-light), `.card`, `.stat`, form `.field` styles, and a `fade-up` scroll
animation.

**Responsive breakpoints:** 1024px (tablet) and 560px (phone / 390px tested).

---

## 6. Routing (in `src/router.ts`)

| Route | Page | Notes |
|---|---|---|
| `/` | HomeView | Full landing page |
| `/courses` | CoursesView | Reads `?category=` query for deep links |
| `/about-us` | AboutView | |
| `/contact-us` | ContactView | |
| `/sign-in` | SignInView | Demos only |
| `*` (fallback) | redirect → `/` | Unknown URLs go home |

Scroll behavior: smooth-scroll to `#anchor` when present (e.g. `/#lead`), else to
top of page on navigation.

---

## 7. Page-by-Page Walkthrough

### 7.1 Home (`HomeView.vue`) — 12 sections, top to bottom

1. **Sticky header** (SiteHeader — see §7.6).
2. **Hero** — soft gradient background, left column: eyebrow pill
   "Industry-Aligned Live Training", H1 "Build Skills Today and Unlock Your
   Career Edge" (gradient span), subtitle, two CTAs ("Scale Your Expertise" →
   lead form; "Get an Expert Callback" → contact), and a 3-stat row
   (15K+ career transitions, 100K+ active learners, 1,000+ expert mentors).
   Right column: a gradient panel with a floating avatar, caption, and three
   animated "chips" — 100% Placement Aid, Globally Accredited, 1-on-1 Expert
   Mentorship.
3. **Hiring partners** — "Our Network of 400+ Hiring Partners" + `LogoMarquee`
   (two counter-scrolling rows of 12 fictional-logos: Google, Stanford, IBM,
   Infosys, Accenture, Capgemini, Deloitte, TCS, Microsoft, Amazon, Cognizant,
   Wipro — each with brand-colored text).
4. **Courses (category tabs)** — 6 tabs (All / DevOps / Agile and Scrum /
   Software Testing / Interview Prep / Project Management). Clicking filters a
   grid of `CourseCard`s (first 6 shown); "View All Courses" links to `/courses`.
5. **Success stories (dark section)** — 4 "value cards" (60% average hike,
   86 LPA highest salary, 10,000+ transitions, 400+ hiring partners), then 3
   testimonial cards with — quotes and initials avatars, then a review strip
   (Google 4.5/5 · 12,000 reviews, Facebook 4.6/5, Trustpilot 4.5/5,
   SwitchUp 4.8/5).
6. **Awards** — 3 framed award cards (EdTech Excellence 2026, Innovation in
   Learning 2026, Learner Success 2026).
7. **Live webinars** — dark gradient panel with 6 headline stats (250+ enterprise
   clients, 25K+ upskilled, 500+ consulting engagements, 100K+ training hours,
   200+ experts, 10+ years).
8. **Corporate/workforce** — feature list (Customized Training, Expert-Led
   Learning, Hands-On Learning, Flexible Delivery) + "Request A Demo" button;
   side gradient card showing alumni-labelled pills.
9. **Experts stats** — 200+ industry experts, 50+ skills, 500+ engagements,
   20+ domains.
10. **Why TKSR (comparison table)** — custom table with 3 columns (Features |
    Others ✗ | TKSR ✓) across 5 rows (Learning Mode, Mentorship, Certifications,
    Career Support, Real-Time Impact). Renders as stacked cards on mobile.
11. **Lead CTA + form** — headline stats (10,000+ learners, 400+ partners,
    5,000+ careers transformed) beside a card form: purpose dropdown (Career
    Growth / Switch Roles / Upskill My Team / Other), name, phone, consent
    checkbox (Terms/Privacy), and "Scale Your Career →" button. On submit shows
    an inline success message (demo; no network call).
12. **Footer** (SiteFooter — see §7.7).

### 7.2 Courses (`CoursesView.vue`)

- Gradient page banner with breadcrumb ("Home / Courses") and strapline.
- **Toolbar:** a live search box (filters by title, summary, or any tag) + the
  same 5+All category tabs, each showing a count badge.
- Grid of all 12 course cards; "no results" empty state message.
- Bottom CTA banner: "Not sure which course fits your career goal?" → "Book Free
  Guidance".
- Category can be pre-selected via deep link `?category=DevOps` (used by header
  and footer dropdowns).

### 7.3 About (`AboutView.vue`)

- Banner: "About TKSR Learning".
- Intro split: story copy ("From a 12-learner batch to a 100K+ learner
  community", 2016 growth narrative) + 4 stats (10+ years, 100K+ learners,
  1,000+ mentors, 400+ partners), plus a gradient "Our Promise" card.
- Mission / Vision / Values — 3 pillar cards.
- **Timeline** — vertical alternating line 2016 / 2019 / 2022 / 2026.
- Mentor CTA — "Learn from mentors who build for the world's biggest companies"
  with logo pills and "Become a Trainer" button.

### 7.4 Contact (`ContactView.vue`)

- Banner: "Talk to Us to Scale Up".
- **4 contact cards** (updated per user request):
  - 📞 Call Us → **+919013191313** (tap-to-call `tel:`)
  - ✉️ Email Us → **info@tksrproductservices.com** (mailto)
  - 📍 Visit Us → **Gurugram, Haryana**
  - 💬 WhatsApp → **+919013191313** (deep link to `wa.me/919013191313`)
- Contact form card (name, mobile, email, interest dropdown, message) with demo
  success message.
- Side column: "Become an Instructor" (→ trainers@tksrlearning.com),
  "Become a Training Partner" (→ partners@tksrlearning.com), and a map card
  with a gradient placeholder for the Gurugram location.

### 7.5 Sign In (`SignInView.vue`)

- Centered card on soft background: TKSR brand, "Welcome back 👋", email +
  password fields with forgot-password link, gradient Sign In button, divider,
  Google + LinkedIn buttons, and a "New to TKSR Learning? Create a free account"
  link. Submitting shows a demo note that sign-in isn't wired up yet.

### 7.6 Header (`SiteHeader.vue`)

- **Top bar** (dark): phone, email, quick links (About, Need Help).
- **Sticky nav** (blurred white): "TK" gradient brand mark + wordmark,
  center links, "All Courses" **and** "Resources" hover/click **dropdowns**
  (6 categories; Blogs/Course Info/Corporate/Trainer links), "Contact Us",
  right side: orange "💬 Talk to Adviser" phone button, "Sign In" text link, and
  a **hamburger** (≤980px).
- **Mobile panel** slides down with all links; nav is fully responsive
  (icon-only adviser button ≤980px to avoid overflow).

### 7.7 Footer (`SiteFooter.vue`)

- Dark 5-column layout: brand + about blurb + contact links + 5 social icons;
  Company / Support / Resources / Quick Links columns (privacy, terms, refund,
  sitemap as `#` placeholders).
- Company note strip, then legal bottom bar: "© 2016–2026 TKSR Learning. All
  Rights Reserved." + certification disclaimer.

---

## 8. Data Layer (`src/data/site.ts`)

Typed `Course` interface: `id, title, category, summary, duration, level,
rating, learners, price, tags[], icon`.

**12 courses across 5 categories** (sample):

| Course | Category | Duration | Price | Rating |
|---|---|---|---|---|
| DevOps Certification Training | DevOps | 6 Months | ₹49,999 | 4.8 |
| Docker & Kubernetes Bootcamp | DevOps | 3 Months | ₹29,999 | 4.7 |
| AWS Cloud & DevOps Engineering | DevOps | 5 Months | ₹44,999 | 4.9 |
| Scrum Master Certification (CSM) | Agile and Scrum | 2 Months | ₹21,999 | 4.6 |
| Agile & Scrum Foundations | Agile and Scrum | 6 Weeks | ₹9,999 | 4.5 |
| Product Owner Interview Bootcamp | Interview Prep | 4 Weeks | ₹14,999 | 4.8 |
| Scrum Master Interview Bootcamp | Interview Prep | 4 Weeks | ₹14,999 | 4.7 |
| Project Manager Interview Bootcamp | Interview Prep | 4 Weeks | ₹13,999 | 4.6 |
| Agile & DevOps Interview Prep | Interview Prep | 4 Weeks | ₹15,999 | 4.7 |
| Software & Automation Testing | Software Testing | 5 Months | ₹29,999 | 4.7 |
| API & Performance Testing | Software Testing | 2 Months | ₹12,999 | 4.6 |
| PMP® Certification + Exam Prep | Project Mgmt | 3 Months | ₹26,999 | 4.9 |

Also exported: `CATEGORIES` (6, with "All Courses"), `hiringPartners` (12 with
brand colors), and the `SITE` object:

```ts
export const SITE = {
  name: 'TKSR Learning',
  phone: '+919013191313',
  phoneHref: 'tel:+919013191313',
  whatsapp: 'https://wa.me/919013191313',
  email: 'info@tksrproductservices.com',
  address: 'Gurugram, Haryana',
}
```

**One source of truth:** the header phone button, top bar, footer, and all four
contact cards read from this one object — change it once, everything updates.

---

## 9. Interactivity Summary

| Feature | Where | Behavior |
|---|---|---|
| Category tabs | Home, Courses | Client-side filtering with Vue `computed` |
| Course search | Courses | Live keyword filter (title/summary/tags) |
| Dropdown menus | Header | Hover or click opens panel, closes on nav |
| Hamburger menu | Header (mobile) | Toggles slide-down panel, closes on route change |
| Logo marquee | Home | Infinite CSS animation, edge-masked fade |
| Floating hero chips | Home | Infinite `float` keyframe animation |
| Lead / contact forms | Home, Contact, Sign In | Validate + show success message (demo only) |
| Scroll behavior | All | Smooth scroll to anchors, top on page change |

---

## 10. QA / Verification Performed

Using Playwright against the running dev server:

| Check | Result |
|---|---|
| Production build (`npm run build`) | ✅ passes (vue-tsc strict + vite) |
| Console errors on all 5 pages | ✅ zero |
| Desktop horizontal overflow (1440px) | ✅ none |
| Mobile horizontal overflow (390px) | ✅ none *(fixed 41px header overflow → icon-only button)* |
| Header sticky + page banner render | ✅ |
| Homepage 12 section texts present | ✅ all true |
| Category filter click → only that category | ✅ (DevOps only after click) |
| Divinity dropdown → 6 category links | ✅ |
| Mobile hamburger → 8 links visible | ✅ |
| New contact details render (phone/email/address/whatsapp, tel:/mailto:/wa.me hrefs) | ✅ verified after update |

Screenshots: `tksr-learning/shots/home.png`, `courses.png`, `about.png`,
`contact.png`, `signin.png`, `home-mobile.png`.

---

## 11. Current Status

- ✅ Fully functional Vue 3 marketing site (5 pages)
- ✅ Real contact details in place
- ✅ Responsive (desktop + mobile)
- ✅ Builds without errors
- ▶️ Dev server currently running at **http://localhost:5174**
- ⏳ **Not yet on the internet** — target domain learning.tksrproductservices.com;
  hosting destination not yet provided (VPS/Docker, Cloudflare Pages, Netlify,
  or cPanel all viable for this SPA).

---

## 12. How to Run / Build

```bash
cd tksr-learning
npm install      # first time only
npm run dev      # dev server → http://localhost:5174
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
```

---

## 13. Customization Quick-Reference

| What to change | Where |
|---|---|
| Phone / email / address / WhatsApp | `src/data/site.ts` → `SITE` |
| Course catalog | `src/data/site.ts` → `courses` array |
| Categories | `src/data/site.ts` → `CATEGORIES` |
| Hiring/logos strip | `src/data/site.ts` → `hiringPartners` |
| Colors & design tokens | `src/styles/main.css` → `:root` |
| Page copy | each `src/views/*.vue` template |
| Meta title/description | `index.html` |

---

## 14. Known Limitations & Next Steps

1. **No backend** — lead form, contact form and sign-in show demo success
   messages; wire them to an email/CRM API or backend when ready.
2. **Not deployed publicly** — needs hosting + DNS records for
   `learning.tksrproductservices.com` (static SPA: nginx `try_files` fallback,
   or Cloudflare Pages/Netlify with a CNAME).
3. **Placeholder legal pages** — Privacy/Terms/Refund links point to `#`.
4. **Fake marketing numbers/logos** — 100K+ learners, review counts, partner
   names, course prices and awards are placeholder content for the demo; replace
   with real data before public launch.
5. **No course detail pages** — card "View Details" buttons currently don't
   navigate; add a `/courses/:id` detail route as the next step.
6. **SEO** — single meta set in `index.html`; per-route meta titles + sitemap
   recommended once content is final and deployed.