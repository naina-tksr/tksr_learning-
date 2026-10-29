import type { EnrollmentIntent } from '../data/enrollment'

export interface EnrollmentResult {
  success: boolean
  /** Human-readable, non-technical message for the user. */
  message: string
  intent?: EnrollmentIntent
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim())
}

/**
 * API-ready enrollment intent submission.
 *
 * CURRENT (frontend-only): validates the input, simulates a short latency, and
 * returns a LOCAL result. It never claims backend processing or payment.
 *
 * FUTURE architecture (not implemented yet):
 *
 *   Website
 *     ↓
 *   Backend/API
 *     ↓
 *   Payment Gateway
 *     ↓
 *   Enrollment Database
 *     ↓
 *   Confirmation
 *
 * Swapping to a real backend later is a one-function change: replace the body
 * with a `fetch('/api/enrollments', { method: 'POST', body: JSON.stringify(intent) })`.
 */
export async function submitEnrollmentIntent(intent: EnrollmentIntent): Promise<EnrollmentResult> {
  if (!intent.name.trim()) {
    return { success: false, message: 'Please enter your name.' }
  }
  if (!isValidEmail(intent.email)) {
    return { success: false, message: 'Please enter a valid email address.' }
  }

  // Simulate network latency so the UI's submitting state is visible.
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Local-only acknowledgement. Deliberately honest: not a payment, not a
  // confirmation — an enrollment intent recorded for this demo experience.
  return {
    success: true,
    message:
      'Your request has been recorded locally for this demo experience. A real enrollment/payment confirmation will require the backend and payment integration.',
    intent,
  }
}