<script setup lang="ts">
/**
 * "4 Reasons to Build Your Career Differently" — Phase 21 rebuild
 * (Image-1 → Image-2 reference reconstruction, manager-approved content).
 *
 * Reference match: very light blue section continuing from the conversion
 * cards above, compact centered lavender pill eyebrow, dark navy centered
 * heading, then a 2 × 2 grid of compact white premium cards. Each card has a
 * prominent circular tinted icon, number + strong uppercase title, tightened
 * description, and structured mini benefit blocks pinned to the card bottom.
 *
 * PHASE 21.1: the approved career-opportunity copy ("1-Month Paid Internship
 * → Up to ₹50K + Potential Full-Time Opportunity") now has ONE primary visual
 * home — the premium highlight panel directly below the enrolment countdown
 * (EnrollmentUrgencyBanner.vue). Card 04 therefore carries no opportunity
 * panel and no "Limited Internal Project Slots — Join Early" wording; it keeps
 * its approved title/description plus industry-expectation benefit blocks.
 *
 * Claim contract (see careerAdvantages.ts for the manager approval): the four
 * cards carry the approved internship/stipend/full-time wording with its
 * qualifiers intact ("may be considered", "subject to eligibility and
 * performance", "potential full-time opportunity"). No guarantee of
 * internship, employment, placement or salary is stated.
 */
import { careerAdvantages } from '../data/careerAdvantages'

const cfg = careerAdvantages

/** Prominent card-header line icons (presentation only — no dependencies). */
const headIcons: Record<string, string> = {
  // Trophy / achievement (Card 01)
  'performance-opportunity':
    '<path d="M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4.5A1.5 1.5 0 0 0 3 6.5v1A2.5 2.5 0 0 0 5.5 10H7"/><path d="M17 5h2.5A1.5 1.5 0 0 1 21 6.5v1A2.5 2.5 0 0 1 18.5 10H17"/><path d="M8 20.5h8"/><path d="M12 15v5.5"/>',
  // Analytics / corporate workflow (Card 02)
  'corporate-workflow':
    '<path d="M4 19.5h16"/><path d="M7 19.5v-5.5"/><path d="M12 19.5v-10"/><path d="M17 19.5v-7"/>',
  // People / working experts (Card 03)
  'real-working-experts':
    '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="9.2" r="2.4"/><path d="M15 15.4a5.6 5.6 0 0 1 6 4.6"/>',
  // Rocket / industry opportunity (Card 04)
  'industry-expectations':
    '<path d="M12 2.5c2.6 0 4.5 2.3 4.5 5.2 0 1.7-.4 3-.9 4.3H8.4c-.5-1.3-.9-2.6-.9-4.3C7.5 4.8 9.4 2.5 12 2.5Z"/><path d="M8.4 12h7.2"/><path d="M12 12v3.5"/><path d="M8.5 18.5h7"/><path d="M12 15.5v3"/><circle cx="12" cy="7.2" r="1.2"/>',
}

