<script setup lang="ts">
import { computed } from 'vue'
import { jobs } from '../data/jobs'
import { getDaysSince, isRecentlyAdded } from '../utils/urgency'

/**
 * Highlights only opportunities whose `publishedAt` is within the deterministic
 * "recently added" window. Renders nothing when no qualifying record exists —
 * it never shows a fake "recent" section.
 */
const recentJobs = computed(() => jobs.filter((j) => isRecentlyAdded(j.publishedAt)))

function addedText(job: (typeof jobs)[number]): string | null {
  const days = getDaysSince(job.publishedAt)
  if (days === null) return null
  if (days <= 0) return 'Added today (demo date)'
  return `Added ${days} day${days === 1 ? '' : 's'} ago (demo date)`
}
</script>

<template>
  <section
    v-if="recentJobs.length"
    class="recent-block"
    aria-labelledby="recent-heading"
  >
    <div class="recent-head">
      <span class="eyebrow">🆕 Recently Added</span>
      <h2 id="recent-heading">Recently Added Career Opportunities</h2>
      <p>
        Explore opportunities that have been added recently and review their
        requirements before applying.
      </p>
    </div>

    <p class="recent-demo-note" role="note">
      ⚠️ <strong>Sample Opportunities.</strong> These records and their dates are
      demonstration data — not live job postings or live application deadlines.
    </p>

    <div class="recent-grid">
      <article v-for="j in recentJobs" :key="j.id" class="recent-card">
        <div class="recent-badges">
          <span class="rb rb--demo">Sample Opportunity</span>
          <span class="rb rb--recent">Recently Added</span>
        </div>
        <h3>
          <router-link :to="`/jobs/${j.id}`">{{ j.title }}</router-link>
        </h3>
        <p class="recent-company">{{ j.company }} · {{ j.location }}</p>
        <p v-if="addedText(j)" class="recent-added-text">{{ addedText(j) }}</p>
        <ul class="recent-skills">
          <li v-for="s in j.skills.slice(0, 4)" :key="s">{{ s }}</li>
        </ul>
        <div class="recent-actions">
          <router-link :to="`/jobs/${j.id}`" class="btn btn-outline">
            Review Opportunity →
          </router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.recent-block {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.recent-head {
  text-align: center;
}

.recent-head h2 {
  font-size: clamp(1.4rem, 3vw, 1.9rem);
  margin: 8px 0 10px;
}

.recent-head p {
  color: var(--muted);
  max-width: 620px;
  margin: 0 auto;
}

.recent-demo-note {
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: var(--radius);
  color: #9a3412;
  font-size: 13.5px;
  padding: 12px 16px;
  line-height: 1.5;
}

.recent-demo-note strong {
  font-weight: 800;
}

.recent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.recent-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recent-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.rb {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
}

.rb--demo {
  background: #fff7ed;
  color: #c2410c;
  border-color: #fdba74;
}

.rb--recent {
  background: #faf5ff;
  color: #7c3aed;
  border-color: #e9d5ff;
}

.recent-card h3 {
  font-size: 1.04rem;
  line-height: 1.35;
}

.recent-card h3 a {
  color: var(--ink);
}

.recent-card h3 a:hover {
  color: var(--primary-600);
}

.recent-company {
  color: var(--muted);
  font-size: 13.5px;
  font-weight: 600;
}

.recent-added-text {
  font-size: 12.5px;
  font-weight: 700;
  color: #7c3aed;
}

.recent-skills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.recent-skills li {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 3px 9px;
  border-radius: 999px;
}

.recent-actions {
  margin-top: auto;
  padding-top: 6px;
}

.recent-actions .btn {
  justify-content: center;
  width: 100%;
}

@media (max-width: 1024px) {
  .recent-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .recent-grid {
    grid-template-columns: 1fr;
  }
}
</style>