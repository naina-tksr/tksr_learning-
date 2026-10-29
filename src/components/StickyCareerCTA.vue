<script setup lang="ts">
/**
 * Phase 5 — Sticky "Buy Now" career CTA (homepage only; mounted in App.vue with v-if).
 *
 * LEFT  : circular gradient rocket icon + "Don't Just Get a Certificate.
 *         Build Something Companies Can See."
 * RIGHT : the EXISTING BuyNowButton → EnrollmentModal flow, using the same safe
 *         "AI Engineering Select Program" identity as the Phase 2 conversion card
 *         (no price, no invented claims, no second modal/service/checkout).
 *
 * Layers (existing system values — unchanged):
 *   - bar z-index 90  → above page content, BELOW the sticky header (100) so the
 *                       mobile menu always covers it, and BELOW the enrollment
 *                       modal overlay (1000).
 *   - an in-flow spacer after the footer keeps the footer clear of the fixed bar.
 */
import BuyNowButton from './BuyNowButton.vue'

const COURSE_ID = 'ai-engineering-select'
const COURSE_TITLE = 'AI Engineering Select Program'

/** Inline rocket icon (presentation only, consistent with the site icon set). */
const rocketIcon =
  '<path d="M12 2.5c2.6 0 4.5 2.3 4.5 5.2 0 1.7-.4 3-.9 4.3H8.4c-.5-1.3-.9-2.6-.9-4.3C7.5 4.8 9.4 2.5 12 2.5Z"/><path d="M8.4 12h7.2"/><path d="M12 12v3.5"/><path d="M8.5 18.5h7"/><path d="M12 15.5v3"/><circle cx="12" cy="7.2" r="1.2"/>'
</script>

<template>
  <!-- In-flow clearance so the fixed bar never hides footer content at page end. -->
  <div class="scta-spacer" aria-hidden="true"></div>

  <aside class="scta" role="region" aria-label="Program enrollment call to action">
    <div class="scta-left">
      <span class="scta-icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          v-html="rocketIcon"
        />
      </span>
      <p class="scta-text">Stop Chasing Jobs. Start Building Your Career.</p>
    </div>
    <div class="scta-action">
      <BuyNowButton :course-id="COURSE_ID" :course-title="COURSE_TITLE" />
    </div>
  </aside>
</template>

<style scoped>
.scta-spacer {
  height: 110px;
}

/* ---- premium floating conversion bar ---- */
.scta {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 16px;
  z-index: 90;
  width: min(1180px, calc(100% - 32px));
  display: flex;
  align-items: center;
  gap: 18px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 20px;
  box-shadow:
    0 24px 60px rgba(13, 31, 78, 0.16),
    0 6px 18px rgba(13, 31, 78, 0.08);
  padding: 14px 18px 14px 14px;
  animation: scta-in 0.45s ease 0.1s both;
}

@keyframes scta-in {
  from {
    transform: translate(-50%, 140%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
}

.scta-left {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  flex: 1;
}

/* circular gradient rocket badge */
.scta-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--gradient);
  color: #fff;
  box-shadow: 0 8px 18px rgba(79, 70, 229, 0.3);
}

.scta-icon svg {
  width: 22px;
  height: 22px;
}

.scta-text {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.4;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.scta-action {
  flex-shrink: 0;
}

/* green existing .btn-buy — keep system styling, guarantee touch target */
.scta-action :deep(.btn-buy) {
  min-height: 46px;
  padding: 12px 28px;
  font-size: 15px;
  font-weight: 800;
  white-space: nowrap;
  border-radius: 999px;
}

@media (max-width: 640px) {
  .scta-spacer {
    height: 186px;
  }

  .scta {
    bottom: 10px;
    width: calc(100% - 20px);
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 14px;
  }

  .scta-left {
    gap: 12px;
  }

  .scta-icon {
    width: 40px;
    height: 40px;
  }

  .scta-icon svg {
    width: 20px;
    height: 20px;
  }

  .scta-text {
    font-size: 14px;
    line-height: 1.45;
  }

  .scta-action :deep(.btn-buy) {
    width: 100%;
    justify-content: center;
    padding: 13px 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scta {
    animation: none;
  }
}
</style>