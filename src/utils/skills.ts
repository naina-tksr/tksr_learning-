/**
 * Deterministic skill comparison utilities.
 *
 * Matching is intentionally simple — case/whitespace/punctuation normalization
 * only. No semantic or AI matching: "Python" never implies "Machine Learning",
 * "AWS" never implies "Azure", etc. Skills only match when they are literally
 * the same after normalization.
 */

export function normalizeSkill(skill: string): string {
  return skill.trim().replace(/\s+/g, ' ').toLowerCase()
}

/** True when two skills are the same after normalization (e.g. "Power BI" vs "power bi"). */
export function skillsMatch(requiredSkill: string, learnerSkill: string): boolean {
  return normalizeSkill(requiredSkill) === normalizeSkill(learnerSkill)
}

/** Number of items in `required` that are also present in `have` (deterministic). */
export function skillOverlap(required: string[], have: string[]): number {
  return required.filter((r) => have.some((h) => skillsMatch(r, h))).length
}