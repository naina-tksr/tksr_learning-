# TKSR Learning

A marketing website for **TKSR Learning** — an online training platform covering DevOps, Agile & Scrum, Software Testing, Project Management and Interview Preparation. Designed to mirror the structure of EdgeX Learning (edgexlearning.com) with original TKSR branding and content.

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- Vue Router 4
- Vite 5
- TypeScript
- Plain CSS (design tokens in `src/styles/main.css`)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5174
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

## Pages

| Route        | Page                                             |
| ------------ | ------------------------------------------------ |
| `/`          | Home (hero, partners, courses, testimonials, awards, webinars, workforce, comparison, lead form) |
| `/courses`   | All courses with search + category filters       |
| `/about-us`  | Story, mission/vision/values, timeline, mentors  |
| `/contact-us`| Contact cards, message form, instructor/partner CTAs |
| `/sign-in`   | Sign-in card (frontend demo only)                |

## Structure

```
src/
  components/   SiteHeader, SiteFooter, CourseCard, LogoMarquee
  data/site.ts  Courses, categories, hiring partners, site contact info
  views/        HomeView, CoursesView, AboutView, ContactView, SignInView
  styles/       Global design system (colors, buttons, sections)
  router.ts     Client-side routes
```

## Customization

- **Contact details / brand info:** edit the `SITE` object in `src/data/site.ts` (currently phone `+919013191313`, email `info@tksrproductservices.com`, address `Gurugram, Haryana`).
- **Courses:** add/edit entries in the `courses` array in `src/data/site.ts`.
- **Colors / branding:** update design tokens (`--primary`, `--accent`, `--gradient`, …) in `src/styles/main.css`.

## Notes

- Screenshots of each page are in `shots/` (generated with Playwright).
- Forms and Sign In are frontend-only demos — wire them to a backend/email service when ready.
- Placeholder contact info should be replaced with real details before going live.