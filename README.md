# TKSR Career

A frontend/demo marketing website for **TKSR Career** — a career-focused learning
platform covering DevOps, Agile & Scrum, Software Testing, Project Management and
Interview Preparation.

> **Status: frontend/demo implementation.** There is no backend, database,
> payment system, real job API or authentication. Every interactive flow
> (forms, sign-in, "Buy Now", job "Apply") is a local, honestly-labeled demo.

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- Vue Router 4 (HTML5 history mode)
- Vite 5
- TypeScript (strict: `noUnusedLocals`, `noUnusedParameters`)
- Plain CSS (design tokens in `src/styles/main.css`, 1024px / 560px breakpoints)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # vue-tsc type-check + production build to dist/
npm run preview    # serve the production build
```

## Routes

| Route                | Page                                          |
| -------------------- | --------------------------------------------- |
| `/`                  | Home (hero, ecosystem, opportunities, experts, projects, trust, programs, courses) |
| `/jobs`              | Career opportunities (sample feed + filters)  |
| `/jobs/:id`          | Opportunity detail + skill gap + program match|
| `/projects`          | Real-world sample project blueprints          |
| `/projects/:id`      | Project detail                                |
| `/courses`           | All courses (search + category filters)       |
| `/courses/:id`       | Course detail + Buy Now (enrollment intent)   |
| `/about-us`          | About TKSR Career (honest positioning)        |
| `/contact-us`        | Contact info + demo message form              |
| `/sign-in`           | Sign-in (frontend demo only)                  |

Invalid dynamic IDs (`/jobs/:id`, `/projects/:id`, `/courses/:id`) render a
not-found state; unknown paths redirect to `/`.

## Structure

```
src/
  components/   SiteHeader, SiteFooter, cards, sections, EnrollmentModal, BuyNowButton…
  data/         site.ts (courses/categories/contact), jobs, experts, projects,
                careerPrograms, trust, usps, enrollment (typed sample data)
  services/     jobs, experts, projects, enrollment — async API-ready wrappers
                over local data (swap for fetch() when a backend exists)
  utils/        skills (deterministic matching), urgency (date-driven signals)
  views/        HomeView, JobsView, JobDetailView, ProjectsView, ProjectDetailView,
                CoursesView, CourseDetailView, AboutView, ContactView, SignInView
  styles/       Global design system (colors, buttons, sections)
  router.ts     Client-side routes
```

## Honesty / Trust Model

- Jobs, projects, expert profiles, career-skill mappings and course
  ratings/learner counts are **sample/demo data**, always labeled as such in the
  UI.
- No fabricated stats, testimonials, awards, partner claims, placement/salary
  guarantees, seat counts or fake urgency.
- Official contact info (single source of truth in `SITE` in `src/data/site.ts`):
  phone `+919013191313`, email `info@tksrproductservices.com`,
  address `Gurugram, Haryana`.
- "Buy Now" records a local enrollment intent only — no payment or confirmation.

## Notes

- Forms, Sign In and enrollment are frontend-only demos. A future backend/API
  phase will wire them to real endpoints (contracts ready in `src/services/`).
- SPA hosting requires a route-fallback rule (e.g. `try_files` / SPA rewrite)
  so deep links like `/jobs/:id` resolve on refresh.
- Do NOT push to GitHub without explicit instruction — see `PUSH_HOLD.md`.