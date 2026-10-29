<script setup lang="ts">
/**
 * Batch-enrolment urgency banner shown immediately below the homepage hero.
 *
 * HONESTY CONTRACT (repeating cycle):
 * - The countdown is a UI engagement mechanism that loops a 48-hour cycle
 *   forever. It is explicitly NOT a verified admission deadline and the banner
 *   copy never claims deadlines, seats, discounts or scarcity figures.
 * - The cycle start is persisted in localStorage
 *   (`tksr_enrollment_countdown_start`) so the countdown survives refresh,
 *   browser restarts and is shared by every open tab.
 * - Time is always recomputed from `Date.now()` (never decremented), so the
 *   timer stays accurate even when JavaScript execution is delayed.
 */
import { computed, onBeforeUnmount, ref } from 'vue'
import { enrollmentBatch } from '../data/enrollmentBatch'
import { careerOpportunity } from '../data/careerAdvantages'
import {
  CYCLE_STORAGE_KEY,
  formatRemainingSummary,
  getCountdownParts,
  getCycleRemaining,
  pad2,
} from '../utils/countdown'

interface Props {
  /** Overrides the configured headline when provided. */
  headline?: string
}

withDefaults(defineProps<Props>(), {
  headline: enrollmentBatch.headline,
})

/** Milliseconds remaining in the current 48-hour cycle (source of truth: localStorage). */
const remainingMs = ref(0)

/**
 * Recompute the remaining time from the shared cycle timestamp.
 * Runs once synchronously at setup (no 00:00:00 flash) and then every tick,
 * on tab return and when another tab writes the storage key.
 */
function refresh(): void {
  const { remainingMs: ms } = getCycleRemaining(Date.now())
  remainingMs.value = ms
}

refresh()

const parts = computed(() => getCountdownParts(remainingMs.value))
const digitValues = computed<readonly number[]>(() => [
  parts.value.days,
  parts.value.hours,
  parts.value.minutes,
  parts.value.seconds,
])

const countdownAriaLabel = computed(
  () =>
    `Time remaining in the current 48-hour enrolment cycle: ${formatRemainingSummary(remainingMs.value)}`,
)

const srSummary = computed(
  () =>
    `Enrolment cycle restarts every 48 hours. Time remaining: ${formatRemainingSummary(remainingMs.value)}.`,
)

/* ---- one-second tick, always a single interval, always cleaned up ---- */
let timer: number | undefined

function stopTimer(): void {
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function startTimer(): void {
  stopTimer() // never stack intervals
  timer = window.setInterval(() => {
    refresh()
  }, 1000)
}

startTimer()

/* ---- recalculate immediately when the tab becomes visible again ---- */
function onVisibilityChange(): void {
  if (document.visibilityState === 'visible') refresh()
}
document.addEventListener('visibilitychange', onVisibilityChange)

/* ---- another tab re-seeded/advanced the cycle → adopt it instantly ---- */
function onStorage(event: StorageEvent): void {
  if (event.key === null || event.key === CYCLE_STORAGE_KEY) refresh()
}
window.addEventListener('storage', onStorage)

onBeforeUnmount(() => {
  stopTimer()
  document.removeEventListener('visibilitychange', onVisibilityChange)
  window.removeEventListener('storage', onStorage)
})
</script>

<template>
  <section class="enrollment-urgency" aria-labelledby="enrollment-urgency-title">
    <div class="container">
      <div class="eub-banner">
        <div class="eub-glow eub-glow--a" aria-hidden="true"></div>
        <div class="eub-glow eub-glow--b" aria-hidden="true"></div>

        <div class="eub-copy">
          <div class="eub-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <div class="eub-copy-text">
            <p class="eub-kicker">Batch Enrollment Spotlight</p>
            <h2 id="enrollment-urgency-title">{{ headline }}</h2>
            <p class="eub-sub">{{ enrollmentBatch.cycleLabel }}</p>
          </div>
        </div>

        <div class="eub-countdown" role="timer" :aria-label="countdownAriaLabel">
          <template v-for="(label, i) in enrollmentBatch.unitLabels" :key="label">
            <div class="eub-unit">
              <span class="eub-digit">{{ pad2(digitValues[i]) }}</span>
              <span class="eub-label">{{ label }}</span>
            </div>
            <span
              v-if="i < enrollmentBatch.unitLabels.length - 1"
              class="eub-sep"
              aria-hidden="true"
            >:</span>
          </template>
        </div>

        <!-- Career opportunity highlight (Phase 21.1): the approximate copy
             from the old Card 04 panel now lives here — directly below the
             countdown and above the honesty metadata, with ONE primary home.
             Read-only consumption of the shared careerOpportunity data (no
             countdown logic is touched). -->
        <div class="eub-opp">
          <span class="eub-opp-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2.5 5 13.5h5.6L10 21.5l8-11h-5.6l.6-8Z"/></svg>
          </span>
          <p class="eub-opp-kicker">Career Opportunity</p>
          <p class="eub-opp-main">
            <span class="eub-opp-msg">{{ careerOpportunity.message }}</span>
            <span class="eub-opp-sep" aria-hidden="true">→</span>
            <strong class="eub-opp-rupee">{{ careerOpportunity.highlight }}</strong>
            <span class="eub-opp-sep" aria-hidden="true">+</span>
            <span class="eub-opp-outcome">{{ careerOpportunity.outcome }}</span>
          </p>
          <p class="eub-opp-note">{{ careerOpportunity.supportingText }}</p>
        </div>

        <p class="eub-meta">
          <span class="eub-badge">{{ enrollmentBatch.metaBadge }}</span>
          <span class="eub-meta-text">{{ enrollmentBatch.metaText }}</span>
        </p>
      </div>

      <p class="eub-sronly">{{ srSummary }}</p>
    </div>
  </section>
</template>

<style scoped>
/* ---- section shell (Part D) ---- */
.enrollment-urgency {
  position: relative;
  /* Compact white gap below the hero (reference keeps ~18–28px). */
  padding: 0 0 64px;
}

/* ---- gradient panel (C1): wide centered rounded banner ---- */
.eub-banner {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 10px;
  padding: 16px 30px 14px;
  border-radius: 16px;
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 22px 50px rgba(29, 78, 216, 0.35);
}

.eub-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.eub-glow--a {
  width: 360px;
  height: 360px;
  top: -170px;
  right: -110px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.16), transparent 65%);
}

