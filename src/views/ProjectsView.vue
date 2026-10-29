<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CareerProject } from '../data/projects'
import { getProjects } from '../services/projects'
import ProjectCard from '../components/ProjectCard.vue'

const projects = ref<CareerProject[]>([])
const categories = ref<string[]>(['All'])
const loading = ref(true)
const loadError = ref(false)

const search = ref('')
const activeCategory = ref('All')

onMounted(async () => {
  try {
    projects.value = await getProjects()
    categories.value = ['All', ...new Set(projects.value.map((p) => p.category))]
  } catch {
    loadError.value = true
  } finally {
    loading.value = false
  }
})

const hasFilters = computed(
  () => search.value.trim() !== '' || activeCategory.value !== 'All',
)

function clearFilters() {
  search.value = ''
  activeCategory.value = 'All'
}

const filtered = computed(() => {
  let list = projects.value
  if (activeCategory.value !== 'All') {
    list = list.filter((p) => p.category === activeCategory.value)
  }
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter((p) =>
      [p.title, p.category, ...p.technologies, ...p.skills].some((f) =>
        f.toLowerCase().includes(q),
      ),
    )
  }
  return list
})
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <div class="crumbs">
          <router-link to="/">Home</router-link> <span>/</span> Projects
        </div>
        <h1>Real-World Projects</h1>
        <p>
          Explore sample project-blueprints that mirror real-world workflows — and see the
          skills each one helps you build.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="demo-warning" role="note">
          <strong>⚠️ Demo data notice:</strong> Projects shown here are sample/demo content,
          not client work or production systems. They are blueprints for portfolio-oriented
          learning.
        </div>

        <div class="toolbar">
          <input
            v-model="search"
            type="search"
            class="search-input"
            placeholder="Search project titles, technologies or skills..."
            aria-label="Search project titles, technologies or skills"
          />
          <div class="ctl-field">
            <label for="project-category">Category</label>
            <select id="project-category" v-model="activeCategory" class="select-input">
              <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <p v-if="loading" class="feed-feedback">Loading projects…</p>
        <p v-else-if="loadError" class="feed-feedback">
          Unable to load projects right now. Please try again later.
        </p>
        <p v-else-if="projects.length === 0" class="feed-feedback">
          No sample projects are available yet. Please check back soon.
        </p>
        <div v-else-if="filtered.length === 0" class="feed-feedback">
          <p class="feed-feedback-msg">No projects match your search.</p>
          <button v-if="hasFilters" type="button" class="btn btn-outline" @click="clearFilters">
            Clear Filters
          </button>
        </div>
        <div v-else class="project-grid">
          <ProjectCard v-for="p in filtered" :key="p.id" :project="p" />
        </div>

        <div class="center-cta">
          <router-link to="/courses" class="btn btn-accent">Explore Career Programs →</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-warning {
  background: #fff7ed;
  border: 1px solid #fdba74;
  border-radius: var(--radius);
  color: #9a3412;
  font-size: 14.5px;
  padding: 16px 18px;
  line-height: 1.55;
  margin-bottom: 28px;
}

.demo-warning strong {
  font-weight: 800;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: end;
  margin-bottom: 30px;
}

.search-input {
  flex: 1;
  min-width: 260px;
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
  min-width: 220px;
}

.feed-feedback {
  text-align: center;
  color: var(--muted);
  padding: 40px 0;
  font-size: 1.02rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.feed-feedback-msg {
  font-size: 1.02rem;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.center-cta {
  text-align: center;
  margin-top: 36px;
}

@media (max-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .project-grid {
    grid-template-columns: 1fr;
  }

  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>