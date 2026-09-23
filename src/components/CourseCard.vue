<script setup lang="ts">
import type { Course } from '../data/site'

defineProps<{ course: Course }>()
</script>

<template>
  <article class="course-card">
    <div class="cc-top">
      <span class="cc-icon">{{ course.icon }}</span>
      <span class="cc-cat">{{ course.category }}</span>
    </div>
    <h3 class="cc-title">{{ course.title }}</h3>
    <p class="cc-summary">{{ course.summary }}</p>
    <div class="cc-tags">
      <span v-for="t in course.tags" :key="t" class="cc-tag">{{ t }}</span>
    </div>
    <div class="cc-meta">
      <span>⏱ {{ course.duration }}</span>
      <span>🏷 {{ course.level }}</span>
    </div>
    <div class="cc-bottom">
      <div class="cc-price">
        <strong>{{ course.price }}</strong>
        <span class="cc-rating">★ {{ course.rating }} <em>{{ course.learners }} learners</em></span>
      </div>
      <button class="cc-btn">View Details</button>
    </div>
  </article>
</template>

<style scoped>
.course-card {
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

.course-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(37, 99, 235, 0.35);
}

.cc-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cc-icon {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: var(--bg-soft);
  display: grid;
  place-items: center;
  font-size: 24px;
}

.cc-cat {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--primary-600);
  background: rgba(37, 99, 235, 0.09);
  padding: 5px 10px;
  border-radius: 999px;
}

.cc-title {
  font-size: 1.12rem;
  line-height: 1.3;
}

.cc-summary {
  color: var(--muted);
  font-size: 14px;
}

.cc-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.cc-tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 3px 10px;
  border-radius: 999px;
}

.cc-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: var(--muted);
  font-weight: 600;
}

.cc-bottom {
  margin-top: auto;
  padding-top: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.cc-price {
  display: flex;
  flex-direction: column;
}

.cc-price strong {
  font-size: 1.06rem;
  font-weight: 800;
}

.cc-rating {
  font-size: 13px;
  color: #d97706;
  font-weight: 700;
}

.cc-rating em {
  font-style: normal;
  color: var(--muted);
  font-weight: 500;
}

.cc-btn {
  background: var(--gradient);
  border: none;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  padding: 9px 14px;
  border-radius: 9px;
  transition: transform 0.15s, box-shadow 0.2s;
}

.cc-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(29, 78, 216, 0.35);
}
</style>