/** Small semantic icons for the structured benefit blocks. */
const benefitIcons: Record<string, string> = {
  // Top performers — user + check
  'user-check':
    '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 11.5l2 2L22.5 9"/>',
  // ₹50K value — banknote
  banknote:
    '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.8"/><path d="M6 9.2v.01M18 14.8v.01"/>',
  // Working internship — briefcase
  briefcase:
    '<rect x="3" y="7.5" width="18" height="12" rx="2.5"/><path d="M8.5 7.5v-1A2.5 2.5 0 0 1 11 4h2a2.5 2.5 0 0 1 2.5 2.5v1"/><path d="M3 12.5h18"/>',
  // Project planning — target
  target:
    '<circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r="1"/>',
  // Scrum calls — chat bubble
  chat:
    '<path d="M21 11.5a8 8 0 0 1-8 8c-1.1 0-2.1-.2-3.1-.6L4 21l2.1-5.9A8 8 0 1 1 21 11.5Z"/>',
  // Team collaboration — people
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="9.2" r="2.4"/><path d="M15 15.4a5.6 5.6 0 0 1 6 4.6"/>',
  // Real deadlines — clock
  clock:
    '<circle cx="12" cy="12" r="8.2"/><path d="M12 7.5V12l3 2"/>',
  // Live mentorship — person + add
  mentor:
    '<circle cx="9" cy="7.5" r="2.8"/><path d="M3.5 18.5a5.5 5.5 0 0 1 11 0"/><path d="M18.5 3.2v5.6"/><path d="M15.7 6h5.6"/>',
  // Real project exposure — layers
  layers:
    '<path d="M12 3l8.5 4.8L12 12.6 3.5 7.8 12 3Z"/><path d="M3.5 12.4 12 17.2l8.5-4.8"/><path d="M3.5 16.8 12 21.6l8.5-4.8"/>',
  // Industry insights — lightbulb
  bulb:
    '<path d="M9 17.5h6"/><path d="M10 20.5h4"/><path d="M8.7 14.7a6 6 0 1 1 6.6 0c-1 .8-1.5 1.7-1.6 2.8H10.3c-.1-1.1-.6-2-1.6-2.8Z"/>',
}
</script>

<template>
  <section class="section career-adv" aria-labelledby="career-adv-heading">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">{{ cfg.eyebrow }}</span>
        <h2 id="career-adv-heading">{{ cfg.headline }}</h2>
      </div>

      <div class="ca-grid">
        <article
          v-for="a in cfg.advantages"
          :key="a.id"
          class="ca-card"
          :class="`ca-card--${a.id}`"
        >
          <div class="ca-head">
            <span class="ca-ico" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="headIcons[a.id]"
              />
            </span>
            <div class="ca-head-text">
              <span class="ca-num" aria-hidden="true">{{ a.number }}</span>
              <h3 class="ca-title">{{ a.title }}</h3>
            </div>
          </div>

          <p class="ca-desc">{{ a.description }}</p>

          <ul
            v-if="a.benefits.length"
            class="ca-benefits"
            :class="`ca-benefits--${a.benefits.length}`"
          >
            <li
              v-for="b in a.benefits"
              :key="b.label"
              class="ca-benefit"
              :class="{ 'ca-benefit--highlight': b.highlight }"
            >
              <span class="ca-benefit-ico" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  v-html="benefitIcons[b.icon]"
                />
              </span>
              <span class="ca-benefit-body">
                <span class="ca-benefit-label">{{ b.label }}</span>
                <span v-if="b.text" class="ca-benefit-text">{{ b.text }}</span>
              </span>
            </li>
          </ul>

          </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---- section : very light blue, continues naturally from the conversion
        section's pale palette (subtle static gradients only) ---- */
.career-adv {
  position: relative;
  background:
    radial-gradient(760px 300px at 88% 0%, rgba(124, 58, 237, 0.06), transparent 60%),
    radial-gradient(760px 320px at 6% 100%, rgba(37, 99, 235, 0.05), transparent 60%),
    #f5f8fd;
  padding: 40px 0 36px;
}

/* ---- compact centered section head ---- */
.career-adv .section-head {
  margin-bottom: 18px;
}

/* Eyebrow pill — compact lavender pill, indigo text (same family as the
   conversion section's pill so the two sections read as one rhythm). */
.career-adv .eyebrow {
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

/* Dark navy heading — the reference heading is primarily dark; no gradient. */
.career-adv h2 {
  margin: 0;
  font-size: clamp(1.7rem, 2.9vw, 2.25rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--ink);
}

/* ---- 2 × 2 premium card grid ---- */
.ca-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

/* Compact white card — icon left, number + uppercase title, tightened
   description, then structured benefit blocks pinned to the bottom. Grid
   rows stretch equally so card tops/bottoms align. */
.ca-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--shadow);
}

