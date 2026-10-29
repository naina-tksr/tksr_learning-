<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { CareerProject } from '../data/projects'
import { getProjectById } from '../services/projects'

const route = useRoute()
const projectId = String(route.params.id)

const project = ref<CareerProject | null>(null)
const loading = ref(true)
const notFound = ref(false)

onMounted(async () => {
  try {
    const found = await getProjectById(projectId)
    project.value = found ?? null
    if (!found) notFound.value = true
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <p v-if="loading" class="detail-feedback">Loading project…</p>

    <template v-else-if="notFound">
      <section class="detail-missing">
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist or may have been removed.</p>
        <router-link to="/projects" class="btn btn-outline">← Back to Projects</router-link>
      </section>
    </template>

    <template v-else-if="project">
      <section class="page-banner project-detail-banner">
        <div class="container">
          <div class="crumbs">
            <router-link to="/">Home</router-link> <span>/</span>
            <router-link to="/projects">Projects</router-link> <span>/</span>
            {{ project.title }}
          </div>
          <span class="demo-flag">SAMPLE PROJECT — DEMO CONTENT</span>
          <h1>{{ project.title }}</h1>
          <p>{{ project.category }}</p>
        </div>
      </section>

      <section class="section">
        <div class="container project-detail">
          <div class="pd-actions">
            <router-link to="/projects" class="btn btn-outline">← Back to Projects</router-link>
          </div>

          <div class="pd-block card">
            <h2>About the Project</h2>
            <p class="pd-desc">{{ project.description }}</p>
          </div>

          <div class="pd-grid">
            <div class="pd-block card">
              <h2>Technologies</h2>
              <ul class="pd-pills">
                <li v-for="t in project.technologies" :key="t">{{ t }}</li>
              </ul>
            </div>
            <div class="pd-block card">
              <h2>Skills Developed</h2>
              <ul class="pd-pills">
                <li v-for="s in project.skills" :key="s">{{ s }}</li>
              </ul>
            </div>
          </div>

          <div class="pd-block">
            <h2>Project Journey</h2>
            <div class="pd-journey">
              <template v-for="(stage, i) in project.projectStages" :key="stage">
                <div class="pd-stage">
                  <span class="pd-step">{{ i + 1 }}</span>
                  <strong>{{ stage }}</strong>
                </div>
                <span v-if="i < project.projectStages.length - 1" class="pd-arrow" aria-hidden="true">→</span>
              </template>
            </div>
          </div>

          <div class="pd-block card">
            <h2>Outcome</h2>
            <p class="pd-desc">{{ project.outcome }}</p>
          </div>

          <div class="pd-grid">
            <div class="pd-block card">
              <h2>Portfolio Value</h2>
              <p class="pd-desc">{{ project.portfolioValue }}</p>
            </div>
            <div v-if="project.careerRelevance" class="pd-block card">
              <h2>Career Relevance</h2>
              <p class="pd-desc">{{ project.careerRelevance }}</p>
            </div>
          </div>

          <div class="pd-cta">
            <h2>Build This → Develop These Skills → Explore Relevant Learning</h2>
            <p>
              This sample project is a starting point. Find TKSR programs that can help you
              develop the capabilities it demonstrates.
            </p>
            <div class="pd-cta-actions">
              <router-link to="/courses" class="btn btn-accent">Explore Career Programs →</router-link>
              <router-link to="/jobs" class="btn btn-outline">Explore Career Opportunities</router-link>
            </div>
          </div>
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

.project-detail-banner p {
  color: rgba(255, 255, 255, 0.88);
  font-weight: 600;
}

.project-detail {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.pd-actions {
  margin-bottom: 4px;
}

.pd-block.card {
  padding: 28px 26px;
}

.pd-block h2 {
  font-size: 1.3rem;
  margin-bottom: 14px;
}

.pd-desc {
  color: var(--muted);
  line-height: 1.7;
}

.pd-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.pd-pills {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pd-pills li {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: 999px;
}

.pd-journey {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 22px 24px;
}

.pd-stage {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pd-stage strong {
  font-size: 14px;
  color: var(--ink-2);
}

.pd-step {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gradient);
  color: #fff;
  font-weight: 800;
  font-size: 13px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.pd-arrow {
  color: var(--primary-600);
  font-size: 16px;
  font-weight: 800;
}

.pd-cta {
  background: var(--gradient);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 42px 44px;
  text-align: center;
  margin-top: 8px;
  box-shadow: 0 24px 50px rgba(29, 78, 216, 0.35);
}

.pd-cta h2 {
  color: #fff;
  font-size: clamp(1.3rem, 2.6vw, 1.7rem);
  margin-bottom: 10px;
}

.pd-cta p {
  color: rgba(255, 255, 255, 0.9);
  max-width: 620px;
  margin: 0 auto 24px;
}

.pd-cta-actions {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 560px) {
  .pd-grid {
    grid-template-columns: 1fr;
  }

  .pd-cta {
    padding: 30px 22px;
  }
}
</style>