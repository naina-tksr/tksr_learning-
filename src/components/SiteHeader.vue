<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { CATEGORIES, SITE } from '../data/site'

const route = useRoute()
const mobileOpen = ref(false)
const coursesOpen = ref(false)
const resourcesOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    coursesOpen.value = false
    resourcesOpen.value = false
  },
)

const resourceLinks = [
  { label: 'Blogs', to: '/courses' },
  { label: 'Course Info', to: '/courses' },
  { label: 'Become a Trainer', to: '/contact-us' },
  { label: 'Corporate Training', to: '/about-us' },
]
</script>

<template>
  <header class="site-header">
    <div class="topbar">
      <div class="container topbar-inner">
        <span class="topbar-item">📞 {{ SITE.phone }}</span>
        <span class="topbar-item">✉️ {{ SITE.email }}</span>
        <span class="topbar-links">
          <router-link to="/about-us">About Us</router-link>
          <router-link to="/contact-us">Need Help?</router-link>
        </span>
      </div>
    </div>

    <div class="nav-wrap">
      <div class="container nav-inner">
        <router-link to="/" class="brand">
          <span class="brand-mark">TK</span>
          <span class="brand-text">TKSR<em>Learning</em></span>
        </router-link>

        <nav class="nav-links" role="navigation">
          <div
            class="dropdown"
            @mouseenter="coursesOpen = true"
            @mouseleave="coursesOpen = false"
          >
            <button class="nav-link" @click="coursesOpen = !coursesOpen">
              All Courses <span class="caret">▾</span>
            </button>
            <transition name="pop">
              <div v-if="coursesOpen" class="dropdown-panel">
                <router-link
                  v-for="c in CATEGORIES"
                  :key="c"
                  :to="{ path: '/courses', query: { category: c } }"
                  class="dropdown-link"
                >
                  {{ c }}
                </router-link>
              </div>
            </transition>
          </div>

          <div
            class="dropdown"
            @mouseenter="resourcesOpen = true"
            @mouseleave="resourcesOpen = false"
          >
            <button class="nav-link" @click="resourcesOpen = !resourcesOpen">
              Resources <span class="caret">▾</span>
            </button>
            <transition name="pop">
              <div v-if="resourcesOpen" class="dropdown-panel">
                <router-link
                  v-for="r in resourceLinks"
                  :key="r.label"
                  :to="r.to"
                  class="dropdown-link"
                >
                  {{ r.label }}
                </router-link>
              </div>
            </transition>
          </div>

          <router-link to="/courses" class="nav-link">Courses</router-link>
          <router-link to="/contact-us" class="nav-link">Contact Us</router-link>
        </nav>

        <div class="nav-cta">
          <a class="btn btn-accent adviser-btn" :href="SITE.phoneHref">
            💬 Talk to Adviser
          </a>
          <router-link to="/sign-in" class="signin-link">Sign In</router-link>
          <button
            class="hamburger"
            :class="{ open: mobileOpen }"
            @click="mobileOpen = !mobileOpen"
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <transition name="slide">
        <div v-if="mobileOpen" class="mobile-panel">
          <router-link to="/courses" class="m-link">All Courses</router-link>
          <router-link
            v-for="c in CATEGORIES.slice(1)"
            :key="c"
            :to="{ path: '/courses', query: { category: c } }"
            class="m-link m-link--sub"
          >
            {{ c }}
          </router-link>
          <router-link to="/about-us" class="m-link">About Us</router-link>
          <router-link to="/contact-us" class="m-link">Contact Us</router-link>
          <router-link to="/sign-in" class="btn btn-primary m-cta">Sign In</router-link>
        </div>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
}

.topbar {
  background: var(--ink);
  color: #c7d2fe;
  font-size: 13px;
  font-weight: 500;
}

.topbar-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 36px;
}

.topbar-links {
  margin-left: auto;
  display: flex;
  gap: 16px;
}

.topbar-links a {
  transition: color 0.2s;
}

.topbar-links a:hover {
  color: #fff;
}

@media (max-width: 720px) {
  .topbar-item {
    display: none;
  }
  .topbar-inner {
    justify-content: flex-end;
  }
}

.nav-wrap {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 28px;
  min-height: 74px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-mark {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--gradient);
  color: #fff;
  font-weight: 900;
  font-size: 17px;
  display: grid;
  place-items: center;
  letter-spacing: -0.02em;
  box-shadow: 0 8px 20px rgba(29, 78, 216, 0.35);
}

.brand-text {
  font-weight: 900;
  font-size: 21px;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.brand-text em {
  font-style: normal;
  color: var(--primary-600);
  margin-left: 2px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
}

.nav-link {
  background: none;
  border: none;
  font-weight: 600;
  font-size: 15px;
  color: var(--ink-2);
  padding: 10px 14px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover {
  color: var(--primary-600);
  background: rgba(37, 99, 235, 0.07);
}

.nav-link.router-link-exact-active {
  color: var(--primary-600);
}

.caret {
  font-size: 11px;
  opacity: 0.7;
}

.dropdown {
  position: relative;
}

.dropdown-panel {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  min-width: 240px;
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  padding: 8px;
  z-index: 50;
}

.dropdown-link {
  display: block;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink-2);
  transition: background 0.15s, color 0.15s;
}

.dropdown-link:hover {
  background: var(--bg-soft);
  color: var(--primary-600);
}

.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.nav-cta {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
}

.adviser-btn {
  padding: 11px 18px;
  font-size: 14px;
}

.signin-link {
  font-weight: 700;
  font-size: 15px;
  color: var(--ink);
  padding: 10px 4px;
  border-bottom: 2px solid transparent;
}

.signin-link:hover {
  color: var(--primary-600);
  border-bottom-color: var(--primary-600);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px;
}

.hamburger span {
  width: 24px;
  height: 3px;
  border-radius: 3px;
  background: var(--ink);
  transition: transform 0.25s, opacity 0.25s;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.mobile-panel {
  display: none;
  padding: 12px 24px 20px;
  background: #fff;
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.m-link {
  display: block;
  padding: 11px 4px;
  font-weight: 600;
  color: var(--ink-2);
  border-bottom: 1px solid var(--bg-soft);
}

.m-link--sub {
  padding-left: 20px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 500;
}

.m-cta {
  margin-top: 14px;
  width: 100%;
}

@media (max-width: 980px) {
  .nav-links {
    display: none;
  }

  .signin-link {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .mobile-panel {
    display: block;
  }

  .adviser-btn {
    font-size: 0;
    gap: 0;
    width: 44px;
    padding: 10px;
  }

  .adviser-btn::before {
    content: '📞';
    font-size: 18px;
  }

  .brand-text {
    font-size: 18px;
  }
}
</style>