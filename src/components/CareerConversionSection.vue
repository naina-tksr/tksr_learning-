<script setup lang="ts">
/**
 * "Why TKSR Career?" — high-impact conversion section (Phase 2 → 3.1 compact).
 *
 * Three large cards:
 *  1. AI Engineering Select Program (flagship gradient card) → existing
 *     Buy-Now enrollment modal flow.
 *  2. Career Investment (light premium card) → existing /courses route.
 *  3. Career Opportunities (light card) → previews EXISTING sample jobs data
 *     and links to /jobs and job-detail routes.
 *
 * All copy + verification metadata lives in src/data/careerConversion.ts so the
 * business can replace demo/pending values with verified figures later.
 *
 * PHASE 3.1 (compactness): the reference renders one dense ~410–440px
 * three-card block, not three ~725px columns. Internal spacing was rebuilt so
 * the cards sit at reference density. The two per-card "Pending verification"
 * notes were relocated into a single compact section footer under the grid
 * (verified copy unchanged) — the reference shows per-card notes only on the
 * opportunities card. Card 3 keeps its in-card note.
 *
 * PHASE 21.2 (Career Investment → Reference Image 2): Card 2 was completely
 * reconstructed — the old pending inner panel (beige/cream metric box with
 * "Verification pending" slots and the empty ratio pill) is gone. The card is
 * now the clean white premium metric card from Reference Image 2 with the
 * manager-approved figures ("₹1.5 LAKH" → "Build skills targeted toward" →
 * "₹30L+" → "Career Opportunities" → "20× salary-to-program-cost ratio" →
 * supporting copy → "Start My AI Journey"). No pending placeholders remain;
 * the section footer now keeps only Card 1's honesty note.
 */
import { computed } from 'vue'
import { careerConversion } from '../data/careerConversion'
import { vacancies } from '../data/liveVacancies'
import BuyNowButton from './BuyNowButton.vue'

const cfg = careerConversion
const select = cfg.select
const investment = cfg.investment
const opportunities = cfg.opportunities

const previewVacancies = computed(() => vacancies.slice(0, opportunities.previewLimit))

/**
 * Splits the program title into the reference's two natural lines
 * ("AI Engineering" / "Select Program") without changing the data or the
 * accessible heading text. Falls back to a single line if the title changes.
 */
const titleLines = computed<string[]>(() => {
  const t = select.title
  const idx = t.indexOf('Select Program')
  return idx > 0 ? [t.slice(0, idx).trim(), t.slice(idx).trim()] : [t]
})
</script>

