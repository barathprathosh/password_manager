import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/password/:name',
    component: () => import('@/pages/PasswordDetails.vue'),
    props:true,
  },
]

let router = createRouter({
  history: createWebHistory('/password_manager'),
  routes,
})

export default router
