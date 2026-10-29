/**
 * Deterministic, data-backed urgency signals for career opportunities.
 *
 * These helpers ONLY turn explicit data (deadline, published date, status) into
 * readable signals. They never invent, estimate or assume any value: a missing or
 * unparseable date falls back to a safe, honest state. No countdown timers, no
 * seat counts, no application counts — this file deals strictly in date logic.
 *
 * A future backend/API phase can feed real dates through the exact same functions.
 */

export type JobUrgencyState = 'open' | 'closing-soon' | 'closed' | 'no-deadline'

/** Applications close within this many days → "Applications Closing Soon". */
export const CLOSING_SOON_THRESHOLD_DAYS = 7

/** A published date within this many days counts as "Recently Added". */
export const RECENTLY_ADDED_WINDOW_DAYS = 7

/** Parse a date-only ISO string (YYYY-MM-DD) into a local Date, or null when invalid. */
export function parseDateOnly(value: string | undefined | null): Date | null {
  if (!value) return null
  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(value.trim())
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const parsed = new Date(year, month, day)
  if (Number.isNaN(parsed.getTime())) return null
  // Reject overflowing values like 2026-13-40 that the Date constructor would roll over.
  if (parsed.getFullYear() !== year || parsed.getMonth() !== month || parsed.getDate() !== day) {
    return null
  }
  return parsed
}

function startOfToday(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/**
 * Calendar days from today until `deadline`. Negative = past, 0 = today,
 * null when the date is missing or invalid (safe fallback, never crashes).
 */
export function getDaysRemaining(deadline: string | undefined | null): number | null {
  const target = parseDateOnly(deadline)
  if (!target) return null
  const ms = target.getTime() - startOfToday().getTime()
  return Math.round(ms / 86_400_000)
}

/** Calendar days since a published date. Null when the date is missing or invalid. */
export function getDaysSince(publishedAt: string | undefined | null): number | null {
  const target = parseDateOnly(publishedAt)
  if (!target) return null
  const ms = startOfToday().getTime() - target.getTime()
  return Math.round(ms / 86_400_000)
}

/** True when the record was published within the "recently added" window. */
export function isRecentlyAdded(publishedAt: string | undefined | null): boolean {
  const days = getDaysSince(publishedAt)
  return days !== null && days >= 0 && days <= RECENTLY_ADDED_WINDOW_DAYS
}

/** Deterministic state from explicit data: status first, then computed date. */
export function getUrgencyState(
  deadline: string | undefined | null,
  status: string | undefined,
): JobUrgencyState {
  if (status === 'closed') return 'closed'
  const days = getDaysRemaining(deadline)
  if (days === null) return 'no-deadline'
  if (days < 0) return 'closed'
  if (days <= CLOSING_SOON_THRESHOLD_DAYS) return 'closing-soon'
  return 'open'
}

/** Readable, professional label for a computed urgency state. */
export function getUrgencyLabel(state: JobUrgencyState): string {
  switch (state) {
    case 'closed':
      return 'Applications Closed'
    case 'closing-soon':
      return 'Applications Closing Soon'
    case 'no-deadline':
    case 'open':
      return 'Applications Open'
  }
}

/** Human-readable date, e.g. "28 Sep 2026". Null when the date is missing/invalid. */
export function formatDeadline(deadline: string | undefined | null): string | null {
  const parsed = parseDateOnly(deadline)
  if (!parsed) return null
  return parsed.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** True when applications are still open (open, closing-soon, or no deadline). */
export function isOpportunityOpen(
  status: string | undefined,
  deadline: string | undefined | null,
): boolean {
  return getUrgencyState(deadline, status) !== 'closed'
}

/** Minimal shape needed to derive feed-level signals. */
export interface OpportunitySignalInput {
  deadline?: string | null
  status?: string
  publishedAt?: string | null
}

/**
 * Feed-level signals derived from the supplied records (never hardcoded).
 * Returns an empty array when no signal is supported by the data.
 */
export function getOpportunitySignals(records: OpportunitySignalInput[]): string[] {
  const signals: string[] = []
  if (records.some((r) => isRecentlyAdded(r.publishedAt))) {
    signals.push('Recently Added Opportunities')
  }
  if (records.some((r) => isOpportunityOpen(r.status, r.deadline))) {
    signals.push('Applications Open')
  }
  if (records.some((r) => getUrgencyState(r.deadline, r.status) === 'closing-soon')) {
    signals.push('Applications Closing Soon')
  }
  return signals
}