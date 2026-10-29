<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Expert } from '../data/experts'
import { getExperts } from '../services/experts'
import ExpertCard from './ExpertCard.vue'

const experts = ref<Expert[]>([])
const loading = ref(true)
const loadError = ref(false)

onMounted(async () => {
  try {
    experts.value = await getExperts()
  } catch {
    loadError.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Phase 9: compact white "Industry Experts" band — soft preview above,
       soft live-projects below. Copy kept verbatim from the approved source. -->
  <section id="experts" class="section experts-section" aria-labelledby="experts-heading">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">Industry Experts</span>
        <h2 id="experts-heading">Learn From Professionals Who Understand the Industry</h2>
        <p class="experts-lead">
          Move beyond theory. TKSR career content is guided by practitioners focused on
          real-world problem solving, practical implementation and project guidance.
        </p>
      </div>

      <p v-if="loading" class="expert-feedback">Loading experts…</p>
      <p v-else-if="loadError" class="expert-feedback">Unable to load experts right now.</p>
      <p v-else-if="experts.length === 0" class="expert-feedback">
        No sample expert profiles are available yet.
      </p>
      <div v-else class="expert-grid">
        <ExpertCard v-for="e in experts" :key="e.id" :expert="e" />
      </div>

      <p class="demo-footnote">All expert profiles on this page are sample/demo content for demonstration.</p>

      <div class="center-cta">
        <router-link to="/contact-us" class="btn btn-outline">Talk to a Career Expert</router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* White band between the soft opportunities preview (above) and the soft
   projects section (below) — rhythm: soft → white → soft. */
.experts-section {
  background: var(--bg);
  padding: 44px 0 48px;
}

.experts-section .section-head {
  margin-bottom: 28px;
}

/* Lavender pill eyebrow — same family as the phase 4–9 section pills. */
.experts-section .eyebrow {
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
.experts-section h2 {
  margin: 0;
  font-size: clamp(1.45rem, 2.6vw, 2.05rem);
  line-height: 1.15;
  color: var(--ink);
}

.experts-lead {
  margin: 8px auto 0;
  max-width: 720px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--muted);
  text-align: center;
}

.expert-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.expert-feedback {
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
  .expert-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .experts-section {
    padding: 36px 0 42px;
  }
}

@media (max-width: 640px) {
  .experts-section {
    padding: 32px 0 38px;
  }

  .expert-grid {
    grid-template-columns: 1fr;
  }
}
</style>