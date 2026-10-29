<script setup lang="ts">
import type { CareerProject } from '../data/projects'

defineProps<{ project: CareerProject }>()
</script>

<template>
  <article class="project-card">
    <div class="project-top">
      <span class="project-cat">{{ project.category }}</span>
      <span class="project-badge">Sample Project</span>
    </div>

    <h3 class="project-title">{{ project.title }}</h3>
    <p class="project-desc">{{ project.description }}</p>

    <div class="project-block">
      <h4>Technologies</h4>
      <ul class="pill-list">
        <li v-for="t in project.technologies" :key="t">{{ t }}</li>
      </ul>
    </div>

    <div class="project-block">
      <h4>Skills</h4>
      <ul class="pill-list">
        <li v-for="s in project.skills" :key="s">{{ s }}</li>
      </ul>
    </div>

    <div class="project-stages" aria-label="Project journey">
      <template v-for="(stage, i) in project.projectStages" :key="stage">
        <span class="stage">{{ stage }}</span>
        <span v-if="i < project.projectStages.length - 1" class="stage-arrow" aria-hidden="true">→</span>
      </template>
    </div>

    <p class="project-value">💼 {{ project.portfolioValue }}</p>

    <router-link :to="`/projects/${project.id}`" class="btn btn-primary project-view">
      View Project
    </router-link>
  </article>
</template>

<style scoped>
.project-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s ease, box-shadow 0.25s ease, border-color 0.2s;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: rgba(37, 99, 235, 0.35);
}

.project-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.project-cat {
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: var(--primary-600);
  background: rgba(37, 99, 235, 0.09);
  padding: 5px 10px;
  border-radius: 999px;
}

.project-badge {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #c2410c;
  background: #fff7ed;
  border: 1px solid #fdba74;
  padding: 5px 10px;
  border-radius: 999px;
}

.project-title {
  font-size: 1.12rem;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.project-desc {
  font-size: 13.5px;
  color: var(--muted);
  line-height: 1.6;
}

.project-block h4 {
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--ink-2);
  margin-bottom: 8px;
}

.pill-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill-list li {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 4px 10px;
  border-radius: 999px;
}

.project-stages {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 10px 12px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.stage {
  font-size: 12px;
  font-weight: 700;
  color: var(--primary-dark);
}

.stage-arrow {
  color: var(--muted);
  font-size: 12px;
}

.project-value {
  font-size: 13px;
  color: var(--ink-2);
  font-weight: 600;
  line-height: 1.5;
}

.project-view {
  margin-top: auto;
}
</style>