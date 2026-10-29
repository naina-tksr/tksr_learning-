/**
 * Trust & Proof content (Phase 8).
 *
 * Trust is communicated through transparent, evidence-based information — never
 * fabricated numbers. Where underlying data is sample/demo (experts, projects,
 * jobs), the UI labels it as such. Verified proof (real learner stories,
 * confirmed partner listings) will be added here only when it actually exists.
 */

export interface TrustCard {
  id: string
  icon: string
  title: string
  description: string
  points: string[]
  /** Destination for the card CTA. Supports internal routes and anchors. */
  href: string
  cta: string
}

export interface TrustJourneyStep {
  step: string
  label: string
  detail: string
}

export const trustCards: TrustCard[] = [
  {
    id: 'skills',
    icon: '🛠️',
    title: 'Industry-Relevant Skills',
    description: 'Programs are built around the modern tools and practices teams use today.',
    points: ['Modern technologies', 'Practical implementation', 'Career-focused learning'],
    href: '/courses',
    cta: 'Explore Programs',
  },
  {
    id: 'experts',
    icon: '👩‍🏫',
    title: 'Expert Guidance',
    description: 'Learning is shaped by practitioners with hands-on technology and industry experience.',
    points: ['Industry experience', 'Technology expertise', 'Practical guidance'],
    href: '#experts',
    cta: 'See Practitioner Profiles',
  },
  {
    id: 'projects',
    icon: '🚀',
    title: 'Real-World Projects',
    description: 'Projects follow a practical journey from concept to a portfolio you can show.',
    points: ['Problem solving', 'Build and deploy', 'Portfolio development'],
    href: '/projects',
    cta: 'View Projects',
  },
  {
    id: 'opportunities',
    icon: '🎯',
    title: 'Career Opportunity Awareness',
    description: 'Understand what roles require, which skills you may need, and what to build toward.',
    points: ['Current opportunity structure', 'Required skill visibility', 'Program-to-skill alignment'],
    href: '/jobs',
    cta: 'Explore Opportunities',
  },
]

/** The TKSR learning journey. A process description — never a job guarantee. */
export const trustJourney: TrustJourneyStep[] = [
  { step: '01', label: 'Learn', detail: 'Build industry-relevant skills' },
  { step: '02', label: 'Build', detail: 'Work on practical projects' },
  { step: '03', label: 'Apply Skills', detail: 'Solve problems with what you learned' },
  { step: '04', label: 'Build Portfolio', detail: 'Create work you can show' },
  { step: '05', label: 'Explore Opportunities', detail: 'See where your skills align with roles' },
]