<template>
  <section class="section career-conv" aria-labelledby="career-conv-heading">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">{{ cfg.eyebrow }}</span>
        <h2 id="career-conv-heading">
          {{ cfg.headline }}
          <span class="cc-accent">{{ cfg.headlineAccent }}</span>
        </h2>
        <p class="cc-support">{{ cfg.support }}</p>
      </div>

      <div class="cc-grid">
        <!-- ════ CARD 1 — AI ENGINEERING SELECT PROGRAM ════ -->
        <article class="cc-card cc-card--select">
          <div class="cc-glow cc-glow--a" aria-hidden="true"></div>
          <div class="cc-glow cc-glow--b" aria-hidden="true"></div>

          <div class="cc-head">
            <span class="cc-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>
            </span>
            <span class="cc-badge">{{ select.badge }}</span>
          </div>
          <h3 class="cc-title">
            <span v-for="(ln, i) in titleLines" :key="i" class="cc-title-line">
              {{ ln }}{{ i < titleLines.length - 1 ? ' ' : '' }}
            </span>
          </h3>
          <p class="cc-meta">
            {{ select.metadata[0] }} | {{ select.metadata[1] }} | {{ select.metadata[2] }}
          </p>

          <p class="cc-ben-head">{{ select.whatYouGetLabel }}</p>

          <ul class="cc-benefits">
            <li v-for="b in select.benefits" :key="b.num">
              <span class="cc-ben-num" aria-hidden="true">{{ b.num }}</span>
              <span class="cc-ben-body">
                <strong class="cc-ben-title">{{ b.title }}</strong>
                <span class="cc-ben-text">{{ b.text }}</span>
              </span>
            </li>
          </ul>

          <p class="cc-conversion">{{ select.conversion }}</p>

          <div class="cc-cta">
            <BuyNowButton
              :course-id="select.courseId"
              :course-title="select.courseTitle"
            />
          </div>
        </article>

        <!-- ════ CARD 2 — CAREER INVESTMENT (Reference Image 2, Phase 21.2) ════ -->
        <article class="cc-card cc-card--invest">
          <div class="cc-head">
            <span class="cc-icon cc-icon--soft" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>
            </span>
            <h3 class="cc-invest-label">{{ investment.title }}</h3>
          </div>

          <!-- Metric hierarchy (approved content, no pending states):
               ₹1.5 LAKH → support line → ₹30L+ → CAREER OPPORTUNITIES
               → 20× ratio pill → supporting copy → CTA. -->
          <p class="cc-invest-figure">{{ investment.figure }}</p>
          <p class="cc-invest-figure-support">{{ investment.figureSupport }}</p>

          <p class="cc-invest-outcome">{{ investment.outcomeMetric }}</p>
          <p class="cc-invest-outcome-label">{{ investment.outcomeLabel }}</p>

          <p class="cc-invest-ratio">
            <span class="cc-invest-ratio-pill">{{ investment.ratioValue }}</span>
            <span class="cc-invest-ratio-caption">{{ investment.ratioCaption }}</span>
          </p>

          <p class="cc-invest-support">{{ investment.supportParagraph }}</p>

          <div class="cc-cta cc-cta--invest">
            <router-link :to="investment.ctaTo" class="btn btn-primary">
              {{ investment.ctaLabel }}
            </router-link>
          </div>
        </article>

        <!-- ════ CARD 3 — CAREER OPPORTUNITIES (compact demo card) ════ -->
        <article class="cc-card cc-card--jobs" aria-labelledby="career-opportunities-heading">
          <div class="cc-card-head">
            <span class="cc-eyebrow">{{ opportunities.badge }}</span>
            <span
              class="cc-card-status"
              :class="opportunities.status.kind === 'live' ? 'cc-card-status--live' : 'cc-card-status--demo'"
            >
              {{ opportunities.status.label }}
            </span>
          </div>

          <h3 id="career-opportunities-heading" class="cc-title">{{ opportunities.title }}</h3>
          <p class="cc-subtitle">{{ opportunities.support }}</p>

          <div class="cc-jobs">
            <article v-for="v in previewVacancies" :key="v.id" class="cc-job">
              <div class="cc-job-head">
                <span class="cc-job-logo" aria-hidden="true">{{ v.initials }}</span>
                <div class="cc-job-info">
                  <router-link :to="`/jobs/${v.jobId}`" class="cc-job-link">
                    <span class="cc-job-title">{{ v.role }}</span>
                    <span class="cc-job-company">{{ v.company }}</span>
                  </router-link>
                </div>
                <div class="cc-job-side">
                  <span class="cc-job-comp">{{ v.compensationDisplay }}</span>
                  <router-link :to="`/jobs/${v.jobId}`" class="cc-job-apply">
                    Apply
                  </router-link>
                </div>
              </div>

              <ul class="cc-job-skills">
                <li v-for="t in v.technologies" :key="t">{{ t }}</li>
              </ul>
            </article>
          </div>

          <p class="cc-note">{{ opportunities.note }}</p>

          <div class="cc-cta">
            <router-link :to="opportunities.ctaTo" class="btn btn-primary cc-card-cta">
              {{ opportunities.ctaLabel }}
            </router-link>
          </div>
        </article>
      </div>

      <!-- Phase 3.1 relocated honesty notes: Card 1 (Select Program) is still
           demo/unverified, so its pending note lives here. Card 2's figures are
           manager-approved (Reference Image 2) and Card 3 carries its own
           in-card note — no per-card pending copy remains for them. -->
      <div class="cc-verify-foot" role="note" aria-label="Verification status">
        <p><strong>Pending verification:</strong> {{ select.verificationNote }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---- section ---- */
.career-conv {
  /* Very light blue/white premium surface with soft atmospheric gradients. */
  position: relative;
  background:
    radial-gradient(720px 320px at 85% 0%, rgba(124, 58, 237, 0.07), transparent 60%),
    radial-gradient(720px 340px at 8% 100%, rgba(37, 99, 235, 0.06), transparent 60%),
    #fbfcff;
  padding: 34px 0 40px;
}

/* Eyebrow pill — compact, lavender, indigo text (matches hero pill family). */
.career-conv .eyebrow {
  margin-bottom: 10px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.35px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

/* Dense, conversion-led heading rhythm (reference spacing, tightened). */
.career-conv .section-head {
  margin-bottom: 18px;
}

.career-conv h2 {
  font-size: clamp(2rem, 3.1vw, 2.5rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
  color: var(--ink);
}

.cc-support {
  margin: 0 auto;
  font-size: 12.5px;
  line-height: 1.45;
  color: var(--muted);
  max-width: 680px;
}

.cc-accent {
  display: block;
  margin-top: 2px;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* ---- grid ---- */
/* Reference proportions: Card 2 (investment) is visibly narrower than 1 & 3. */
.cc-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.95fr 1.15fr;
  gap: 14px;
  align-items: stretch;
}

/*
 * Shared card frame: 18px radius, 1px border, soft shadow, dense padding.
 * Cards are flex columns so every CTA lands at the same bottom baseline.
 * Phase 3.1: tight 6px intra-card gap + 16px padding = reference density.
 */
.cc-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

/* ---- shared bits ---- */
/* Icon + badge row at the top of each card (reference C2/C3). */
.cc-head {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cc-icon {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: #fff;
}

.cc-icon svg {
  width: 15px;
  height: 15px;
}

/* Solid blue→purple icon tile used on the light cards (2 & 3). */
.cc-icon--soft {
  background: linear-gradient(120deg, #2563eb, #7c3aed);
  border: none;
  box-shadow: 0 6px 14px rgba(29, 78, 216, 0.22);
}

/* Card 1 badge: white pill, purple text (reference C3). */
.cc-badge {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  background: #fff;
  color: var(--primary-dark);
  white-space: nowrap;
}

.cc-title {
  font-size: 1.45rem;
  line-height: 1.06;
  font-weight: 800;
}

/* In-card supporting note (Card 3 only after Phase 3.1) — pinned above CTA. */
.cc-note {
  margin-top: auto;
  font-size: 10.5px;
  line-height: 1.45;
  color: var(--muted);
  border-top: 1px dashed var(--border);
  padding-top: 7px;
}

.cc-cta {
  margin-top: 4px;
}

/* CTA family: full-width, ~38px tall. Card 1 keeps its white pill (999px),
   Card 2 is a pill (999px, ~46px — Reference Image 2), Card 3 uses 10px —
   see their overrides. */
.cc-cta .btn {
  width: 100%;
  justify-content: center;
  min-height: 38px;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 12.5px;
  font-weight: 800;
}

/* ---- CARD 1 : flagship gradient card ---- */
/* Deep indigo → violet → purple (reference C1). */
.cc-card--select {
  background: linear-gradient(150deg, #1d4ed8 0%, #4f46e5 34%, #6d28d9 62%, #7c3aed 82%, #8b5cf6 100%);
  border: none;
  color: #fff;
  box-shadow: 0 26px 54px rgba(67, 56, 202, 0.34);
}

/* Subtle top sheen for premium depth — decorative only. */
.cc-card--select::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), transparent);
  pointer-events: none;
}

.cc-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.cc-glow--a {
  width: 300px;
  height: 300px;
  top: -140px;
  right: -120px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.22), transparent 65%);
}

.cc-glow--b {
  width: 260px;
  height: 260px;
  bottom: -140px;
  left: -100px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.12), transparent 65%);
}

