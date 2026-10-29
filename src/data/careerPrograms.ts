import { courses, type Course } from './site'
import type { Job } from './jobs'
import { skillsMatch } from '../utils/skills'

/**
 * Career Program — a career-oriented view over the existing TKSR course catalog.
 *
 * One source of truth: programs are DERIVED from `courses` (src/data/site.ts),
 * never maintained as a second catalog. Skills and career roles come from the
 * optional `careerSkills` / `careerRoles` fields added to each course.
 *
 * The skill ↔ career-role mapping is SAMPLE/EXPLORATORY data for career
 * storytelling — it is not a verified claim about placements or outcomes.
 */
export interface CareerProgram {
  id: string
  courseId: string
  title: string
  category: string
  description: string
  duration: string
  level: string
  skills: string[]
  careerRoles: string[]
  isDemo: boolean
}

export const careerPrograms: CareerProgram[] = courses.map((c: Course) => ({
  id: c.id,
  courseId: c.id,
  title: c.title,
  category: c.category,
  description: c.summary,
  duration: c.duration,
  level: c.level,
  skills: c.careerSkills ?? [],
  careerRoles: c.careerRoles ?? [],
  isDemo: true,
}))

export function getCareerPrograms(): CareerProgram[] {
  return careerPrograms
}

export function getCareerProgramById(id: string): CareerProgram | undefined {
  return careerPrograms.find((p) => p.id === id || p.courseId === id)
}

/**
 * A resolved program suggestion for a job, with an explainable reason:
 * - 'mapped'      → the job explicitly lists this program via `programId`.
 * - 'skill-match' → the program shares required skills with the job
 *                   (deterministic exact-match only; score = number of shared skills).
 */
export interface ProgramMatch {
  program: CareerProgram
  reason: 'mapped' | 'skill-match'
  overlap: number
}

const MIN_SKILL_OVERLAP = 2

/**
 * Deterministic, non-AI resolver.
 * 1. Resolves `job.programId` (the explicit mapping) if present and valid.
 * 2. Adds programs that share >= MIN_SKILL_OVERLAP required skills, best first.
 * Never invents a relationship: if nothing matches, the list is empty and the
 * UI shows "no matching TKSR program currently mapped".
 */
export function resolveProgramsForJob(job: Job): ProgramMatch[] {
  const results: ProgramMatch[] = []
  const seen = new Set<string>()

  if (job.programId) {
    const mapped = getCareerProgramById(job.programId)
    if (mapped) {
      results.push({
        program: mapped,
        reason: 'mapped',
        overlap: job.skills.filter((s) => mapped.skills.some((ps) => skillsMatch(s, ps))).length,
      })
      seen.add(mapped.courseId)
    }
  }

  const skillMatched = careerPrograms
    .filter((p) => !seen.has(p.courseId))
    .map((p) => ({
      program: p,
      overlap: job.skills.filter((s) => p.skills.some((ps) => skillsMatch(s, ps))).length,
    }))
    .filter((m) => m.overlap >= MIN_SKILL_OVERLAP)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 2)

  for (const m of skillMatched) {
    results.push({ program: m.program, reason: 'skill-match', overlap: m.overlap })
  }

  return results
}