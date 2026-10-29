<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CareerProject } from '../data/projects'
import { getProjects } from '../services/projects'

const projects = ref<CareerProject[]>([])
const loading = ref(true)
const loadError = ref(false)

onMounted(async () => {
  try {
    projects.value = await getProjects()
  } catch {
    loadError.value = true
  } finally {
    loading.value = false
  }
})

/** Compact homepage preview — all 6 sample blueprints remain on /projects. */
const previewProjects = computed(() => projects.value.slice(0, 3))
</script>

<template>
  <!-- Phase 10: compact soft "Projects" band — white experts above,
       white trust below. Copy kept verbatim from the approved source. -->
  <section class="section section--soft projects-section" aria-labelledby="projects-heading">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">Projects</span>
        <h2 id="projects-heading">Build Projects That Move Beyond Theory</h2>
        <p class="projects-lead">
          Work through practical project workflows — Concept → Problem → Build → Deploy →
          Portfolio — and develop experience that resembles real-world work.
        </p>
      </div>

      <p v-if="loading" class="project-feedback">Loading projects…</p>
      <p v-else-if="loadError" class="project-feedback">Unable to load projects right now.</p>
      <p v-else-if="previewProjects.length === 0" class="project-feedback">
        No sample projects are available yet.
      </p>
      <div v-else class="project-grid">
        <article v-for="p in previewProjects" :key="p.id" class="project-card">
          <div class="project-top">
            <span class="project-cat">{{ p.category }}</span>
            <span class="project-badge">Sample Project</span>
          </div>

          <h3 class="project-title">{{ p.title }}</h3>
          <p class="project-desc">{{ p.description }}</p>

          <ul class="pill-list" aria-label="Technologies">
            <li v-for="t in p.technologies" :key="t">{{ t }}</li>
          </ul>

          <router-link :to="`/projects/${p.id}`" class="btn btn-primary project-view">
            View Project
          </router-link>
        </article>
      </div>

      <p class="demo-footnote">Projects shown are sample/demo content for demonstration.</p>

      <div class="center-cta">
        <router-link to="/projects" class="btn btn-primary">View All Projects →</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Soft band between the white experts section (above) and the white trust
   section (below) — rhythm: white → soft → white. */
.projects-section {
  padding: 44px 0 48px;
}

.projects-section .section-head {
  margin-bottom: 28px;
}

/* Lavender pill eyebrow — same family as the phase 4–10 section pills. */
.projects-section .eyebrow {
  margin-bottom: 12px;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.3px;
  padding: 7px 15px;
  background: #eef1ff;
  color: #4f46e5;
  border: 1px solid rgba(99, 102, 241, 0.18);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.08);
}

/* Compact heading — softer than the hero/conversion headlines. */
.projects-section h2 {
  margin: 0;
  font-size: clamp(1.45rem, 2.6vw, 2.05rem);
  line-height: 1.15;
  color: var(--ink);
}

.projects-lead {
  margin: 8px auto 0;
  max-width: 720px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
  text-align: center;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Preview cards — white, compact, static (no hover transforms). */
.project-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(13, 31, 78, 0.07);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.project-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.project-cat {
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

/* Subdued demo-status chip — same treatment as the opportunities preview. */
.project-badge {
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

.project-title {
  font-size: 16.5px;
  line-height: 1.3;
  color: var(--ink);
}

.project-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.55;
}

.pill-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.pill-list li {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink-2);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 3px 9px;
  border-radius: 999px;
}

.project-view {
  margin-top: auto;
}

.project-feedback {
  text-align: center;
  color: var(--muted);
  padding: 40px 0;
}

.demo-footnote {
  text-align: center;
  color: var(--muted);
  font-size: 12.5px;
  margin-top: 20px;
}

.center-cta {
  text-align: center;
  margin-top: 26px;
}

@media (max-width: 900px) {
  .projects-section {
    padding: 36px 0 42px;
  }

  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects-section {
    padding: 32px 0 38px;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }
}
</style>