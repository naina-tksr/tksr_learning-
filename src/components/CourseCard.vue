<script setup lang="ts">
import type { Course } from '../data/site'

defineProps<{ course: Course }>()
</script>

<template>
  <article class="course-card">
    <div class="cc-top">
      <span class="cc-cat">{{ course.category }}</span>
    </div>

    <h3 class="cc-title">{{ course.title }}</h3>

    <p class="cc-summary">{{ course.summary }}</p>

    <div class="cc-tags">
      <span v-for="t in course.tags" :key="t" class="cc-tag">{{ t }}</span>
    </div>

    <p class="cc-meta">{{ course.duration }} · {{ course.level }}</p>

    <div class="cc-bottom">
      <span class="cc-price">{{ course.price }}</span>
      <router-link :to="`/courses/${course.id}`" class="btn btn-primary cc-view">
        View Details
      </router-link>
    </div>

    <p class="cc-sample-note">*Sample/demo figures — not verified statistics.</p>
  </article>
</template>

<style scoped>
/* Phase 13: compact premium card on the soft Courses surface — same family as
   the Career Programs / Trust / Projects cards. No hover transforms, no emoji art. */
.course-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(13, 31, 78, 0.07);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.cc-top {
  display: flex;
  align-items: center;
}

.cc-cat {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #4f46e5;
  background: #eef1ff;
  border: 1px solid rgba(99, 102, 241, 0.18);
  padding: 4px 10px;
  border-radius: 999px;
}

.cc-title {
  margin: 0;
  font-size: 16.5px;
  line-height: 1.3;
  color: var(--ink);
}

.cc-summary {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

.cc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.cc-tag {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 3px 9px;
  border-radius: 999px;
}

.cc-meta {
  margin: 0;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--primary-600);
  letter-spacing: 0.3px;
}

.cc-bottom {
  margin-top: auto;
  padding-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.cc-price {
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
}

.cc-view {
  padding: 9px 14px;
  font-size: 13px;
  border-radius: 9px;
  box-shadow: 0 8px 18px rgba(29, 78, 216, 0.28);
}

.cc-sample-note {
  margin: 0;
  font-size: 10.5px;
  color: var(--muted);
}
</style>