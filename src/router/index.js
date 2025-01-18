import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/home',
        redirect: '/home/code'
      },
      {
        path: '/home/code',
        name: 'code',
        component: () => import('@/views/home/code/index.vue')
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/editor/editor.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/home/map/index.vue')
  },
  {
    path: '/recursion',
    name: 'recursion',
    component: () => import('@/views/recursion/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
