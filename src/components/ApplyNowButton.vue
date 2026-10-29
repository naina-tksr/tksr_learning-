<script setup lang="ts">
import { ref } from 'vue'
import type { Job } from '../data/jobs'

const props = withDefaults(
  defineProps<{ job: Job; label?: string; variant?: 'primary' | 'outline' }>(),
  { label: 'Apply Now', variant: 'primary' },
)

const showNotice = ref(false)

const isLiveApply = !props.job.isDemo && Boolean(props.job.applyUrl)
const btnClass = props.variant === 'outline' ? 'btn btn-outline apply-btn' : 'btn btn-primary apply-btn'
const demoNotice =
  'This is a sample opportunity. Application functionality will be connected when the live career feed is integrated.'
</script>

<template>
  <div class="apply-wrap">
    <a
      v-if="isLiveApply"
      :href="job.applyUrl"
      target="_blank"
      rel="noopener noreferrer"
      :class="btnClass"
    >
      {{ label }}
    </a>
    <button
      v-else
      type="button"
      :class="btnClass"
      :aria-expanded="showNotice"
      @click="showNotice = !showNotice"
    >
      {{ label }}
    </button>
    <p v-if="!isLiveApply && showNotice" class="apply-demo-note">
      {{ demoNotice }}
    </p>
  </div>
</template>

<style scoped>
.apply-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.apply-demo-note {
  font-size: 13px;
  color: var(--muted);
  background: var(--bg-soft);
  border: 1px dashed var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  line-height: 1.5;
}
</style>