.eub-glow--b {
  width: 320px;
  height: 320px;
  bottom: -190px;
  left: -90px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 65%);
}

/* ---- copy column (C2/C5): icon beside centered headline ---- */
.eub-copy {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-width: 0;
  margin-right: 0;
}

.eub-ico {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.eub-ico svg {
  width: 15px;
  height: 15px;
}

.eub-copy-text {
  min-width: 0;
}

/* Kicker is kept in the DOM for screen-reader context but removed from the
   reference composition (headline + countdown only). */
.eub-kicker {
  display: none;
}

.eub-copy h2 {
  margin: 0;
  font-size: clamp(1.2rem, 2.2vw, 1.4rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.eub-sub {
  margin-top: 4px;
  font-size: 12.5px;
  font-weight: 600;
  opacity: 0.85;
}

/* ---- countdown (C4): one compact digit row with colon separators ---- */
.eub-countdown {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;
  margin-left: 0;
}

.eub-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  min-width: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  background: transparent;
}

.eub-digit {
  font-size: clamp(1.75rem, 3.6vw, 2.1rem);
  font-weight: 800;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  letter-spacing: 1px;
}

.eub-label {
  margin-top: 0;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  opacity: 0.75;
}

.eub-sep {
  font-size: 1.7rem;
  font-weight: 800;
  line-height: 1.15;
  opacity: 0.5;
}

/* ---- career opportunity highlight (Phase 21.1) ---- */
/* Premium white card placed directly below the countdown — visually connected
   to the gradient banner but clearly a separate block. Approved copy comes
   from the shared careerOpportunity object in careerAdvantages.ts, so it has
   exactly ONE primary visual home on the page. */
.eub-opp {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  max-width: 560px;
  margin-top: 4px;
  padding: 13px 18px 12px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 16px 34px rgba(13, 31, 78, 0.22);
  color: var(--ink);
}

.eub-opp-ico {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gradient);
  color: #fff;
}

.eub-opp-ico svg {
  width: 15px;
  height: 15px;
}

.eub-opp-kicker {
  margin: 0;
  font-size: 10.5px;
  font-weight: 800;
  line-height: 1.4;
  letter-spacing: 1.6px;
  text-transform: uppercase; /* visual only — accessible text unchanged */
  color: #4f46e5;
}

.eub-opp-main {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  column-gap: 7px;
  row-gap: 3px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  color: #1e293b;
}

.eub-opp-msg {
  font-weight: 700;
}

.eub-opp-sep {
  font-weight: 800;
  color: #4f46e5;
}

/* The ₹50K value is the panel's strongest element — largest, boldest, with
   the indigo→violet gradient accent. Fallback color keeps it readable even
   where background-clip text is unsupported. */
.eub-opp-rupee {
  font-size: 19px;
  font-weight: 800;
  line-height: 1.2;
  color: #4f46e5;
}

@supports ((-webkit-background-clip: text) or (background-clip: text)) {
  .eub-opp-rupee {
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
}

.eub-opp-outcome {
  font-weight: 700;
}

.eub-opp-note {
  margin: 0;
  max-width: 480px;
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--muted);
}

/* ---- honest meta row ---- */
.eub-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 2px;
  padding-top: 8px;
  border-top: 1px dashed rgba(255, 255, 255, 0.25);
  font-size: 11.5px;
  line-height: 1.5;
  opacity: 0.95;
}

.eub-badge {
  flex-shrink: 0;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.16);
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.eub-meta-text {
  min-width: 0;
}

/* ---- screen-reader-only summary ---- */
.eub-sronly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* ---- responsive: the centered composition holds at every width ---- */
@media (max-width: 560px) {
  .enrollment-urgency {
    padding: 0 0 56px;
  }

  .eub-banner {
    gap: 10px;
    padding: 16px 14px 14px;
    border-radius: 14px;
  }

  .eub-copy {
    gap: 10px;
  }

  .eub-ico {
    width: 24px;
    height: 24px;
  }

  .eub-ico svg {
    width: 12px;
    height: 12px;
  }

  .eub-copy h2 {
    font-size: 0.98rem;
  }

  .eub-sub {
    font-size: 11px;
  }

  .eub-countdown {
    gap: 4px;
  }

  .eub-unit {
    gap: 4px;
  }

  .eub-digit {
    font-size: 1.4rem;
    letter-spacing: 0.5px;
  }

  .eub-label {
    font-size: 8.5px;
    letter-spacing: 1.2px;
  }

  .eub-sep {
    font-size: 1.3rem;
  }

  .eub-opp {
    max-width: 100%;
    margin-top: 6px;
    padding: 12px 14px 11px;
    border-radius: 12px;
  }

  .eub-opp-rupee {
    font-size: 17px;
  }

  .eub-opp-note {
    font-size: 11px;
  }

  .eub-meta {
    font-size: 11px;
  }
}
</style>