<script setup lang="ts">
/**
 * "Industry & Career Ecosystem" logo row — Phase 7 (reference-first).
 *
 * A calm STATIC wordmark row, not an animated marquee: the previous
 * two-track infinite-scroll chip animation is removed per the Phase 7 brief
 * (calm/premium, no autoplay transforms, no overflow/masking risk, no hover
 * movement). The underlying data — hiringPartners in src/data/site.ts — is
 * reused exactly as-is and is documented there as demonstration content, so
 * this strip stays presentation-only and never implies a verified partner or
 * employer network. Plain subdued wordmarks replace the old bordered chips for
 * a consistent, uncompetitive visual weight inside the white ecosystem band.
 *
 * A11y: a semantic list of text names (no fake empty-alt "logo" images). The
 * section heading + demo note above/below supply the context.
 */
import { hiringPartners } from '../data/site'

const partners = hiringPartners
</script>

<template>
  <ul class="eco-logo-row" role="list">
    <li v-for="p in partners" :key="p.name" class="eco-logo">{{ p.name }}</li>
  </ul>
</template>

<style scoped>
.eco-logo-row {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 30px;
}

/* Subdued, uniformly weighted wordmark — no brand-color noise, no chips,
   no shadows, no animation. text-overflow safe via white-space. */
.eco-logo {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.3;
  color: var(--muted);
  white-space: nowrap;
}

/* Mobile: slightly smaller wordmarks, tighter wrap rhythm. */
@media (max-width: 640px) {
  .eco-logo-row {
    gap: 8px 22px;
  }

  .eco-logo {
    font-size: 14px;
  }
}
</style>