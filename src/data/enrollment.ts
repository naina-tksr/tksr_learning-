/**
 * Enrollment intent model (frontend-only).
 *
 * This represents an ENQUIRY / ENROLLMENT INTENT, not a payment or a confirmed
 * enrollment. No personal data is persisted anywhere on this site today — the
 * modal keeps it in local component state only, and this record exists purely
 * as a typed contract for the service layer.
 *
 * Privacy: we collect only what is needed to follow up (name, email, optional
 * phone). Never passwords, card numbers, CVV, bank details or government IDs.
 */

export interface EnrollmentIntent {
  courseId: string
  courseTitle: string
  name: string
  email: string
  phone?: string
  /** ISO timestamp of when the intent was submitted locally. */
  submittedAt: string
  /** 'intent' = provisional request; 'enquiry' = needs follow-up. Both are non-binding. */
  status: 'intent' | 'enquiry'
  /** Always true today — there is no live backend behind this form. */
  isDemo: boolean
}