/* ---- card header : circular tinted icon left, number + title right ---- */
.ca-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ca-ico {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow:
    inset 0 0 0 1px rgba(11, 22, 48, 0.04),
    0 6px 14px rgba(13, 31, 78, 0.06);
}

.ca-ico svg {
  width: 22px;
  height: 22px;
}

/* Per-card soft tinted tiles (reference palette: blue/green, blue/purple,
   purple/blue, orange). */
.ca-card--performance-opportunity .ca-ico {
  background: #e0f2fe;
  color: #0369a1;
}

.ca-card--corporate-workflow .ca-ico {
  background: #eef2ff;
  color: #4f46e5;
}

.ca-card--real-working-experts .ca-ico {
  background: #f5f3ff;
  color: #7c3aed;
}

.ca-card--industry-expectations .ca-ico {
  background: #fff7ed;
  color: #ea580c;
}

.ca-head-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

/* Number: blue/indigo, small but prominent. */
.ca-num {
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 1.5px;
  color: #4f46e5;
}

/* Title: strong uppercase blue/indigo at reference density. */
.ca-title {
  margin: 0;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: 0.4px;
  text-transform: uppercase; /* visual only — accessible text unchanged */
  color: #1e40af;
}

/* Tightened description — compact muted copy at reference density. */
.ca-desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: var(--muted);
}

/* ---- structured benefit blocks (proof points, not pills) ---- */
.ca-benefits {
  list-style: none;
  display: grid;
  gap: 6px;
  margin-top: auto;
}

.ca-benefits--3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ca-benefits--4 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ca-benefit {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  padding: 7px 8px;
  background: #f6f8fe;
  border: 1px solid #edf1fb;
  border-radius: 10px;
}

.ca-benefit-ico {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: #e6ecff;
  color: #4f46e5;
}

.ca-benefit-ico svg {
  width: 13px;
  height: 13px;
}

.ca-benefit-body {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.ca-benefit-label {
  font-size: 10.5px;
  font-weight: 800;
  line-height: 1.3;
  color: var(--ink-2);
  white-space: nowrap;
}

.ca-benefit-text {
  font-size: 9px;
  line-height: 1.3;
  color: var(--muted);
  white-space: nowrap;
}

/* The ₹50K block stands out slightly — it is the key numeric value. */
.ca-benefit--highlight {
  background: #fff7ed;
  border-color: #fed7aa;
}

.ca-benefit--highlight .ca-benefit-ico {
  background: #ffedd5;
  color: #ea580c;
}

.ca-benefit--highlight .ca-benefit-label {
  font-size: 11.5px;
  color: #c2410c;
}

/* ---- responsive ---- */
/* 1024 (and 900/768): stay 2 × 2 per the reference — only density shrinks. */
@media (max-width: 1024px) {
  .ca-ico {
    width: 44px;
    height: 44px;
  }

  .ca-ico svg {
    width: 20px;
    height: 20px;
  }

  .ca-title {
    font-size: 12.5px;
  }

  .ca-desc {
    font-size: 11.5px;
  }

  .ca-card {
    padding: 14px;
    gap: 9px;
  }
}

/* 640 and below: single column in reference order 01 → 02 → 03 → 04.
   Benefit blocks relax to two columns so 3-block cards wrap compactly. */
@media (max-width: 640px) {
  .ca-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .career-adv h2 {
    font-size: clamp(1.45rem, 5.6vw, 1.7rem);
  }

  .ca-card {
    padding: 16px;
    gap: 10px;
  }

  .ca-benefits--3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ca-benefits--4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Very small screens: stack the benefit blocks as compact full-width rows
   (icon + label side by side) so cards stay dense and readable. */
@media (max-width: 360px) {
  .ca-card {
    padding: 14px;
    gap: 8px;
  }

  .ca-title {
    font-size: 12px;
  }

  .ca-benefits--3 {
    grid-template-columns: 1fr;
  }
}
</style>