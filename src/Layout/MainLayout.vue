<script setup>
import { ref } from 'vue'
import SiderView from '@/Layout/modules/SiderView.vue';
import HeaderView from '@/Layout/modules/HeaderView.vue';
import ContentView from '@/Layout/modules/ContentView.vue';
// import {useUserStore} from "@/stores/index.js";
// import { getRouters } from "@/api/router.js";
// import { convertToDynamicImport } from "@/utils/addRouter.js";
// import { useRouter } from "vue-router";
// const router = useRouter();
const collapsed = ref(false);

const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
  // console.log(collapsed.value)
}
// const userStore = useUserStore();
//
// const getRouterList = async () => {
//     if (userStore.userInfo.id) {
//         const res = await getRouters(userStore.userInfo.id)
//            if (res.code === 200) {
//             const routes = convertToDynamicImport(res.data)
//             await routes.forEach((route) => {
//                 router.addRoute('Layout', route)
//             })
//         }
//     }
// }
// onBeforeUpdate(() => {
//   getRouterList()
// })
</script>

<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible class="a-layout-sider" theme="light" width="200">
      <sider-view />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding: 0; background: #fff">
        <header-view :collapsed='collapsed' @change-collapsed="changeCollapsed" />
      </a-layout-header>
      <content-view />
    </a-layout>
  </a-layout>
<!--  <div>草泥马的</div>-->
</template>

<style scoped lang='scss'>
.a-layout-sider {
  height: 100vh;
}
</style>
