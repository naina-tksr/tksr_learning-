<script setup lang="ts">
/**
 * "Three Core Career USPs" — Phase 6 (reference-first).
 *
 * Compact centered block: pill eyebrow → dark navy heading → muted lead,
 * then three equal premium USP cards (icon tile / title / hook / description /
 * check-chips). Rendered data-driven from src/data/usps.ts — everything visible
 * (titles, hooks, descriptions, highlights) is the existing approved copy; the
 * `icon` keys there select matching inline SVG line icons (no emoji, no icon
 * library, no external assets).
 *
 * Reference rhythm (Part Q): the white Projects+Jobs strip above and the white
 * Industry & Ecosystem section below sandwich this soft near-white surface, so
 * the page alternates soft → white → soft without two identical large
 * backgrounds touching. No animations, no hover transforms, no gradient
 * headings — the heading stays dark navy like the phase 4/5 sections.
 *
 * Claim safety (unchanged contract, see usps.ts): no live-vacancy/salary/
 * placement/company guarantees are introduced; the approved honest copy
 * ("career-opportunity feed is coming soon", "sample/demo") is untouched.
 */
import { careerUSPs } from '../data/usps'

/** Inline line icons keyed by usps.ts `icon` (presentation only). */
const uspIcons: Record<string, string> = {
  // Lightbulb / innovation
  lightbulb:
    '<path d="M15 14c.2-1 .7-1.7 1.5-2.5C17.5 10.6 18 9.3 18 8a6 6 0 0 0-12 0c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  // Target / career opportunities
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  // Wrench + expertise / live project building
  tools:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/>',
}

// Tiny check mark used inside each highlight chip.
const checkIcon = '<path d="M4 12.5l5 5L20 6.5"/>'
</script>

<template>
  <section class="section usp-section" aria-labelledby="usp-heading">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">Why TKSR Career</span>
        <h2 id="usp-heading">From Learning to Career Readiness</h2>
        <p class="usp-lead">
          Build relevant skills, apply them through practical projects and
          understand how they connect to today's career opportunities.
        </p>
      </div>

      <div class="usp-grid">
        <article
          v-for="u in careerUSPs"
          :key="u.id"
          class="usp-card"
          :class="`usp-card--${u.id}`"
        >
          <span class="usp-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              v-html="uspIcons[u.icon]"
            />
          </span>

          <h3 class="usp-title">{{ u.title }}</h3>
          <h4 class="usp-hook">{{ u.hook }}</h4>
          <p class="usp-desc">{{ u.description }}</p>

          <ul class="usp-highlights">
            <li v-for="h in u.highlights" :key="h">
              <svg
                class="usp-chip-ico"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.6"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="checkIcon"
              />
              <span>{{ h }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---- section : soft near-white surface, continues the page rhythm
        (nav strip white above, ecosystem white below → soft sandwich).
        Subtle static radial tints only — no heavy gradient. ---- */
.usp-section {
  background:
    radial-gradient(720px 260px at 90% 0%, rgba(124, 58, 237, 0.045), transparent 60%),
    radial-gradient(720px 280px at 8% 100%, rgba(37, 99, 235, 0.04), transparent 60%),
    var(--bg-soft);
  padding: 36px 0 42px;
}

.usp-section .section-head {
  margin-bottom: 22px;
}

/* Eyebrow pill — same family as the phase 4/5 pills so the whole
   reference rhythm reads as one (clean text, no emoji). */
.usp-section .eyebrow {
  margin-bottom: 10px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

/* Dark navy heading — no gradient, same size rhythm as phase 4/5. */
.usp-section h2 {
  margin: 0;
  font-size: clamp(1.7rem, 2.9vw, 2.25rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.usp-lead {
  margin: 10px auto 0;
  max-width: 680px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
}

/* ---- three equal USP cards ---- */
.usp-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

/* Centered premium card — white surface, very light border, soft shadow.
   A distinct composition from the phase 4 2×2 cards (no number, no
   left-aligned header row, no pinned callout). */
.usp-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
  padding: 16px 16px 14px;
}

/* 42px rounded icon tile — lightweight, per-USP tint (part G: 42–56px). */
.usp-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  box-shadow:
    inset 0 0 0 1px rgba(11, 22, 48, 0.04),
    0 6px 14px rgba(13, 31, 78, 0.06);
}

.usp-icon svg {
  width: 20px;
  height: 20px;
}

/* Distinct tint family for this zone: indigo / violet / teal. */
.usp-card--innovation .usp-icon {
  background: #eef2ff;
  color: #4f46e5;
}

.usp-card--live-career-opportunities .usp-icon {
  background: #f5f3ff;
  color: #7c3aed;
}

.usp-card--industry-experts-live-projects .usp-icon {
  background: #ecfeff;
  color: #0e7490;
}

.usp-title {
  margin: 9px 0 0;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.3;
  color: var(--ink);
}

/* Supporting punch line — indigo, compact. */
.usp-hook {
  margin: 4px 0 0;
  font-size: 12.5px;
  font-weight: 700;
  line-height: 1.4;
  color: #4f46e5;
}

.usp-desc {
  margin: 6px 0 0;
  font-size: 11.5px;
  line-height: 1.45;
  color: var(--muted);
}

/* Highlight chips — small check pills, same family as phase 4. Pinned to the
   card bottom so all three cards balance across the row. */
.usp-highlights {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin: auto 0 0;
  padding: 8px 0 0;
}

.usp-highlights li {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--ink-2);
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 3.5px 8px;
  box-shadow: 0 2px 6px rgba(13, 31, 78, 0.06);
  white-space: nowrap;
}

.usp-chip-ico {
  flex-shrink: 0;
  width: 11px;
  height: 11px;
  color: var(--primary-600);
}

/* ---- responsive ---- */
/* 1024/900: keep 3 columns per the reference (readable, no tiny columns).
   Density tightens only. */
@media (max-width: 1024px) {
  .usp-section {
    padding: 32px 0 38px;
  }

  .usp-card {
    padding: 16px 14px 14px;
  }

  .usp-icon {
    width: 42px;
    height: 42px;
  }

  .usp-title {
    font-size: 14.5px;
  }

  .usp-desc {
    font-size: 11.5px;
  }
}

/* 768: controlled 2+1 — two readable cards on the first row, the third
   spanning full width (avoids narrow unreadable columns; nav strip above is
   also 2-up at this width). */
@media (max-width: 768px) {
  .usp-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .usp-card:last-child {
    grid-column: 1 / -1;
  }
}

/* 640 and below: single column in order USP 1 → 2 → 3. */
@media (max-width: 640px) {
  .usp-section {
    padding: 30px 0 32px;
  }

  .usp-section h2 {
    font-size: clamp(1.45rem, 5.6vw, 1.7rem);
  }

  .usp-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .usp-card:last-child {
    grid-column: auto;
  }
}
</style>