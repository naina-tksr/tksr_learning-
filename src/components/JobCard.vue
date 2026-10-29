<script setup lang="ts">
import { computed } from 'vue'
import type { Job } from '../data/jobs'
import ApplyNowButton from './ApplyNowButton.vue'
import UrgencyBadge from './UrgencyBadge.vue'
import { getUrgencyState } from '../utils/urgency'

const props = defineProps<{ job: Job }>()

const urgencyState = computed(() => getUrgencyState(props.job.deadline, props.job.status))

const statusText = (s: Job['status']) =>
  s === 'open' ? 'Open' : s === 'closing' ? 'Closing' : 'Closed'
</script>

<template>
  <article class="job-card">
    <div class="job-top">
      <span v-if="job.isDemo" class="job-badge job-badge--demo">Demo Data</span>
      <span v-else class="job-badge job-badge--live">Live</span>
      <span class="job-status" :class="`job-status--${job.status}`">
        {{ statusText(job.status) }}
      </span>
    </div>

    <h3 class="job-title">{{ job.title }}</h3>
    <p class="job-company">{{ job.company }}</p>

    <UrgencyBadge
      :state="urgencyState"
      :deadline="job.deadline"
      :published-at="job.publishedAt"
      :demo="job.isDemo"
    />

    <div class="job-meta">
      <span>📍 {{ job.location }}</span>
      <span>🕓 {{ job.workMode }}</span>
      <span>💼 {{ job.experience }}</span>
    </div>

    <ul class="job-skills">
      <li v-for="s in job.skills" :key="s">{{ s }}</li>
    </ul>

    <div class="job-actions">
      <router-link :to="`/jobs/${job.id}`" class="btn btn-primary job-view">
        View Opportunity
      </router-link>
      <ApplyNowButton :job="job" label="Apply Now" variant="outline" />
    </div>
  </article>
</template>

<style scoped>
.job-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s;
}

.job-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(37, 99, 235, 0.35);
}

.job-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.job-badge {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
}

.job-badge--demo {
  background: #fff7ed;
  color: #c2410c;
  border-color: #fdba74;
}

.job-badge--live {
  background: #ecfdf5;
  color: #047857;
  border-color: #a7f3d0;
}

.job-status {
  font-size: 12px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid transparent;
}

.job-status--open {
  background: #f0fdf4;
  color: #15803d;
  border-color: #bbf7d0;
}

.job-status--closing {
  background: #fffbeb;
  color: #b45309;
  border-color: #fde68a;
}

.job-status--closed {
  background: #f1f5f9;
  color: #64748b;
  border-color: #e2e8f0;
}

.job-title {
  font-size: 1.12rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.job-company {
  color: var(--muted);
  font-size: 14px;
  font-weight: 600;
}

.job-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  font-size: 13px;
  color: var(--muted);
  font-weight: 600;
}

.job-skills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.job-skills li {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 999px;
}

.job-actions {
  margin-top: auto;
  padding-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.job-view {
  flex: 1;
  min-width: 150px;
}

@media (max-width: 560px) {
  .job-view {
    flex-basis: 100%;
  }
}
</style>