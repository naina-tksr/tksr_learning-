<script setup lang="ts">
/**
 * Reusable, non-intrusive strip of data-backed career signals.
 * Accepts an explicit list of signals — it never hardcodes a marketing claim.
 * No animations, no popups, no timers.
 */
defineProps<{
  signals: string[]
  /** Optional contextual note (e.g. demo-data disclaimer). */
  note?: string
}>()
</script>

<template>
  <div v-if="signals.length" class="signal-strip">
    <p v-if="note" class="signal-note">{{ note }}</p>
    <ul class="signal-list" aria-label="Career opportunity signals">
      <li v-for="s in signals" :key="s" class="signal-chip">{{ s }}</li>
    </ul>
  </div>
</template>

<style scoped>
.signal-strip {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 24px 0;
}

.signal-note {
  font-size: 13px;
  color: var(--muted);
}

.signal-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.signal-chip {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--primary-700, #1d4ed8);
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.25);
  padding: 6px 12px;
  border-radius: 999px;
}
</style>