/* Top icon: white icon inside a translucent white circular disc (C2). */
.cc-card--select .cc-icon {
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.32);
}

/* Two-line program title — reference break, compact footprint. */
.cc-card--select .cc-title {
  font-size: 1.28rem; /* slightly smaller and more balanced */
  line-height: 1.1;
  margin-top: 4px;
  letter-spacing: -0.02em;
}

.cc-title-line {
  display: block;
}

/* Metadata: one compact line with pipe separators (Reference Image 1).
   `list-style: none` retained for safety; separators come from the content. */
.cc-meta {
  margin: 4px 0 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.4px;
  line-height: 1.5;
  color: #fff;
}

/* Reference "WHAT YOU GET" mini-heading above the numbered benefit rows. */
.cc-ben-head {
  margin: 10px 0 0;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.82);
}

/* Dense numbered benefit block — four compact rows (reference C6–C8, 3.1
   density: rows ~26–38px, 5px row gap, all rows within ~130–150px). */
.cc-benefits {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: 6px;
}

.cc-benefits li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.35;
}

.cc-ben-num {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.4px;
  color: var(--primary-dark);
  box-shadow: 0 3px 8px rgba(11, 22, 48, 0.18);
}

.cc-ben-body {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.cc-ben-title {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.45px;
  text-transform: uppercase; /* visual only — accessible text unchanged */
  color: #fff;
  line-height: 1.4;
}

.cc-ben-text {
  font-size: 9.2px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.4;
}

/* Reference highlight box: light surface + strong purple text (C9), compact. */
.cc-conversion {
  margin-top: 10px;
  font-size: 11px;
  font-weight: 800;
  line-height: 1.45;
  background: #fff;
  color: var(--primary-dark);
  border-radius: 8px;
  padding: 7px 10px;
  box-shadow: 0 8px 20px rgba(11, 22, 48, 0.18);
}

.cc-card--select :deep(.btn) {
  width: 100%;
  justify-content: center;
}

/* Pin the white Buy Now pill to the card bottom (aligns all three CTAs). */
.cc-card--select .cc-cta {
  margin-top: auto;
}

/* Buy Now button reused from the existing enrollment flow — restyled for the
   gradient card: white pill, purple text, ~38px height. Same modal flow (C11). */
.cc-card--select :deep(.btn-buy) {
  background: #fff;
  color: var(--primary-dark);
  min-height: 38px;
  padding: 0 22px;
  border-radius: 999px;
  box-shadow: 0 10px 24px rgba(11, 22, 48, 0.28);
  font-weight: 800;
}

.cc-card--select :deep(.btn-buy:hover) {
  transform: translateY(-2px);
  box-shadow: 0 16px 34px rgba(11, 22, 48, 0.38);
}

/* ---- CARD 2 : career investment (white premium metric card, Ref Image 2) ---- */
/* Thin gradient accent bar keeps the section rhythm — no glow, no large block. */
.cc-card--invest::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: var(--gradient);
}

