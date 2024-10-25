import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Login from '@/views/login/LoginView.vue'
import Layout from '@/Layout/MainLayout.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    component: Layout,
    meta: {
      title: '系统'
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: {
            title: 'Home',
            key: '1',
            icon: 'HomeOutlined'
        }
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/:pathMatch(.*)*',
    component:() => import('@/views/error/ErrorView.vue'),
  },
]

const router = createRouter({
  history: import.meta.env.BASE_URL === 'development' ? createWebHashHistory() : createWebHistory(),
  routes
})

export default router
