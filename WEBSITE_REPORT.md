# TKSR Career Website — Project Report (current state)

**Prepared:** 23 September 2026 (updated after Phase 10 technical audit)
**Project location:** `C:\Users\LENOVO\Documents\Opencode Project\tksr-learning\`
**Type:** Frontend/demo SPA (Vue 3 + Vite + TypeScript)

---

## 1. Overview

TKSR Career is a marketing website for a career-focused learning platform
covering DevOps, Agile & Scrum, Software Testing, Project Management and
Interview Preparation.

The site is **frontend-only by design**: all content lives in typed local data
files, rendering is client-side, and every interactive flow is a demo. The
positioning is deliberately honest — sample/demo content is always labeled, and
no fabricated proof (stats, testimonials, awards, partner claims, placement or
salary guarantees) is presented.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Routing | Vue Router 4 (HTML5 history mode) |
| Build | Vite 5 |
| Language | TypeScript 5.x (strict mode, `noUnusedLocals`/`noUnusedParameters`) |
| Type checking | vue-tsc (`npm run build`) |
| Styling | Hand-written CSS — design tokens + scoped styles, breakpoints 1024px / 560px |
| Fonts | Google Fonts — Inter (external dependency) |
| Favicon | `public/favicon.svg` |

No external UI library. Dependencies are minimal (`vue`, `vue-router` +
dev-only `vite`, `@vitejs/plugin-vue`, `typescript`, `vue-tsc`).

---

## 3. Routes

- `/` — Home (hero, ecosystem marquee, sample opportunities, experts, projects,
  trust & transparency, career programs, courses, workforce, comparison, lead form)
- `/jobs` — sample opportunity feed with filters + urgency signals
- `/jobs/:id` — opportunity detail, skill-gap check, program matching, Apply (demo)
- `/projects` — sample project blueprints with search + category filter
- `/projects/:id` — project detail
- `/courses` — searchable/filterable course catalog
- `/courses/:id` — course detail, fee, Buy Now → enrollment intent modal
- `/about-us` — honest positioning (no invented history or stats)
- `/contact-us` — verified contact cards + demo message form
- `/sign-in` — demo sign-in (not wired to any backend)

Invalid dynamic IDs show a not-found state; unknown paths redirect to `/`.

---

## 4. Data Layer

- `src/data/site.ts` — course catalog, categories, hiring-partners marquee
  (sample-labeled), `SITE` contact object (single source of truth:
  `+919013191313`, `info@tksrproductservices.com`, Gurugram, Haryana).
- `src/data/jobs.ts` — 7 sample job records, all `isDemo: true`.
- `src/data/experts.ts` — 5 sample practitioner profiles, all `isDemo: true`.
- `src/data/projects.ts` — 6 sample project blueprints, all `isDemo: true`.
- `src/data/careerPrograms.ts` — programs **derived** from courses (one source
  of truth) + deterministic `resolveProgramsForJob` (explicit `programId`
  mapping first, then exact skill-overlap matching, minimum 2 shared skills).
- `src/data/trust.ts` — trust cards + "The TKSR Way" journey (no guarantees).
- `src/data/enrollment.ts` — `EnrollmentIntent` typed contract (local only).

All datasets are cross-referenced (job `programId`s resolve to existing course
IDs; job skills match program career skills deterministically).

---

## 5. Service Layer

`src/services/{jobs,experts,projects,enrollment}.ts` expose async, API-ready
functions that currently resolve from local data. When a real backend is
introduced, only these function bodies change (e.g. `fetch('/api/jobs')`,
`POST /api/enrollments`) — no component changes required. Enrollment
intentionally performs local validation + honest acknowledgement only; no fake
endpoints, no payment, no persistence.

---

## 6. Demo vs Production Boundary

| Area | Current (frontend/demo) | Future |
|---|---|---|
| Jobs | Local sample records, filters, urgency logic | Real job API, DB, admin, expiry, application tracking |
| Experts | Sample profiles | Verified expert database + profiles + links |
| Projects | Sample blueprints | Real portfolio, ownership, artifacts |
| Enrollment | Local intent, no persistence/payment | Backend + DB + payment gateway + confirmation |
| Sign In | Demo experience | Real auth, accounts, sessions, password reset |
| Forms | Local validation + demo success note | Email/CRM/backend submission |

---

## 7. Honesty Guarantees (Phase 8/9/10 enforced)

- All sample/demo content labeled (jobs, experts, projects, skill maps,
  ratings/learner counts on course cards and detail pages).
- No fake testimonials, placement percentages, salary stats, awards,
  accreditation, review counts, hiring-partner claims, seat limits, countdowns
  or fake discounts.
- "Buy Now" = enrollment intent modal ("Enrollment Request Received —
  recorded locally for this demo experience"), never a fake payment or
  confirmation.
- Verified contact info only; no invented company details.

---

## 8. Verified Quality (Phase 9 + Phase 10)

- `npm run build` passes: vue-tsc strict type-check + Vite production build.
- No console or runtime errors across all routes (headless-Chrome QA).
- No horizontal overflow at 1440 / 1024 / 768 / 560 / 390 / 360 px; header
  breakpoint at 1089px keeps the fixed nav from overflowing.
- Accessibility: Escape closes menus/modal, aria-expanded on dropdowns +
  hamburger, modal focus trap + `role="dialog"`/`aria-modal`, labeled fields,
  `role="alert"`/`status` messages, decorative icons `aria-hidden`.
- Security baseline: no `v-html`/`innerHTML`, no `eval`, no localStorage/
  cookies, no secrets; external links use `rel="noopener noreferrer"`.
- Error handling: loading states, not-found states for invalid IDs, empty-search
  empty states with clear-filter actions, guarded form validation messages.

---

## 9. Known Limitations / Future Work

1. **No backend** — forms, sign-in, enrollment and the job feed are demo/local.
2. **Not deployed** — requires static SPA hosting with route fallback (no host
   chosen yet). Domain/server config is future work and out of scope for this
   phase.
3. **SEO** — single meta set + route titles exist; sitemap.xml, robots.txt,
   canonical URLs, Open Graph and structured data are future production tasks.
4. **Verification backlog** — real learner stories, partner listings, verified
   faculty and course statistics must be supplied by TKSR before public launch.
5. **Google Fonts** — external dependency; self-hosting is optional future work.

---

## 10. Run / Build

```bash
cd tksr-learning
npm install      # first time only
npm run dev      # dev server → http://localhost:5174
npm run build    # type-check + production build → dist/
npm run preview  # serve the production build
```