/**
 * Batch-enrolment urgency configuration for the homepage banner.
 *
 * HONESTY CONTRACT:
 * - The banner runs a REPEATING 48-hour countdown cycle (logic in
 *   utils/countdown.ts). It is a UI engagement mechanism only — it loops
 *   forever and is explicitly NOT a verified admission deadline.
 * - No fabricated dates, seat counts, discounts or deadlines are ever shown.
 * - The headline is the approved reference-design copy and is kept as-is.
 */

export interface EnrollmentBatchConfig {
  /** Banner headline — approved concept from the reference design. */
  headline: string
  /** Short line shown above the countdown (recurring-cycle wording). */
  cycleLabel: string
  /** Labels rendered under the countdown digits, in order: Days | Hours | Mins | Secs. */
  unitLabels: readonly [string, string, string, string]
  /** Pill badge beside the meta text. */
  metaBadge: string
  /** Honest explanation under the countdown (recurring-cycle wording). */
  metaText: string
}

export const enrollmentBatch: EnrollmentBatchConfig = {
  headline: 'Limited Internal Project Slots — Join Early',
  cycleLabel: 'Next Cycle Starts in',
  unitLabels: ['Days', 'Hours', 'Mins', 'Secs'],
  metaBadge: 'Repeating 48-Hour Cycle',
  metaText:
    'A rolling 48-hour presentation countdown — it restarts automatically and is not a confirmed admission deadline. Verified TKSR batch dates will be announced separately.',
}