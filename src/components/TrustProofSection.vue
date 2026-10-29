<script setup lang="ts">
import { trustCards, trustJourney } from '../data/trust'
import { experts } from '../data/experts'
import { projects } from '../data/projects'

// Counts derived from the live sample/demo data on this site — honest numbers,
// never invented statistics.
const sampleExpertCount = experts.length
const sampleProjectCount = projects.length
</script>

<template>
  <!-- Phase 11: compact white "Trust" band — soft projects above,
       dark career-programs below. Copy kept verbatim from the approved source. -->
  <section class="section trust-section" aria-labelledby="trust-heading">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">Trust &amp; Transparency</span>
        <h2 id="trust-heading">Why Learners Can Trust the TKSR Approach</h2>
        <p class="trust-lead">
          TKSR helps learners move closer to industry through skills, projects,
          experts and career opportunities — described honestly, without inflated
          claims or fabricated proof.
        </p>
      </div>

      <div class="trust-grid">
        <article v-for="card in trustCards" :key="card.id" class="trust-card">
          <h3>{{ card.title }}</h3>
          <p class="trust-desc">{{ card.description }}</p>
          <ul class="trust-points">
            <li v-for="point in card.points" :key="point">{{ point }}</li>
          </ul>
          <router-link :to="card.href" class="trust-link">{{ card.cta }} →</router-link>
        </article>
      </div>

      <p class="trust-evidence">
        <span class="evidence-pill">Verification Pending</span>
        <span class="evidence-text">
          <strong>Honest by design:</strong> the practitioner profiles
          ({{ sampleExpertCount }} sample profiles) and project blueprints
          ({{ sampleProjectCount }} sample projects) shown on this site are
          demonstration content. Verified learner stories and confirmed partner
          details will be published here as they become available.
        </span>
      </p>

      <div class="journey" role="group" aria-labelledby="journey-title">
        <h3 id="journey-title" class="journey-title">The TKSR Way</h3>
        <ol class="journey-list">
          <li v-for="s in trustJourney" :key="s.step" class="journey-step">
            <span class="j-num" aria-hidden="true">{{ s.step }}</span>
            <strong>{{ s.label }}</strong>
            <span class="j-detail">{{ s.detail }}</span>
          </li>
        </ol>
        <p class="journey-note">
          This journey is about building evidence of your skills — it is not a
          promise of employment, placement, interviews or a guaranteed salary.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* White band between the soft projects section (above) and the dark
   career-programs section (below) — rhythm: soft → white → dark. */
.trust-section {
  background: var(--bg);
  padding: 44px 0 48px;
}

.trust-section .section-head {
  margin-bottom: 28px;
}

/* Lavender pill eyebrow — same family as the phase 4–11 section pills. */
.trust-section .eyebrow {
  margin-bottom: 12px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

/* Compact heading — softer than the hero/conversion headlines. */
.trust-section h2 {
  margin: 0;
  font-size: clamp(1.45rem, 2.6vw, 2.05rem);
  line-height: 1.15;
  color: var(--ink);
}

.trust-lead {
  margin: 8px auto 0;
  max-width: 720px;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--muted);
  text-align: center;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* Compact premium proof cards — white, static (no hover transforms). */
.trust-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(13, 31, 78, 0.07);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.trust-card h3 {
  font-size: 16px;
  line-height: 1.25;
  color: var(--ink);
}

.trust-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.55;
}

.trust-points {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.trust-points li {
  font-size: 12.5px;
  color: var(--ink-2);
  display: flex;
  gap: 7px;
  align-items: center;
}

.trust-points li::before {
  content: '✓';
  color: #4f46e5;
  font-weight: 800;
}

.trust-link {
  margin-top: auto;
  font-weight: 700;
  color: #4f46e5;
  font-size: 13.5px;
}

.trust-link:hover {
  text-decoration: underline;
}

/* Honest state note — carries the explicit pending-verification badge. */
.trust-evidence {
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 22px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 14px;
}

.evidence-pill {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #4f46e5;
  background: #eef1ff;
  border: 1px solid rgba(99, 102, 241, 0.18);
  padding: 4px 10px;
  border-radius: 999px;
}

.evidence-text {
  max-width: 720px;
  font-size: 13px;
  color: var(--ink-2);
  line-height: 1.6;
  text-align: center;
}

/* The TKSR Way — lightened from a dark panel to keep the band white and calm. */
.journey {
  margin-top: 40px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 28px 24px;
}

.journey-title {
  color: var(--ink);
  text-align: center;
  font-size: 1.15rem;
  margin-bottom: 20px;
}

.journey-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.journey-step {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 16px;
  flex: 1 1 150px;
  max-width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.j-num {
  color: #4f46e5;
  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.5px;
}

.journey-step strong {
  color: var(--ink);
  font-size: 14px;
}

.j-detail {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.journey-note {
  margin: 18px auto 0;
  text-align: center;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.6;
  max-width: 640px;
}

@media (max-width: 1024px) {
  .trust-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .trust-section {
    padding: 36px 0 42px;
  }
}

@media (max-width: 640px) {
  .trust-section {
    padding: 32px 0 38px;
  }

  .trust-grid {
    grid-template-columns: 1fr;
  }

  .journey {
    padding: 22px 16px;
  }

  .journey-step {
    flex: 1 1 100%;
    max-width: none;
  }
}
</style>