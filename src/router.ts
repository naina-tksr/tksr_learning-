import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, top: 90, behavior: 'smooth' }
    }
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
    { path: '/courses', name: 'courses', component: () => import('./views/CoursesView.vue') },
    { path: '/about-us', name: 'about', component: () => import('./views/AboutView.vue') },
    { path: '/contact-us', name: 'contact', component: () => import('./views/ContactView.vue') },
    { path: '/sign-in', name: 'signin', component: () => import('./views/SignInView.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router