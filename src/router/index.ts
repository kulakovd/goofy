import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list/:id',
      name: 'list',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import('../views/ProjectView.vue')
    }
  ]
})

export default router
