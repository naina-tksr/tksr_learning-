<script setup lang="ts">
/**
 * "Projects & Jobs Career Navigation" — Phase 5 (reference-first compact strip).
 *
 * Two compact horizontal cards side-by-side:
 *   WHAT WILL YOU BUILD?        → /projects  (chips derived from the real
 *                                              project catalog — never invented)
 *   JOBS & CAREER OPPORTUNITIES → /jobs      (honest demo-opportunity wording,
 *                                              no "live vacancies" claims)
 *
 * Reference density: small section, ~70–90px cards, 12–16px radius, soft
 * shadow, no animation/hover transforms, subtle centered connector between
 * the two cards (hidden on mobile). The section stays a short transition —
 * no extra heading, no third card, no large whitespace block.
 *
 * Claim safety (unchanged contract, see careerNavigation.ts): project tags are
 * derived via getProjectCategories() from src/data/projects.ts; the Jobs card
 * never claims live vacancies/salaries/companies; the demo footnote remains.
 */
import { careerNavigation } from '../data/careerNavigation'

const cfg = careerNavigation

/** Inline line icons (presentation only — no new asset dependencies). */
const cardIcons: Record<string, string> = {
  // Cube / project
  build:
    '<path d="M21 8.5v7a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4a2 2 0 0 1-1-1.73v-7a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4a2 2 0 0 1 1 1.73Z"/><path d="M3.27 7.72 12 12.5l8.73-4.78M12 12.5V20.5"/>',
  // Briefcase / career
  opportunities:
    '<rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5"/><path d="M3 12.5h18"/>',
}
</script>

<template>
  <section class="section career-nav" aria-label="Projects and career opportunities">
    <div class="container">
      <div class="cn-grid">
        <div class="cn-connector" aria-hidden="true">→</div>

        <!-- ════ CARD 1 — WHAT WILL YOU BUILD? → /projects ════ -->
        <article class="cn-card cn-card--build">
          <div class="cn-head">
            <span class="cn-ico" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="cardIcons.build"
              />
            </span>
            <h3 class="cn-title">{{ cfg.projects.title }}</h3>
            <router-link :to="cfg.projects.route" class="cn-link">
              {{ cfg.projects.ctaLabel }}<span class="cn-arrow" aria-hidden="true">→</span>
            </router-link>
          </div>
          <ul class="cn-chips">
            <li v-for="t in cfg.projects.tags" :key="t">{{ t }}</li>
          </ul>
        </article>

        <!-- ════ CARD 2 — JOBS & CAREER OPPORTUNITIES → /jobs ════ -->
        <article class="cn-card cn-card--jobs">
          <div class="cn-head">
            <span class="cn-ico" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="cardIcons.opportunities"
              />
            </span>
            <h3 class="cn-title">{{ cfg.jobs.title }}</h3>
            <router-link :to="cfg.jobs.route" class="cn-link">
              {{ cfg.jobs.ctaLabel }}<span class="cn-arrow" aria-hidden="true">→</span>
            </router-link>
          </div>
          <ul class="cn-chips">
            <li v-for="t in cfg.jobs.tags" :key="t">{{ t }}</li>
          </ul>
        </article>
      </div>

      <p class="cn-footnote">{{ cfg.footnote }}</p>
    </div>
  </section>
</template>

<style scoped>
/* ---- section : compact transition strip (not a big block) ---- */
.career-nav {
  background: var(--bg);
  padding: 10px 0 14px;
}

/* ---- two-card grid ---- */
.cn-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

/* Small centered connector between the cards — decorative only, does not
   affect layout width (absolute), hidden on mobile. No animation. */
.cn-connector {
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--gradient);
  border: 3px solid var(--bg);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  box-shadow: 0 3px 10px rgba(79, 70, 229, 0.22);
}

/* ---- cards : compact horizontal composition ---- */
/* Head row = icon | title | CTA; the chip row spans full width underneath so
   the catalog categories get maximum horizontal room (minimal wrapping). */
.cn-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px 10px;
  border-radius: 14px;
}

.cn-head {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.cn-ico {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.cn-ico svg {
  width: 20px;
  height: 20px;
}

.cn-title {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 11.5px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 0.5px;
  text-transform: uppercase; /* visual only — accessible text unchanged */
}

/* Compact CTA pill — 32px, 999px radius, small arrow. */
.cn-link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.2px;
  line-height: 1;
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  text-decoration: none;
  white-space: nowrap;
}

.cn-arrow {
  font-size: 12px;
  line-height: 1;
}

/* ---- chip row (very small compact pills) ---- */
.cn-chips {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 0;
  min-width: 0;
}

.cn-chips li {
  font-size: 9.5px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.1px;
  border-radius: 999px;
  padding: 2px 8px;
  white-space: nowrap;
}

/* ---- Projects card : strong blue → indigo → purple gradient ---- */
.cn-card--build {
  background: linear-gradient(120deg, #4f46e5 0%, #2563eb 48%, #7c3aed 100%);
  color: #fff;
  border: none;
  box-shadow: 0 10px 24px rgba(79, 70, 229, 0.26);
}

.cn-card--build .cn-ico {
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.cn-card--build .cn-title {
  color: #fff;
}

.cn-card--build .cn-chips li {
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.26);
  color: #fff;
}

.cn-card--build .cn-link {
  background: #fff;
  color: #1e3a8a;
  box-shadow: 0 6px 14px rgba(2, 6, 23, 0.18);
}

/* ---- Jobs card : very light blue → lavender surface (contrasts left) ---- */
.cn-card--jobs {
  background: linear-gradient(120deg, #eef3ff 0%, #eef0ff 55%, #f4ecff 100%);
  border: 1px solid #dfe5fb;
  box-shadow: 0 8px 20px rgba(30, 41, 82, 0.08);
}

.cn-card--jobs .cn-ico {
  background: linear-gradient(135deg, #818cf8, #6366f1);
  color: #fff;
  box-shadow: 0 5px 12px rgba(99, 102, 241, 0.26);
}

.cn-card--jobs .cn-title {
  color: var(--ink);
}

.cn-card--jobs .cn-chips li {
  background: #fff;
  border: 1px solid #e2e8f0;
  color: var(--ink-2);
}

.cn-card--jobs .cn-link {
  background: #fff;
  color: #1e3a8a;
  border: 1px solid #dfe5fb;
  box-shadow: 0 6px 14px rgba(30, 41, 82, 0.08);
}

/* ---- demo transparency footnote (compact, muted) ---- */
.cn-footnote {
  margin: 12px auto 0;
  max-width: 720px;
  text-align: center;
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--muted);
}

/* ---- responsive ---- */
/* 1024/900/768: keep the two-card row — only density tightens slightly. */
@media (max-width: 1024px) {
  .cn-card {
    gap: 8px;
    padding: 12px 14px 10px;
  }

  .cn-ico {
    width: 38px;
    height: 38px;
  }

  .cn-ico svg {
    width: 19px;
    height: 19px;
  }

  .cn-title {
    font-size: 11px;
  }
}

/* 640 and below: stack — WHAT WILL YOU BUILD? then JOBS. */
@media (max-width: 640px) {
  .cn-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .cn-connector {
    display: none;
  }

  .cn-card {
    padding: 14px 16px 12px;
  }

  .cn-footnote {
    margin-top: 10px;
    text-align: left;
  }
}
</style>