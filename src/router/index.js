import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Login from '@/views/login/LoginView.vue'
import Error from '@/views/error/ErrorView.vue'

const routes = [
  {
    path: '/',
    // name: 'home',
    redirect: '/dashboard',
    component: () => import( '@/Layout/MainLayout.vue'),
    meta: {
      title: '系统'
    },
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: {
          title: 'Home',
          key: '1',
          icon: 'HomeOutlined'
        }
      },
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/:pathMatch(.*)*',
    component: Error
  },
]

const router = createRouter({
  history: import.meta.env.BASE_URL === 'development' ? createWebHashHistory() : createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const useStore = useUserStore()
//   const token = useStore.token
//   // 拦截未匹配到的路由
//   // if (to.matched.length === 0) {
//   //   message.error("没有找到该页面")
//   //   return next('/404') // 没有匹配到页面直接404
//   // }
//   // 拦截token失效后的路由
//   if (!token && to.path !== '/login') {
//     return next('/login')
//   }

//   // 拦截token有效切强闯login页面的路由
//   if (token && to.path === '/login') {
//     message.warning('已登录')
//     return next('/')
//   }
//   next() // 如果不满足以上条件直接放行
// })

export default router
