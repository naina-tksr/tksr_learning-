<script setup lang="ts">
import type { Expert } from '../data/experts'

defineProps<{ expert: Expert }>()
</script>

<template>
  <article class="expert-card">
    <div class="expert-top">
      <span class="expert-avatar" aria-hidden="true">{{ expert.name.charAt(0) }}</span>
      <span class="expert-badge">Demo Profile</span>
    </div>

    <h3 class="expert-name">{{ expert.name }}</h3>
    <p class="expert-role">{{ expert.role }}</p>
    <p v-if="expert.experience" class="expert-exp">{{ expert.experience }}</p>

    <p class="expert-bio">{{ expert.bio }}</p>

    <div class="expert-block">
      <h4>Expertise</h4>
      <ul class="pill-list">
        <li v-for="e in expert.expertise" :key="e">{{ e }}</li>
      </ul>
    </div>

    <div class="expert-block">
      <h4>Technologies</h4>
      <ul class="pill-list">
        <li v-for="t in expert.technologies.slice(0, 3)" :key="t">{{ t }}</li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
/* Compact premium profile card — white, static (no hover transforms),
   all fields sourced from the existing demo records only. */
.expert-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(13, 31, 78, 0.07);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.expert-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

/* Decorative initial placeholder — no real headshots exist in the data. */
.expert-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(120deg, #2563eb 0%, #7c3aed 100%);
  color: #fff;
  font-weight: 800;
  font-size: 17px;
  display: grid;
  place-items: center;
}

.expert-badge {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #4f46e5;
  background: #eef1ff;
  border: 1px solid rgba(99, 102, 241, 0.18);
  padding: 4px 9px;
  border-radius: 999px;
}

.expert-name {
  font-size: 16.5px;
  line-height: 1.25;
  color: var(--ink);
}

.expert-role {
  font-size: 13px;
  font-weight: 700;
  color: var(--primary-600);
}

.expert-exp {
  font-size: 11.5px;
  color: var(--muted);
  font-weight: 600;
}

.expert-bio {
  font-size: 12.5px;
  color: var(--muted);
  line-height: 1.5;
}

.expert-block h4 {
  font-size: 10.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--ink-2);
  margin-bottom: 5px;
}

.pill-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.pill-list li {
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 2px 8px;
  border-radius: 999px;
}
</style>