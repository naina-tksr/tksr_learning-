<script setup lang="ts">
import { computed } from 'vue'
import {
  formatDeadline,
  getUrgencyLabel,
  isRecentlyAdded,
  type JobUrgencyState,
} from '../utils/urgency'

const props = withDefaults(
  defineProps<{
    state: JobUrgencyState
    /** Application deadline. Optional — when missing, no deadline line is shown. */
    deadline?: string
    /** Publish date used for the "Recently Added" signal. Optional. */
    publishedAt?: string
    /** When true, the deadline is labeled "Demo Deadline" (sample data transparency). */
    demo?: boolean
  }>(),
  { deadline: undefined, publishedAt: undefined, demo: false },
)

const label = computed(() => getUrgencyLabel(props.state))

const recentlyAdded = computed(() => isRecentlyAdded(props.publishedAt))

const deadlineText = computed(() => {
  const formatted = formatDeadline(props.deadline)
  if (!formatted) return null
  return props.demo ? `Demo Deadline: ${formatted}` : `Deadline: ${formatted}`
})
</script>

<template>
  <div class="urgency-badge" aria-label="Opportunity status">
    <span v-if="recentlyAdded" class="ub-chip ub-chip--recent">Recently Added</span>
    <span class="ub-chip" :class="`ub-chip--${state}`">{{ label }}</span>
    <span v-if="deadlineText" class="ub-deadline">{{ deadlineText }}</span>
  </div>
</template>

<style scoped>
.urgency-badge {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.ub-chip {
  font-size: 12px;
  font-weight: 800;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid transparent;
  letter-spacing: 0.3px;
}

/* State colors carry readable text as well, so color is never the only cue. */
.ub-chip--open {
  background: #f0fdf4;
  color: #15803d;
  border-color: #bbf7d0;
}

.ub-chip--no-deadline {
  background: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.ub-chip--closing-soon {
  background: #fffbeb;
  color: #b45309;
  border-color: #fde68a;
}

.ub-chip--closed {
  background: #f1f5f9;
  color: #64748b;
  border-color: #e2e8f0;
}

.ub-chip--recent {
  background: #faf5ff;
  color: #7c3aed;
  border-color: #e9d5ff;
}

.ub-deadline {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-2);
  white-space: nowrap;
}

@media (max-width: 560px) {
  .ub-deadline {
    white-space: normal;
  }
}
</style>