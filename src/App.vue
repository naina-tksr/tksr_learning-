<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import StickyCareerCTA from './components/StickyCareerCTA.vue'

const route = useRoute()

// Sticky Buy Now CTA: homepage only (never duplicated, never on other pages).
const isHome = computed(() => route.name === 'home')

const DEFAULT_TITLE =
  'TKSR Career | Industry-Relevant Skills, Real-World Projects & Career Opportunities'

watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/projects/')) {
      document.title = 'TKSR Career | Project Experience'
    } else if (path === '/projects') {
      document.title = 'TKSR Career | Real-World Projects'
    } else if (path === '/jobs') {
      document.title = 'TKSR Career | Career Opportunities'
    } else if (path === '/about-us') {
      document.title = 'TKSR Career | About Us'
    } else if (path === '/courses' || path.startsWith('/courses/')) {
      // Course detail pages set their own "TKSR Career | [Course Name]" title on mount.
      document.title = 'TKSR Career | Career-Focused Programs'
    } else {
      document.title = DEFAULT_TITLE
    }
  },
  { immediate: true },
)
</script>

<template>
  <SiteHeader />
  <main>
    <router-view />
  </main>
  <SiteFooter />
  <StickyCareerCTA v-if="isHome" />
</template>