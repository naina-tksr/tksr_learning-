/**
 * Repeating 48-hour countdown helpers for the enrolment urgency banner.
 *
 * The cycle is a pure UI mechanism: it loops forever and is explicitly NOT a
 * verified admission deadline. No timers live here — the component drives the
 * one-second tick and feeds `Date.now()` through these functions, so the
 * displayed time is ALWAYS recomputed from the clock (never decremented),
 * which keeps it accurate even when JavaScript execution is delayed.
 *
 * Persistence: a stable localStorage key holds the timestamp at which the
 * CURRENT cycle started. Every read resolves expired cycles — including
 * several cycles that may have elapsed while the tab or browser was closed —
 * so the timer never goes negative and never stops at zero. Because every tab
 * reads the same stored key, all tabs share one cycle.
 */

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** Total milliseconds remaining, never negative. */
  totalMs: number
}

/** One full countdown cycle: 48 hours in milliseconds. */
export const CYCLE_DURATION_MS = 48 * 60 * 60 * 1000

/** Stable localStorage key — the single source of truth shared by every tab. */
export const CYCLE_STORAGE_KEY = 'tksr_enrollment_countdown_start'

export interface CycleInfo {
  /** Timestamp (ms) at which the current cycle started. */
  cycleStart: number
  /** Milliseconds remaining in the current cycle, clamped to (0, CYCLE_DURATION_MS]. */
  remainingMs: number
}

/** Minimal storage surface so the helpers stay testable without a DOM. */
export interface CycleStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

/**
 * Resolve the current 48-hour cycle and its remaining time.
 *
 * - First visit (or missing/corrupted value) → seeds `now` as the cycle start.
 * - Stored start in the future (clock skew / tampered value) → re-seeds.
 * - One or more full cycles elapsed while away → advances deterministically to
 *   the start of the current cycle (never negative, never stuck at zero).
 * - `remainingMs` is clamped to at least 1 ms so a read exactly on the cycle
 *   boundary immediately reflects the freshly restarted cycle.
 *
 * Storage failures (e.g. blocked localStorage in private mode) degrade
 * gracefully: the cycle still computes in memory for this session.
 */
export function getCycleRemaining(
  now: number,
  key: string = CYCLE_STORAGE_KEY,
  storage: CycleStorage = window.localStorage,
): CycleInfo {
  const duration = CYCLE_DURATION_MS

  let stored: number | null = null
  try {
    const raw = storage.getItem(key)
    if (raw !== null) {
      const parsed = Number(raw)
      stored = Number.isFinite(parsed) ? parsed : null
    }
  } catch {
    stored = null
  }

  let cycleStart: number
  if (stored === null || stored > now) {
    // First visit / corrupted / future value → begin a fresh cycle now.
    cycleStart = now
    try {
      storage.setItem(key, String(cycleStart))
    } catch {
      /* storage unavailable — in-memory cycle only */
    }
  } else {
    const elapsed = now - stored
    const cyclesElapsed = Math.floor(elapsed / duration)
    if (cyclesElapsed > 0) {
      // Advance straight to the start of the current cycle (handles many
      // missed cycles in one step — no negative or oversized remainder).
      cycleStart = stored + cyclesElapsed * duration
      try {
        storage.setItem(key, String(cycleStart))
      } catch {
        /* storage unavailable — in-memory cycle only */
      }
    } else {
      cycleStart = stored
    }
  }

  const rawRemaining = duration - (now - cycleStart)
  // Clamp to [1, duration - 1]: a seed/restart within the same millisecond as
  // Date.now() would otherwise show exactly 48h → "02 Days 00 Hours" (floor of
  // 172800s / 86400). The upper bound keeps a fresh cycle at 01:23:59:59 and
  // the lower bound ensures the display never sticks at zero.
  return { cycleStart, remainingMs: Math.min(duration - 1, Math.max(1, rawRemaining)) }
}

/** Split remaining milliseconds into clamped, non-negative day/hour/min/sec parts. */
export function getCountdownParts(remainingMs: number): CountdownParts {
  const totalSecs = Math.max(0, Math.floor(remainingMs / 1000))
  const days = Math.floor(totalSecs / 86_400)
  const hours = Math.floor((totalSecs % 86_400) / 3_600)
  const minutes = Math.floor((totalSecs % 3_600) / 60)
  const seconds = totalSecs % 60
  return { days, hours, minutes, seconds, totalMs: Math.max(0, remainingMs) }
}

/** Two-digit display padding, e.g. 4 → "04". */
export function pad2(value: number): string {
  return String(value).padStart(2, '0')
}

/** Compact human summary of remaining time (days, hours, minutes) for screen readers. */
export function formatRemainingSummary(remainingMs: number): string {
  const { days, hours, minutes } = getCountdownParts(remainingMs)
  const parts: string[] = []
  if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`)
  parts.push(`${hours} hour${hours === 1 ? '' : 's'}`)
  parts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`)
  return parts.join(', ')
}