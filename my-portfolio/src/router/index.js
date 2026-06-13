import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('../views/PortfolioView.vue'),
    },
    {
      path: '/sanction',
      name: 'sanction',
      component: () => import('../views/SanctionView.vue'),
    },
    {
      path: '/sea-of-thieves-guide',
      name: 'sea-of-thieves-guide',
      component: () => import('../views/SeaOfThievesView.vue'),
    },
  ],
})

export default router
