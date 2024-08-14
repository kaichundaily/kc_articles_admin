<script setup>
import {
  UserOutlined,
  HomeOutlined
} from "@ant-design/icons-vue";
import Logo from "@/assets/logo.jpg"
import { h, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router"; // 引入 useRouter
const router = useRouter(); // 获取 router 实例
const route = useRoute();

// 菜单列表初始化
const items = ref([])

// 图标列表
const iconMap = ref({
  HomeOutlined,
  UserOutlined
})
// 获取当前的路由菜单
const routers = router.options.routes
// 图标的字符转化
const getIconComponent = (iconName) => {
  return iconName ? h(iconMap.value[iconName]) : null
}
// 路由转菜单
const  processRouters = (routers) => {
  return routers.map(rou => {
    if (rou.path === '/') {
      return rou.children.map(child => {
        const menuItem = {
          label: child.meta.title,
          key: child.meta.key,
          icon: getIconComponent(child.meta.icon),
          route: child.path
        }

        if (child.children) {
          menuItem.children = child.children.map(subChild => ({
            label: subChild.meta.title,
            key: subChild.meta.key,
            route: subChild.path
          }))
          delete menuItem.route
        }
        return menuItem
      })
    }
    return null
  }).filter(Boolean).flat()
}
// 获得菜单列表
items.value = processRouters(routers)

// 根据 key 查找菜单项
const findMenuItemByKey = (key, items) => {
  for (const item of items) {
    if (item.key === key) {
      return item;
    }
    if (item.children) {
      const found = findMenuItemByKey(key, item.children);
      if (found) {
        return found;
      }
    }
  }
  return null;
};
// 获取当前菜单的key,并匹配items里的路由并跳转
const handleMenuClick = (info) => {
  const selectedItem = findMenuItemByKey(info.key, items.value);
  // console.log(selectedItem)
  if (selectedItem && selectedItem.route) {
    router.push(selectedItem.route);
  }
};


// openKeys: 需备展开的一级菜单key
// selectedKeys  需被聚焦的菜单key(不分一二级菜单)
const selectedKeys = ref([''])
const openKeys = ref([''])


// 监听路由变化实现自动聚焦菜单按钮的功能
watch(() => route.path, (newPath) => {
  openKeys.value = [findMenuItemByPath(newPath, items.value).oneKey]
  selectedKeys.value = [findMenuItemByPath(newPath, items.value).twoKey]
})

// 获取当前路由一级菜单或者二级菜单的key,若只有一级菜单则给openKeys设置为0
const findMenuItemByPath = (path, items) => {
  for (const item of items) {
    if (item.route === path) {
      return {
        oneKey: 0,
        twoKey: item.key
      }
    }
    if (item.children) {
      const found = findMenuItemByPath(path, item.children);
      if (found) {
        return {
          oneKey: item.key,
          twoKey: found.twoKey
        }
      }
    }
  }
}
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
