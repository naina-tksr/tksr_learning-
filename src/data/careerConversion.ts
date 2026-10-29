/**
 * Centralized content + verification metadata for the homepage
 * "Why TKSR Career?" conversion section.
 *
 * PHASE 21.2 — CARD 2 "CAREER INVESTMENT" (Reference Image 2)
 * ------------------------------------------------------------
 * The Career Investment card now carries the manager-approved figures from
 * Reference Image 2 exactly:
 *   - figure           "₹1.5 LAKH"
 *   - figureSupport    "Build skills targeted toward"
 *   - outcomeMetric    "₹30L+"
 *   - outcomeLabel     "Career Opportunities"
 *   - ratioValue       "20×"
 *   - ratioCaption     "salary-to-program-cost ratio"
 *   - supportParagraph "Don't spend years collecting certificates. Spend
 *                      focused time building skills companies can see."
 * The old null/pending metric slots ("Verification pending" placeholders,
 * fallback headline/message, empty ratio pill) are removed — this content is
 * approved, so no pending placeholders or invented-figure disclaimers remain
 * on Card 2. The section footer keeps the Card 1 (Select Program) honesty note
 * only, since Card 1 remains demo/unverified.
 *
 * SAFETY RULES
 * -------------
 * 1. Card 1 "AI Engineering Select Program" is NOT yet in the course catalog
 *    and its internship terms are unverified, so it ships in demo state with an
 *    honest pending note (section footer). Nothing here is made up.
 * 2. Card 2 figures are manager-approved reference copy (see above) — no
 *    surplus numbers or guarantees were introduced beyond the approved set.
 * 3. Card 3 consumes the EXISTING sample jobs data (all records are
 *    `isDemo: true`) — it never represents demo listings as live vacancies.
 */

import { jobs } from './jobs'
import type { Job } from './jobs'

export interface ConversionBenefit {
  /** Zero-padded row number, e.g. "01" (matches the reference layout). */
  num: string
  /** Short bold row title — reuses the verified Phase 3 terminology. */
  title: string
  /** Compact supporting line — existing safe project copy only. */
  text: string
}

export interface SelectProgramCard {
  id: string
  badge: string
  title: string
  /** Compact program metadata tags (e.g. "6 Months") rendered as distinct chips. */
  metadata: string[]
  /** Mini-heading above the numbered benefits list (the reference "WHAT YOU GET" block). */
  whatYouGetLabel: string
  benefits: ConversionBenefit[]
  /** Highlighted conversion message below the benefits list. */
  conversion: string
  /** Short positioning strip below the conversion message. */
  conversionStrip: string
  ctaLabel: string
  /** Identity passed to the existing Buy-Now enrollment flow. */
  courseId: string
  courseTitle: string
  isDemo: boolean
  verificationNote: string
}

export interface InvestmentCard {
  id: string
  /** Card identity — "Career Investment" (uppercased visually via CSS). */
  title: string
  /** Primary figure — "₹1.5 LAKH". */
  figure: string
  /** Muted line directly below the primary figure — "Build skills targeted toward". */
  figureSupport: string
  /** Dominant outcome metric — "₹30L+". */
  outcomeMetric: string
  /** Uppercase label below the outcome metric — "Career Opportunities". */
  outcomeLabel: string
  /** Ratio pill value — "20×". */
  ratioValue: string
  /** Ratio caption beside the pill — "salary-to-program-cost ratio". */
  ratioCaption: string
  /** Supporting paragraph (exact approved copy). */
  supportParagraph: string
  ctaLabel: string
  /** Existing program/course route this CTA leads to. */
  ctaTo: string
}

export interface OpportunitiesCard {
  id: string
  badge: string
  title: string
  support: string
  /**
   * Card-level listing status. `kind: 'demo'` everywhere today — every record in
   * jobs.ts is `isDemo: true`, so the card must never claim "live vacancies".
   * Flip to `'live'` only when real, verified job data is connected.
   */
  status: { label: string; kind: 'live' | 'demo' }
  /** How many sample opportunities to preview inside the card. */
  previewLimit: number
  ctaLabel: string
  /** Existing jobs route. */
  ctaTo: string
  note: string
}

export interface CareerConversionConfig {
  eyebrow: string
  headline: string
  headlineAccent: string
  support: string
  select: SelectProgramCard
  investment: InvestmentCard
  opportunities: OpportunitiesCard
}

export const careerConversion: CareerConversionConfig = {
  eyebrow: 'Why TKSR Career?',
  headline: "Don't Just Learn AI.",
  headlineAccent: 'Build What Companies Can See.',
  support:
    'Build industry-relevant AI skills, create real products, develop a strong portfolio and prepare for opportunities created by the AI-first job market.',
  select: {
    id: 'select-program',
    badge: 'TKSR CAREER SELECT',
    title: 'AI Engineering Select Program',
    metadata: ['6 Months', 'Hands-On', 'Industry-Focused'],
    whatYouGetLabel: 'What You Get',
    benefits: [
      {
        num: '01',
        title: 'PERFORMANCE-BASED PAID INTERNSHIP OPPORTUNITY-UPTO 50K',
        text:
          'Selected learners may access practical work opportunities based on performance and eligibility.',
      },
      {
        num: '02',
        title: 'EXPERIENCE A REAL CORPORATE WORKFLOW',
        text:
          'Work closely with working experts and professional teams like real workplace workflows.',
      },
      {
        num: '03',
        title: 'WORK WITH REAL WORKING EXPERTS',
        text: 'Live interaction with professionals who know how AI work gets done.',
      },
      {
        num: '04',
        title: 'DIRECT EXPOSURE TO INDUSTRY EXPECTATIONS',
        text: 'Understand what companies actually expect — not just how to apply it.',
      },
    ],
    conversion:
      'Complete the Course. Enroll Now. Unlock Opportunities Waiting for You on the right side .',
    conversionStrip: '',
    ctaLabel: 'Buy Now',
    courseId: 'ai-engineering-select',
    courseTitle: 'AI Engineering Select Program',
    isDemo: true,
    verificationNote:
      'program pricing and internship/stipend terms will be published here once confirmed by TKSR.',
  },
  investment: {
    id: 'career-investment',
    title: 'Career Investment',
    figure: '₹1.5 LAKH',
    figureSupport: 'Build skills targeted toward',
    outcomeMetric: '₹30L+',
    outcomeLabel: 'Career Opportunities',
    ratioValue: '20×',
    ratioCaption: 'salary-to-program-cost ratio',
    supportParagraph:
      "Don't spend years collecting certificates. Spend focused time building skills companies can see.",
    ctaLabel: 'Start My AI Journey',
    ctaTo: '/courses',
  },
  opportunities: {
    id: 'opportunities',
    badge: 'Opportunity Feed',
    title: 'Jobs & Career Opportunities',
    support:
      'Career opportunities and sample roles. Explore details and apply through the available routes.',
    status: { label: 'Demo data', kind: 'demo' },
    previewLimit: 3,
    ctaLabel: 'View All Career Opportunities',
    ctaTo: '/jobs',
    note: 'Sample/demo opportunity data — live jobs and direct application routing will be connected in a future phase.',
    
  },
}

/** The existing jobs architecture is the single source of truth — no second data system. */
export function getOpportunityPreviewJobs(limit: number): Job[] {
  return jobs.slice(0, limit)
}