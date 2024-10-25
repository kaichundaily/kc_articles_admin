import router from "@/router/index.js";
import { useUserStore, useRouterStore } from "@/stores/index.js";
// import { getRouters } from "@/api/router.js";
// import { convertToDynamicImport } from "@/utils/addRouter.js";
import { message } from "ant-design-vue";
import { getRouters } from "@/api/router.js";
import { convertToDynamicImport } from "@/utils/addRouter.js";

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const routerStore = useRouterStore()
  console.log(!userStore.token)
  if (!userStore.token && to.path !== '/login') {
    console.log("被触发1")
    message.warning('请先登录')
    return next('/login')
  } else {
    console.log("被触发2")
    if (routerStore.isAddRouter) {
      return next({ ...to, replace: true })
    } else {
      if (!routerStore.isAddRouter) {
      const res = getRouters(userStore.userInfo.id)
      const routes = convertToDynamicImport(res.data)
      routes.forEach((route) => {
        router.addRoute('Layout', route)
      })
      }
      routerStore.commitRouter(true)
      return next({ ...to, replace: true })
    }
  }
})