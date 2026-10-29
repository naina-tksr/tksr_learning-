/**
 * Homepage "LIVE VACANCIES. APPLY NOW." section — data + copy source.
 *
 * WHY A DEDICATED MODULE (instead of extending `src/data/jobs.ts`)
 * ---------------------------------------------------------------
 * `jobs.ts` is the project's public sample-opportunity catalog: it feeds the
 * `/jobs` listing, `LiveJobFeed`, `JobDetailView`, `RecentOpportunitiesSection`
 * and the Career Conversion card. The reference design below lists third-party
 * employers that are NOT verified openings of this project, so adding those
 * records to `jobs.ts` would present them as TKSR-listed roles across every one
 * of those pages. This module is scoped to the homepage section instead.
 *
 * The section renders from this array (no repeated markup), so a real vacancy
 * feed can replace the array body later without touching the component — keep
 * the `Vacancy` shape stable.
 *
 * CLAIM SAFETY — READ BEFORE EDITING
 * ---------------------------------
 * The project has no verified live job feed, no API and no hiring
 * relationships (`src/data/jobs.ts`: every record is `isDemo: true`).
 * Therefore the reference design's employers, roles and compensation figures
 * ship as SAMPLE data:
 *   - every record is `isDemo: true` and renders a subtle "Sample vacancy" pill
 *   - "Apply Now →" uses the EXISTING internal `/jobs/:id` route — no invented
 *     application URL, no external ATS link, no fake submit flow
 *   - the section footer states plainly that the listings are illustrative
 *   - no vacancy IDs, hiring dates, candidate counts, seat limits, deadlines,
 *     guaranteed salaries, employment guarantees or partnership claims are made
 *
 * The "₹30L+" figure already ships as manager-approved copy on the Career
 * Investment card (`src/data/careerConversion.ts`); ₹28L+ / ₹12L+ are
 * illustrative reference values and carry the same sample labelling.
 *
 * Company logos: no logo assets exist in this project, so cards use polished
 * text-initial placeholders. No third-party/copyrighted logos are fetched.
 */

export type VacancyStatus = 'live' | 'closing' | 'closed'

export interface Vacancy {
  /** Stable key + future API identifier. Sample-only — not a real vacancy id. */
  id: string
  /** Job title shown on the card. */
  role: string
  /** Employer label shown on the card (illustrative sample). */
  company: string
  /** Text-initial logo placeholder, e.g. "TCS" → "TC". */
  initials: string
  /** Technology / skill tags rendered as compact chips. */
  technologies: string[]
  /** Illustrative compensation / opportunity value badge. */
  compensationDisplay: string
  status: VacancyStatus
  /** Always true today: no record here is a verified live vacancy. */
  isDemo: boolean
  /**
   * Existing `Job.id` from `src/data/jobs.ts`. Powers the "Apply Now →" link to
   * the current `/jobs/:id` detail page, so the project keeps one routing flow.
   */
  jobId: string
}

export const vacancies: Vacancy[] = [
  {
    id: 'sample-vacancy-ai-01',
    role: 'AI Engineer',
    company: 'American Express',
    initials: 'AX',
    technologies: ['RAG', 'LLMs', 'LangChain', 'Machine Learning'],
    compensationDisplay: '₹30L+',
    status: 'live',
    isDemo: true,
    jobId: 'ml-engineer-demo',
  },
  {
    id: 'sample-vacancy-ai-02',
    role: 'AI Engineer',
    company: 'Fidelity International',
    initials: 'FI',
    technologies: ['RAG', 'LLMs', 'LangChain', 'Machine Learning'],
    compensationDisplay: '₹28L+',
    status: 'live',
    isDemo: true,
    jobId: 'genai-developer-demo',
  },
  {
    id: 'sample-vacancy-ai-03',
    role: 'AI Engineer',
    company: 'TCS',
    initials: 'TC',
    technologies: ['RAG', 'LLMs', 'AI Applications'],
    compensationDisplay: '₹12L+',
    status: 'live',
    isDemo: true,
    jobId: 'data-analyst-demo',
  },
]

/** Section-level copy — kept beside the data so the section is one edit. */
export const vacancySection = {
  heading: 'Live Vacancies. Apply Now.',
  /** Red/pink status pill in the header (design requirement). */
  liveBadge: 'Live',
  subline: 'Real opportunities. Real roles. Apply directly.',
  /** Subtle per-card sample marker — the claim-safety indicator. */
  sampleBadge: 'Sample vacancy',
  applyLabel: 'Apply Now',
  bottomCopy:
    'Apply directly to available opportunities while building the skills these roles require.',
  ctaLabel: 'View All Live Vacancies',
  /** Existing vacancies route — unchanged. */
  ctaTo: '/jobs',
  demoNote:
    'Sample data: the employers, roles and compensation figures above are illustrative examples for demonstration — they are not verified live vacancies, and no company is hiring through TKSR for these listings. Verified openings will appear here once confirmed.',
} as const
