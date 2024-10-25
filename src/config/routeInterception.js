import router from "@/router/index.js";
import { useUserStore, useRouterStore, useMenuStore } from "@/stores/index.js";
// import { getRouters } from "@/api/router.js";
// import { convertToDynamicImport } from "@/utils/addRouter.js";
import { message } from "ant-design-vue";
import { convertToDynamicImport } from "@/utils/addRouter.js";

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const routerStore = useRouterStore()
  const menuStore = useMenuStore()
  if (userStore.token) {
    if (to.path === "/login") {
      message.warning("当前已登陆")
      next("/dashboard")
    } else {
      if (routerStore.isAddRouter) {
        next()
      } else {
        const menus =  menuStore.menuList
        const routes = convertToDynamicImport(menus)
        routes.forEach((route) => {
          router.addRoute('Layout', route)
        })
        routerStore.commitRouter(true)
        next({...to, replace: true})
      }
    }
  } else {
    if (to.path === "/login") {
      next()
    } else {
      message.warning("请先登陆")
      next("/login")
    }
  }
})