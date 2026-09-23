<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import CourseCard from '../components/CourseCard.vue'
import { courses, CATEGORIES } from '../data/site'

const route = useRoute()
const search = ref('')
const activeCategory = ref<string>(CATEGORIES[0])

watch(
  () => route.query.category,
  (val) => {
    if (typeof val === 'string' && CATEGORIES.includes(val as never)) {
      activeCategory.value = val
    }
  },
  { immediate: true },
)

const filtered = computed(() => {
  let list = courses
  if (activeCategory.value !== CATEGORIES[0]) {
    list = list.filter((c) => c.category === activeCategory.value)
  }
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }
  return list
})

const filterCount = (cat: string) =>
  cat === CATEGORIES[0] ? courses.length : courses.filter((c) => c.category === cat).length
</script>

<template>
  <div>
    <section class="page-banner">
      <div class="container">
        <div class="crumbs">
          <router-link to="/">Home</router-link> <span>/</span> Courses
        </div>
        <h1>All Courses</h1>
        <p>
          Expert-led, career-focused programs across DevOps, Agile & Scrum, Software
          Testing, Project Management and Interview Preparation.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="toolbar">
          <input
            v-model="search"
            type="search"
            class="search-input"
            placeholder="🔍  Search courses, tools or skills…"
          />
          <div class="filter-tabs">
            <button
              v-for="c in CATEGORIES"
              :key="c"
              class="cat-tab"
              :class="{ active: activeCategory === c }"
              @click="activeCategory = c"
            >
              {{ c }}
              <span class="count">{{ filterCount(c) }}</span>
            </button>
          </div>
        </div>

        <p v-if="filtered.length === 0" class="empty">
          No courses match your search. Try a different keyword or category.
        </p>

        <div class="course-grid">
          <CourseCard v-for="c in filtered" :key="c.id" :course="c" />
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container cta-banner">
        <div>
          <h2>Not sure which course fits your career goal?</h2>
          <p>Talk to a TKSR career adviser for a free 1-on-1 guidance session.</p>
        </div>
        <router-link to="/contact-us" class="btn btn-accent">Book Free Guidance →</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.toolbar {
  margin-bottom: 34px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.search-input {
  max-width: 420px;
  padding: 13px 16px;
  border: 1.5px solid var(--border);
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-600);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cat-tab {
  border: 1.5px solid var(--border);
  background: #fff;
  color: var(--ink-2);
  font-weight: 700;
  font-size: 14px;
  padding: 9px 16px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.cat-tab:hover {
  border-color: var(--primary-600);
  color: var(--primary-600);
}

.cat-tab.active {
  background: var(--gradient);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 10px 24px rgba(29, 78, 216, 0.35);
}

.count {
  font-size: 11px;
  background: rgba(11, 22, 48, 0.08);
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 800;
}

.cat-tab.active .count {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.empty {
  text-align: center;
  color: var(--muted);
  padding: 40px 0;
  font-size: 1.05rem;
}

.cta-banner {
  background: var(--gradient);
  color: #fff;
  border-radius: var(--radius-lg);
  padding: 42px 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  flex-wrap: wrap;
  box-shadow: 0 24px 50px rgba(29, 78, 216, 0.35);
}

.cta-banner h2 {
  color: #fff;
  margin-bottom: 6px;
}

.cta-banner p {
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 1024px) {
  .course-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .course-grid {
    grid-template-columns: 1fr;
  }
  .cta-banner {
    padding: 30px 22px;
  }
}
</style>