# TKSR Career — Homepage Reference Map (Phase 1)

> **Phase 1 deliverable A.** Structural mapping between the reference homepage
> and the existing TKSR Career implementation.
>
> Verified against the reference characteristics supplied in the Phase 1 brief.
> A screenshot of the reference is not available to the rendering model, so this
> map is built from the brief's written specification of the reference (zones,
> section order, card hierarchy, labels) and the actual source of this repo.
>
> Status: **structure locked**. Visual polish (typography/color proportions,
> spacing rhythm) is intentionally deferred to later phases in this series.

---

## 1. Locked section sequence (Deliverable C)

The homepage order below is the Phase 1 contract. `HomeView.vue` must keep exactly
this leading sequence; the "remaining homepage sections" block may evolve in its
internal parts but never moves above the reference zones.

```
SiteHeader (App.vue)
  → HERO                     (inline in HomeView.vue)
  → ENROLLMENT URGENCY       (EnrollmentUrgencyBanner.vue)
  → WHY TKSR CAREER / 3-CARD (CareerConversionSection.vue)
  → 4 REASONS / ADVANTAGE    (CareerAdvantagesSection.vue)
  → PROJECTS + JOBS STRIP    (CareerNavigationSection.vue)
  → remaining homepage sections (USP → ecosystem → opportunities preview →
    experts → live projects → trust → programs → courses → learner stories →
    practitioner sessions → workforce → approach comparison → lead form)
  → SiteFooter (App.vue)
  → Sticky Buy Now           (StickyCareerCTA.vue, home only, via App.vue)
```

**Verified:** the current `HomeView.vue` (lines 84–152) already renders this exact
leading order. No reordering was required; the map above is the lock going forward.

---

## 2. Zone-by-zone reference → implementation map

| # | Reference zone | Implementation | Data source | Status |
|---|---|---|---|---|
| 1 | Top utility bar — phone/email left; About Us / Need Help? right | `SiteHeader.vue` `.topbar` | `src/data/site.ts` (`SITE.phone`, `SITE.email`) | ✅ match (real contact values, no invented info) |
| 2 | Main navbar — All Courses / Resources / Jobs / Projects / Courses / Contact Us; Talk to Advisor / Sign In | `SiteHeader.vue` `.nav-wrap` (+ `.mobile-panel` for ≤1024px) | `CATEGORIES`, `resourceLinks` | ✅ match (single identity, routes preserved incl. `/sign-in`) |
| 3 | Hero — left: eyebrow pill, big heading + gradient phrase, sub, 2 CTAs, 3 feature items; right: gradient visual card, learner area, floating chips, caption | inline `.hero` in `HomeView.vue` | CTAs → `/jobs`, `/contact-us` | ✅ structural match (feature stats 01–03; chips A/B/C; avatar + caption) |
| 4 | Enrollment urgency — wide blue→purple gradient banner, clock icon, headline, countdown digits + labels | `EnrollmentUrgencyBanner.vue` | `src/data/enrollmentBatch.ts` | ✅ structural match; **pending state** (no verified deadline → honest "pending verification" state, no fabricated countdown) |
| 5 | WHY TKSR CAREER — centered pill + "Don't Just Learn AI. Build What Companies Can See." + support; 3-card horizontal, distinct internal layouts | `CareerConversionSection.vue` `.cc-grid` | `src/data/careerConversion.ts` | ✅ match (pill + 2-line gradient heading + support) |
| 6 | Card 1 — TKSR Career Select: badge, "AI Engineering Select Program", meta row, WHAT YOU GET numbered rows, info box, strip, white Buy Now | `.cc-card--select` in `CareerConversionSection.vue` | `select.*` in `careerConversion.ts`; Buy-Now → `BuyNowButton.vue` → `EnrollmentModal.vue` | ✅ match (badge, 2-line title, 6 Months/Hands-On/Industry-Focused meta, 01–04 rows, conversion box, strip, white Buy Now). "What You Get" mini-heading added in Phase 1. |
| 7 | Card 2 — Career Investment: label, big value, outcome, ratio pill, big CTA | `.cc-card--invest` | `investment.*` (figure/outcome/ratio slots) | ✅ structural match; **pending state** (₹1.5 Lakh / ₹30L+ / 20× are unverified → safe fallback message shown, slots ready for verified values) |
| 8 | Card 3 — Live Vacancies / Apply Now: heading, live badge, job rows, bottom CTA | `.cc-card--jobs` | `opportunities.*` + `src/data/jobs.ts` (existing demo job data) | ✅ structural match; **demo state** (status pill "Demo data", per-job Demo chip, honest note — never claims live vacancies; flips to "LIVE" when verified data is connected) |
| 9 | 4 Reasons — pill + "4 Reasons to Build Your Career Differently"; 2×2 cards, circular icon, number, title, desc, chips; Card 04 orange callout | `CareerAdvantagesSection.vue` | `src/data/careerAdvantages.ts` | ✅ match (numbered 01–04, feature chips, pending note on Card 01, orange opportunity box on Card 04 — safe wording, no ₹/guarantees) |
| 10 | Projects + Jobs strip — 2 horizontal cards with chips + CTAs | `CareerNavigationSection.vue` | `src/data/careerNavigation.ts` (**project chips derived from real catalog** via `getProjectCategories()`) | ✅ match (left blue→ `/projects`, right pale/jobs → `/jobs`; honest demo footnote) |
| 11 | Sticky Buy Now bar — gradient, rocket, "Don't Just Get a Certificate…", white Buy Now | `StickyCareerCTA.vue` (mounted in `App.vue` only when `route.name === 'home'`) | identity → `BuyNowButton` → `EnrollmentModal` | ✅ match (single sticky CTA, no duplicate modal) |

