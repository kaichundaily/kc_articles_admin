<script setup>
import Logo from "@/assets/logo.jpg"
import { h, ref } from "vue";
import { useRouter, useRoute } from "vue-router"; // 引入 useRouter
import { routeSort, processRouteList } from "@/Layout/js/utils.js";

const router = useRouter(); // 获取 router 实例

// 菜单列表初始化
const items = ref([])
const routerList = ref({})
// 图标列表
// 获取当前的路由菜单
// const routers = router.options.routes
const getRouterList = () => {
  routerList.value = processRouteList(routeSort(router.getRoutes()))
}
// 路由转菜单
const  routeToMenus = (routes) => {
  let rouList = []
  routes.forEach(rou => {
    const menuItem = {
      key: rou.meta.key,
      label: rou.meta.title,
      route: rou.path,
      icon: rou.meta.icon,
      children: []
    }
    if (rou.children && rou.children.length > 0) {
      rou.children.forEach(child => {
        menuItem.children.push({
          key: child.meta.key,
          label: child.meta.title,
          route: child.path,
        })
      })
    } else {
      delete menuItem.children
    }
    rouList.push(menuItem)
  })
  return rouList
}
getRouterList()
items.value = routeToMenus(routerList.value)
// 获得菜单列表
const handleMenuClick = async (info) => {
  selectedKeys.value = [info.key]
  await router.push(info.domEvent.target.__vueParentComponent.attrs.route)
};


// openKeys: 需备展开的一级菜单key
// selectedKeys  需被聚焦的菜单key(不分一二级菜单)
const selectedKeys = ref([''])
const openKeys = ref([''])


</script>

<template>
  <!--logo-->
  <div class="logo">
    <router-link to="/dashboard">
      <a-avatar shape="square" :src='Logo' :size="40" />
    </router-link>
  </div>
  <!--菜单-->
  <!--  <a-menu :items="items"  theme="light" mode="inline" @click="handleMenuClick" />-->
  <a-menu :items="items" :openKeys="openKeys" :selectedKeys="selectedKeys" theme="light" mode="inline" @click="handleMenuClick" />
</template>

<style lang="scss" scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