/* ~40px rounded-square icon tile — blue→purple gradient, subtle shadow. */
.cc-card--invest .cc-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--gradient-soft);
  border: none;
  box-shadow: 0 8px 18px rgba(29, 78, 216, 0.24);
}

.cc-card--invest .cc-icon svg {
  width: 19px;
  height: 19px;
}

/* Compact card header — uppercase indigo, reference density. */
.cc-invest-label {
  margin: 0;
  font-size: 10.5px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 1.1px;
  text-transform: uppercase; /* visual only — accessible text unchanged */
  color: var(--primary-600);
}

/* Primary metric ₹1.5 LAKH — dominant upper-half element (34–42px desktop). */
.cc-invest-figure {
  margin: 8px 0 0;
  font-size: clamp(2.05rem, 3.6vw, 2.6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.01em;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Muted blue/gray support line directly under ₹1.5 LAKH — compact gap. */
.cc-invest-figure-support {
  margin: 2px 0 0;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--muted);
}

/* Second / largest metric ₹30L+ — the card's strongest visual element
   (44–52px desktop), no surrounding card, no excessive whitespace. */
.cc-invest-outcome {
  margin: 10px 0 0;
  font-size: clamp(2.75rem, 4.6vw, 3.25rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  background: var(--gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Uppercase label connecting ₹30L+ to the career-outcome context (15–17px). */
.cc-invest-outcome-label {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 0.9px;
  text-transform: uppercase; /* visual only — accessible text unchanged */
  color: var(--primary-600);
}

/* Ratio row — highlighted 20× pill beside the muted caption. */
.cc-invest-ratio {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.cc-invest-ratio-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 58px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #eef1ff;
  border: 1px solid rgba(99, 102, 241, 0.22);
  color: #4f46e5;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
}

.cc-invest-ratio-caption {
  font-size: 11px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--muted);
}

/* Supporting copy below the ratio row — compact, left aligned. */
.cc-invest-support {
  margin: 12px 0 0;
  font-size: 12.5px;
  line-height: 1.42;
  color: var(--muted);
}

/* CTA pinned to the card bottom (all three CTAs share the baseline). */
.cc-cta--invest {
  margin-top: auto;
  padding-top: 12px;
}

/* Pill-shaped gradient CTA, ~46px — Reference Image 2 density. */
.cc-card--invest .cc-cta .btn {
  min-height: 46px;
  border-radius: 999px;
  font-size: 14px;
}

/* ---- CARD 3 : career opportunities (light lavender card) ---- */
/* Very light lavender surface — the reference's lighter jobs card. */
.cc-card--jobs {
  background: #eef2ff;
}

.cc-card-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.cc-eyebrow {
  font-size: 10.5px;
  font-weight: 800;
  color: var(--primary-600);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  flex-shrink: 0;
}

/* LIVE/demo status pill — same position as the reference's LIVE badge. */
.cc-card-status {
  font-size: 9.5px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 3px 9px;
  border-radius: 999px;
  flex-shrink: 0;
}

.cc-card-status--demo {
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #fdba74;
}

.cc-card-status--live {
  background: #f0fdf4;
  color: #15803d;
  border: 1px solid #bbf7d0;
}

.cc-card--jobs .cc-title {
  font-size: 1.45rem;
  font-weight: 800;
  line-height: 1.08;
  margin: 2px 0 0;
  color: var(--ink);
}

.cc-subtitle {
  font-size: 11px;
  color: var(--muted);
  line-height: 1.4;
  margin-bottom: 8px;
}

.cc-jobs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Compact white job preview row — reference density (~55–65px): no per-row
   status line (the card-level "Demo data" pill covers honesty). */
.cc-job {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  padding: 7px 9px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.cc-job:hover {
  border-color: rgba(37, 99, 235, 0.45);
  box-shadow: var(--shadow);
}

.cc-job-head {
  display: flex;
  align-items: center;
  gap: 9px;
}

.cc-job-side {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  min-width: 92px;
}

.cc-job-logo {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: linear-gradient(120deg, #2563eb, #7c3aed);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
}

.cc-job-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.cc-job-comp {
  font-size: 10.5px;
  font-weight: 800;
  color: #4f46e5;
  line-height: 1.2;
  white-space: nowrap;
}

.cc-job-link {
  display: flex;
  flex-direction: column;
  gap: 1px;
  text-decoration: none;
  color: inherit;
  min-width: 0;
}

.cc-job-title {
  font-size: 11px;
  font-weight: 800;
  color: var(--ink);
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.cc-job-title:hover {
  color: var(--primary-600);
}

.cc-job-company {
  font-size: 10px;
  font-weight: 600;
  color: var(--muted);
  line-height: 1.3;
}

.cc-job-skills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}

.cc-job-skills li {
  font-size: 8.5px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 1px 6px;
  border-radius: 999px;
  line-height: 1.3;
}

/* On the lavender surface, white rows read as cards — keep skill chips white too. */
.cc-card--jobs .cc-job-skills li {
  background: #fff;
}

.cc-job-apply {
  flex-shrink: 0;
  align-self: center;
  font-size: 10.5px;
  font-weight: 800;
  color: var(--primary-600);
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.25);
  border-radius: 999px;
  padding: 5px 10px;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}

.cc-job-apply:hover {
  background: var(--primary-600);
  color: #fff;
}

/* Reference E8: full-width gradient CTA, 10px radius. */
.cc-card--jobs .cc-cta .btn {
  border-radius: 999px;
  min-height: 46px;
  font-size: 14px;
  font-weight: 800;
  justify-content: center;
}

.cc-card--jobs .cc-card-cta {
  width: 100%;
}

/* ---- relocated verification footer (Phase 3.1) ---- */
.cc-verify-foot {
  margin: 18px auto 0;
  max-width: 720px;
  text-align: center;
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--muted);
}

.cc-verify-foot p {
  margin: 0;
}

.cc-verify-foot strong {
  font-weight: 800;
  color: var(--ink-2);
}

/* ---- responsive ---- */
/* 1024: keep the three-up row (reference A2 shows cards spanning the width at
   ~1024) — only density shrinks. */
@media (max-width: 1024px) {
  .cc-grid {
    grid-template-columns: 1.1fr 0.95fr 1.1fr;
    gap: 12px;
  }

  .cc-card {
    padding: 14px;
  }

  /* Narrower columns wrap the benefit text — tighten so rows stay compact. */
  .cc-card--select .cc-title {
    font-size: 1.4rem;
  }

  .cc-benefits {
    gap: 3px;
  }

  .cc-ben-title {
    font-size: 10px;
  }

  .cc-ben-text {
    font-size: 9px;
  }

  .cc-conversion {
    font-size: 10.5px;
    line-height: 1.35;
    padding: 7px 10px;
  }

  /* Stop the card-3 header (icon + label + status pill) overflowing to a
     second line at this density — keeps the head to its compact 30px row. */
  .cc-card-head {
    gap: 4px;
  }

  .cc-eyebrow {
    font-size: 10px;
    letter-spacing: 0.5px;
  }

  .cc-card-status {
    font-size: 9px;
  }
}

/* 900: 2 + 1 — Card 1 + Card 2 on top, jobs card spans full width (Part H). */
@media (max-width: 900px) {
  .cc-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .cc-card--jobs {
    grid-column: 1 / -1;
  }

  .cc-card--jobs .cc-jobs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .cc-card--jobs .cc-job {
    padding: 7px 8px;
  }
}

/* 640: single column in reference order — Card 1 → 2 → 3. */
@media (max-width: 640px) {
  .cc-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .cc-card {
    padding: 16px;
  }

  .cc-card--jobs .cc-jobs {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cc-job-head {
    gap: 12px;
  }

  /* Mobile: scale the heading down so it stays a clean 2–3 line block
     (line 1 dark + gradient line 2, possibly one wrap) instead of 4+ lines. */
  .career-conv h2 {
    font-size: clamp(1.55rem, 5.9vw, 1.85rem);
  }

  /* Mobile touch readability — numbered rows/metadata stay legible. */
  .cc-ben-num {
    width: 26px;
    height: 26px;
    font-size: 11px;
  }

  .cc-ben-title {
    font-size: 11px;
  }

  .cc-ben-text {
    font-size: 9.5px;
  }
}
</style>