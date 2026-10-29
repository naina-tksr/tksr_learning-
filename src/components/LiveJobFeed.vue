<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Job } from '../data/jobs'
import { getJobs } from '../services/jobs'
import JobCard from './JobCard.vue'
import {
  getUrgencyState,
  isOpportunityOpen,
  isRecentlyAdded,
} from '../utils/urgency'

const props = withDefaults(
  defineProps<{ limit?: number; showControls?: boolean }>(),
  { limit: undefined, showControls: true },
)

const jobs = ref<Job[]>([])
const loading = ref(true)
const loadError = ref(false)

const search = ref('')
const workMode = ref('All')
const statusFilter = ref('All')
const opportunityStatus = ref('All')

const WORK_MODES = ['All', 'Remote', 'Hybrid', 'On-site']
const STATUS_OPTIONS = ['All', 'Open', 'Closing']
const OPPORTUNITY_STATUS_OPTIONS = ['All', 'Open', 'Closing Soon', 'Recently Added']

onMounted(async () => {
  try {
    jobs.value = await getJobs()
  } catch {
    loadError.value = true
  } finally {
    loading.value = false
  }
})

const hasFilters = computed(
  () =>
    search.value.trim() !== '' ||
    workMode.value !== 'All' ||
    statusFilter.value !== 'All' ||
    opportunityStatus.value !== 'All',
)

function clearFilters() {
  search.value = ''
  workMode.value = 'All'
  statusFilter.value = 'All'
  opportunityStatus.value = 'All'
}

const filtered = computed(() => {
  let list = jobs.value
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter((j) =>
      [j.title, j.company, j.location, ...j.skills].some((f) => f.toLowerCase().includes(q)),
    )
  }
  if (workMode.value !== 'All') list = list.filter((j) => j.workMode === workMode.value)
  if (statusFilter.value === 'Open') {
    list = list.filter((j) => j.status === 'open' || j.status === 'closing')
  }
  if (statusFilter.value === 'Closing') list = list.filter((j) => j.status === 'closing')
  // Opportunity-status filter (data-backed urgency signals, never fabricated).
  if (opportunityStatus.value === 'Open') {
    list = list.filter((j) => isOpportunityOpen(j.status, j.deadline))
  }
  if (opportunityStatus.value === 'Closing Soon') {
    list = list.filter((j) => getUrgencyState(j.deadline, j.status) === 'closing-soon')
  }
  if (opportunityStatus.value === 'Recently Added') {
    list = list.filter((j) => isRecentlyAdded(j.publishedAt))
  }
  if (props.limit !== undefined) list = list.slice(0, props.limit)
  return list
})
</script>

<template>
  <div class="job-feed">
    <p class="feed-demo-note">
      📌 <strong>Sample Opportunities.</strong> These listings are demo data, not live job
      postings. Live job-feed integration is planned for a future backend/API phase.
    </p>

    <div v-if="showControls" class="job-controls">
      <div class="ctl-field ctl-search">
        <input
          id="job-search"
          v-model="search"
          type="search"
          class="search-input"
          placeholder="Search roles, skills or companies..."
          aria-label="Search roles, skills or companies"
        />
      </div>
      <div class="ctl-field">
        <label for="job-mode">Work Mode</label>
        <select id="job-mode" v-model="workMode" class="select-input">
          <option v-for="m in WORK_MODES" :key="m" :value="m">{{ m }}</option>
        </select>
      </div>
      <div class="ctl-field">
        <label for="job-status">Status</label>
        <select id="job-status" v-model="statusFilter" class="select-input">
          <option v-for="s in STATUS_OPTIONS" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <div class="ctl-field">
        <label for="job-opportunity-status">Opportunity Status</label>
        <select id="job-opportunity-status" v-model="opportunityStatus" class="select-input">
          <option v-for="o in OPPORTUNITY_STATUS_OPTIONS" :key="o" :value="o">{{ o }}</option>
        </select>
      </div>
    </div>

    <p v-if="loading" class="job-feedback">Loading opportunities…</p>
    <p v-else-if="loadError" class="job-feedback">
      Unable to load opportunities right now. Please try again later.
    </p>
    <p v-else-if="jobs.length === 0" class="job-feedback">
      No sample opportunities are available yet. Please check back soon.
    </p>
    <div v-else-if="filtered.length === 0" class="job-feedback">
      <p class="job-feedback-msg">No opportunities match your search.</p>
      <button v-if="hasFilters" type="button" class="btn btn-outline" @click="clearFilters">
        Clear Filters
      </button>
    </div>
    <div v-else class="job-grid">
      <JobCard v-for="j in filtered" :key="j.id" :job="j" />
    </div>
  </div>
</template>

<style scoped>
.job-feed {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.feed-demo-note {
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: var(--radius);
  color: #9a3412;
  font-size: 13.5px;
  padding: 12px 16px;
  line-height: 1.5;
}

.feed-demo-note strong {
  font-weight: 800;
}

.job-controls {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 14px;
  align-items: end;
}

.ctl-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ctl-field label {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-2);
}

.search-input,
.select-input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  color: var(--ink);
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.search-input:focus,
.select-input:focus {
  outline: none;
  border-color: var(--primary-600);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.job-feedback {
  text-align: center;
  color: var(--muted);
  padding: 40px 0;
  font-size: 1.02rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.job-feedback-msg {
  font-size: 1.02rem;
}

.job-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

@media (max-width: 1024px) {
  .job-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .job-controls {
    grid-template-columns: 1fr 1fr;
  }

  .ctl-search {
    grid-column: 1 / -1;
  }
}

@media (max-width: 560px) {
  .job-controls {
    grid-template-columns: 1fr;
  }

  .job-grid {
    grid-template-columns: 1fr;
  }
}
</style>