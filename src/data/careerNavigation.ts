/**
 * Centralized content for the "Projects & Jobs Career Navigation" section
 * (Phase 4) — two connected cards: "What Will You Build?" and
 * "Jobs & Career Opportunities".
 *
 * ROUTES are the single source of truth (exported once here):
 *   - Projects → /projects
 *   - Jobs     → /jobs
 *
 * CLAIM SAFETY
 * - Project tags are DERIVED from the existing project catalog
 *   (src/data/projects.ts) — nothing is invented. The sample project
 *   blueprints are not client work, production systems or deployed company
 *   systems, so no such claim is made and a footnote keeps that explicit.
 * - Job listings are demo/sample data → the Jobs card never says "live
 *   vacancies". Wording ("Opportunity Feed", "Career Opportunities") and the
 *   footnote keep demo transparency, matching the /jobs page behaviour.
 * - Icons are inline SVGs defined in CareerNavigationSection.vue
 *   (presentation, not content) — no emoji, no icon library.
 */

import { projects } from './projects'

export const PROJECTS_ROUTE = '/projects'
export const JOBS_ROUTE = '/jobs'

export interface CareerNavigationItem {
  id: string
  /** Card heading — kept compact, rendered uppercase via CSS. */
  title: string
  /** Supporting copy (reserved — not rendered in the compact nav strip). */
  description: string
  /** Chips/badges — for the projects card these are derived from project data. */
  tags: string[]
  ctaLabel: string
  /** Existing route (see PROJECTS_ROUTE / JOBS_ROUTE). */
  route: string
  isDemo: boolean
}

export interface CareerNavigationConfig {
  projects: CareerNavigationItem
  jobs: CareerNavigationItem
  footnote: string
}

/** Single source of truth for the displayed project categories. */
export function getProjectCategories(): string[] {
  return Array.from(new Set(projects.map((p) => p.category)))
}

export const careerNavigation: CareerNavigationConfig = {
  projects: {
    id: 'build',
    title: 'What Will You Build?',
    // Reserved supporting copy (not rendered in the compact nav strip).
    description: 'Build practical AI projects that demonstrate what you can actually do.',
    // Derived from the existing project catalog — never a hardcoded duplicate.
    tags: getProjectCategories(),
    ctaLabel: 'View Projects',
    route: PROJECTS_ROUTE,
    isDemo: true,
  },
  jobs: {
    id: 'opportunities',
    title: 'Jobs & Career Opportunities',
    // Reserved supporting copy (not rendered in the compact nav strip).
    description: 'Explore opportunities and understand what the market is looking for.',
    // Honest chips — no "live vacancies", no hiring-partnership claims.
    tags: ['Career Opportunities', 'Apply Now', 'Required Skills', 'Opportunity Feed'],
    ctaLabel: 'Explore Jobs',
    route: JOBS_ROUTE,
    isDemo: true,
  },
  footnote:
    'Project blueprints shown are sample/demo content, and job listings are demo opportunity data — not live vacancies, client work or deployed systems.',
}