---

## 3. Claim-safety register (unverified → pending, not invented)

| Reference figure | Current handling | Where the verified value plugs in |
|---|---|---|
| "Up to ₹50K" stipend (Card 1 / Reason 01) | Safe wording "Performance-Based Career Opportunity … selected learners may access" + pending note | `select.benefits[0]` and `careerAdvantages.advantages[0].opportunity.*` |
| ₹1.5 Lakh program fee (Card 2) | Fallback headline/message (no invented ₹) | `investment.figure` + `figureCaption` |
| ₹30L+ outcome / 20× ratio (Card 2) | Not shown | `investment.outcomeLine`, `investment.ratio` |
| Live vacancies (Card 3) | Status pill **"Demo data"**, per-job Demo chip, honest note | `opportunities.status.kind` (`'live'` when real jobs are connected) |
| Batch deadline (urgency banner) | Pending state — em-dash digits, "Pending verification" badge | `enrollmentBatch.targetDate` + `isVerified` |
| Companies/partners | Demo/illustrative note on ecosystem section + footer disclaimer | — |

No salary, stipend, placement, deadline or partnership figure was invented in this
phase or any earlier phase; every unverified value stays isolated in the data files
above so verified content can be swapped in without redesign.

---

## 4. Dominance (Deliverable D)

The two dominant visual areas of the homepage are, in order:

1. **3-card conversion section** (`CareerConversionSection`) — directly below the
   urgency banner; 3-up equal-height gradient/white cards (Card 1 = flagship
   purple/blue gradient).
2. **4-card advantage section** (`CareerAdvantagesSection`) — directly below the
   conversion section; 2×2 premium cards.

Both sit immediately after the hero/urgency, above all informational sections,
which is the reference's hierarchy. Nothing competes above them except the hero.

---

## 5. Files

- **Read/verified (no change):** `HomeView.vue`, `SiteHeader.vue`, `App.vue`,
  `CareerAdvantagesSection.vue`, `CareerNavigationSection.vue`,
  `EnrollmentUrgencyBanner.vue`, `StickyCareerCTA.vue`, `BuyNowButton.vue`,
  `data/careerAdvantages.ts`, `data/careerNavigation.ts`, `data/projects.ts`,
  `data/enrollmentBatch.ts`, `data/jobs.ts`, `data/site.ts`.
- **Modified (Phase 1):**
  - `src/data/careerConversion.ts` — added `whatYouGetLabel` to
    `SelectProgramCard` + config value (`"What You Get"`).
  - `src/components/CareerConversionSection.vue` — renders the reference's
    "WHAT YOU GET" mini-heading above Card 1's numbered rows (+ one compact
    style rule).
  - `docs/HOMEPAGE_REFERENCE_MAP.md` — this map (created).
- **Created:** `docs/HOMEPAGE_REFERENCE_MAP.md`.

No components were removed. No routes, dependencies, package-lock, CI/CD or
`.nvmrc` were touched. The Buy-Now → `EnrollmentModal` flow is untouched.

---

## 6. Deferred to later phases (no pixel polish in Phase 1)

- Section 4 urgency banner: reference shows a *centered* headline with countdown
  underneath — current desktop layout is headline-left/countdown-right
  (centered ≤1120px). Layout alignment = later visual phase.
- Hero chips white/surface styling, card radii/shadows, gradient tones, spacing
  rhythm across all zones.
- "All Courses" / "Resources" dropdown panels' exact reference look.