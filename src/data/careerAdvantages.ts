/**
 * Centralized content for the homepage "4 Reasons to Build Your Career
 * Differently" section (Phase 21 rebuild — manager-approved business copy).
 *
 * CLAIM SAFETY (as explicitly approved by the TKSR manager for this section)
 * ------------
 * 1. The internship / stipend / full-time wording below is manager-approved:
 *      - performance-based paid internship opportunity, stipend up to ₹50K,
 *      - 1-month paid internship,
 *      - potential full-time opportunity,
 *      - potential project → career progression within 2 months.
 * 2. Qualifiers are preserved exactly: "performance-based", "selected
 *    learners", "subject to eligibility and performance", and "potential
 *    full-time opportunity". Nothing here states a guaranteed internship,
 *    employment, placement, salary or conversion.
 * 3. No additional figures beyond the approved ones above are introduced.
 *
 * PHASE 21.1 NOTE
 * ---------------
 * The approved career-opportunity copy has ONE primary visual home: the
 * highlighted `careerOpportunity` panel rendered directly below the enrolment
 * countdown (see EnrollmentUrgencyBanner.vue). Card 04 therefore no longer
 * carries an opportunity panel or the "Limited Internal Project Slots — Join
 * Early" wording — it keeps its approved title/description plus
 * industry-expectation benefit blocks so the card stays visually balanced.
 */

export interface CareerBenefit {
  /** Semantic inline icon key, rendered by CareerAdvantagesSection.vue. */
  icon: string
  /** Strong short label, e.g. "₹50K". */
  label: string
  /** Smaller supporting text beneath the label (optional). */
  text?: string
  /** Visual emphasis for the key numeric value (e.g. the ₹50K block). */
  highlight?: boolean
}

/** Approved career-opportunity copy shared by the homepage opportunity
 *  highlight (single source of truth — avoid duplicating text in data files). */
export interface CareerOpportunity {
  /** Bold primary statement rendered before the highlighted value. */
  message: string
  /** Numeric highlight rendered with the strongest emphasis (e.g. "Up to ₹50K"). */
  highlight: string
  /** Strong suffix (e.g. "+ Potential Full-Time Opportunity"). */
  outcome: string
  /** Smaller supporting text under the primary statement. */
  supportingText: string
}

export interface CareerAdvantage {
  id: string
  /** Visual card number label, e.g. "01". */
  number: string
  title: string
  description: string
  /** Compact structured benefit blocks. */
  benefits: CareerBenefit[]
}

export interface CareerAdvantagesConfig {
  eyebrow: string
  headline: string
  advantages: CareerAdvantage[]
}

export const careerOpportunity: CareerOpportunity = {
  message: '1-Month Paid Internship',
  highlight: 'Up to ₹50K',
  outcome: '+ Potential Full-Time Opportunity',
  supportingText:
    'With the potential to convert your project involvement within just 2 months, build longer-term career stability and elevate your earning potential.',
}

export const careerAdvantages: CareerAdvantagesConfig = {
  eyebrow: 'The TKSR Career Advantage',
  headline: '4 Reasons to Build Your Career Differently',
  advantages: [
    {
      id: 'performance-opportunity',
      number: '01',
      title: 'Performance-Based Paid Internship Opportunity — Up to ₹50K',
      description:
        'Stand out through your performance and earn the opportunity to work with TKSR. Selected learners may be considered for a working internship with a stipend of up to ₹50,000, subject to eligibility and performance.',
      benefits: [
        { icon: 'user-check', label: 'Top Performers', text: 'Performance-based selection' },
        { icon: 'banknote', label: '₹50K', text: 'Up to ₹50K stipend', highlight: true },
        { icon: 'briefcase', label: 'Working Internship', text: 'Opportunity with TKSR' },
      ],
    },
    {
      id: 'corporate-workflow',
      number: '02',
      title: 'Experience a Real Corporate Workflow',
      description:
        'Learn beyond theory through exposure to project planning, Scrum calls, task allocation, team collaboration, reviews, deadlines, and professional workflows.',
      benefits: [
        { icon: 'target', label: 'Project Planning' },
        { icon: 'chat', label: 'Scrum Calls' },
        { icon: 'users', label: 'Team Collaboration' },
        { icon: 'clock', label: 'Real Deadlines' },
      ],
    },
    {
      id: 'real-working-experts',
      number: '03',
      title: 'Work With Real Working Experts',
      description:
        'Get live interaction with TKSR working professionals and learn how AI projects are actually executed in a professional environment.',
      benefits: [
        { icon: 'mentor', label: 'Live Mentorship' },
        { icon: 'layers', label: 'Real Project Exposure' },
        { icon: 'bulb', label: 'Industry Insights' },
      ],
    },
    {
      id: 'industry-expectations',
      number: '04',
      title: 'Direct Exposure to Industry Expectations',
      description:
        'Understand what companies expect from professionals — not just what to learn, but how to work.',
      benefits: [
        { icon: 'target', label: 'Company Expectations', text: 'What professionals need' },
        { icon: 'users', label: 'How Teams Work', text: 'Collaboration in practice' },
        { icon: 'layers', label: 'Role Readiness', text: 'Skills that translate' },
      ],
    },
  ],
}