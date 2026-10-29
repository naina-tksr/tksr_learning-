<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Job } from '../data/jobs'
import { getJobById } from '../services/jobs'
import ApplyNowButton from '../components/ApplyNowButton.vue'
import SkillGapPanel from '../components/SkillGapPanel.vue'
import UrgencyBadge from '../components/UrgencyBadge.vue'
import { resolveProgramsForJob, type ProgramMatch } from '../data/careerPrograms'
import { getUrgencyState, formatDeadline } from '../utils/urgency'

const route = useRoute()
const jobId = String(route.params.id)

const job = ref<Job | null>(null)
const loading = ref(true)
const notFound = ref(false)
const programMatches = ref<ProgramMatch[]>([])

onMounted(async () => {
  try {
    const found = await getJobById(jobId)
    job.value = found ?? null
    if (!found) notFound.value = true
    else programMatches.value = resolveProgramsForJob(found)
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
})

const statusText = (s: Job['status']) =>
  s === 'open' ? 'Open' : s === 'closing' ? 'Closing' : 'Closed'

const urgencyState = computed(() =>
  job.value ? getUrgencyState(job.value.deadline, job.value.status) : 'no-deadline',
)

// Timezone-safe formatting: date-only ISO strings are parsed as local dates
// (same rule as the urgency utils), so the shown date never shifts for users
// west of UTC.
const deadlineText = computed(() => formatDeadline(job.value?.deadline))
</script>

<template>
  <div>
    <p v-if="loading" class="detail-feedback">Loading opportunity…</p>

    <template v-else-if="notFound">
      <section class="detail-missing">
        <h1>Opportunity Not Found</h1>
        <p>The opportunity you're looking for doesn't exist or may have been removed.</p>
        <router-link to="/jobs" class="btn btn-outline">← Back to Career Opportunities</router-link>
      </section>
    </template>

    <template v-else-if="job">
      <section class="page-banner job-detail-banner">
        <div class="container">
          <div class="crumbs">
            <router-link to="/">Home</router-link> <span>/</span>
            <router-link to="/jobs">Career Opportunities</router-link> <span>/</span>
            {{ job.title }}
          </div>
          <span class="demo-flag">SAMPLE OPPORTUNITY — NOT A LIVE JOB POSTING</span>
          <h1>{{ job.title }}</h1>
          <p>{{ job.company }} · {{ job.location }} · {{ job.workMode }} · {{ job.experience }}</p>
          <div class="banner-meta">
            <UrgencyBadge
              :state="urgencyState"
              :deadline="job.deadline"
              :published-at="job.publishedAt"
              :demo="job.isDemo"
            />
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container detail-grid">
          <div class="detail-main">
            <h2>About the Opportunity</h2>
            <p class="detail-desc">{{ job.description }}</p>

            <h2>Responsibilities</h2>
            <ul class="detail-list">
              <li v-for="r in job.responsibilities" :key="r">{{ r }}</li>
            </ul>

            <h2>Requirements</h2>
            <ul class="detail-list">
              <li v-for="r in job.requirements" :key="r">{{ r }}</li>
            </ul>

            <SkillGapPanel :required-skills="job.skills" :programs="programMatches" />
          </div>

          <aside class="detail-side card">
            <h2>Quick Facts</h2>
            <dl class="fact-list">
              <div><dt>Company</dt><dd>{{ job.company }}</dd></div>
              <div><dt>Location</dt><dd>{{ job.location }}</dd></div>
              <div><dt>Work Mode</dt><dd>{{ job.workMode }}</dd></div>
              <div><dt>Experience</dt><dd>{{ job.experience }}</dd></div>
              <div><dt>Status (demo)</dt><dd>{{ statusText(job.status) }}</dd></div>
              <div><dt>Demo Deadline</dt><dd>{{ deadlineText ?? '—' }}</dd></div>
            </dl>

            <h2>Skills</h2>
            <ul class="detail-skills">
              <li v-for="s in job.skills" :key="s">{{ s }}</li>
            </ul>

            <ApplyNowButton :job="job" />
            <router-link to="/contact-us" class="btn btn-outline detail-expert">
              Talk to a Career Expert
            </router-link>
            <p class="detail-demo-warning">
              ⚠️ This is a <strong>sample opportunity</strong> shown for demonstration only.
            </p>
          </aside>
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.detail-feedback {
  text-align: center;
  color: var(--muted);
  padding: 80px 0;
  font-size: 1.05rem;
}

.detail-missing {
  text-align: center;
  padding: 100px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.detail-missing h1 {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
}

.detail-missing p {
  color: var(--muted);
  max-width: 460px;
}

.demo-flag {
  display: inline-block;
  margin: 16px 0 10px;
  background: #fff;
  color: #c2410c;
  font-size: 12.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 7px 14px;
  border-radius: 999px;
}

.job-detail-banner p {
  color: rgba(255, 255, 255, 0.88);
}

.banner-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.job-status {
  font-size: 12.5px;
  font-weight: 800;
  padding: 5px 14px;
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

.banner-deadline {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  font-size: 14px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 40px;
  align-items: start;
}

.detail-main h2 {
  font-size: 1.35rem;
  margin: 32px 0 12px;
}

.detail-main h2:first-child {
  margin-top: 0;
}

.detail-desc {
  color: var(--muted);
  line-height: 1.7;
}

.detail-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--ink-2);
}

.detail-list li {
  padding-left: 22px;
  position: relative;
  line-height: 1.6;
}

.detail-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--primary-600);
  font-weight: 800;
}

.detail-side {
  padding: 26px 24px;
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.detail-side h2 {
  font-size: 1.1rem;
}

.fact-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.fact-list > div {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.fact-list dt {
  color: var(--muted);
  font-weight: 500;
}

.fact-list dd {
  font-weight: 700;
  text-align: right;
}

.detail-skills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.detail-skills li {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 999px;
}

.detail-expert {
  justify-content: center;
}

.detail-demo-warning {
  font-size: 13px;
  color: #9a3412;
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: 10px;
  padding: 10px 12px;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .detail-side {
    position: static;
  }
}

@media (max-width: 560px) {
  .detail-main h2 {
    font-size: 1.2rem;
  }
}
</style>