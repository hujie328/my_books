import { createRouter, createWebHistory } from 'vue-router'
import qiankunBox from '../views/qiankunBox.vue'
const routes = [
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor/editor.vue')
  },
  {
    path: '/smallapp/:pathMatch(.*)',
    name: 'smallapp',
    component: qiankunBox
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
