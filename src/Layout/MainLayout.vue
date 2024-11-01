<script setup>
import { ref } from 'vue'
import SiderView from '@/Layout/modules/SiderView.vue';
import HeaderView from '@/Layout/modules/HeaderView.vue';
import ContentView from '@/Layout/modules/ContentView.vue';
import { tokenIsOk } from "@/api/user.js";
import { useUserStore } from "@/stores/index.js";
import { useRouter } from "vue-router";
import {message} from "ant-design-vue";

const collapsed = ref(false);
const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
}

const userStore = useUserStore()
const router = useRouter()
const okToken = async () => {
  await tokenIsOk().then((result) => {
    if (result.code === 200) {
      return
    }
  }).catch((err) => {
    userStore.removeToken()
    userStore.removeUserInfo()
    message.warning("令牌失效")
    router.push("/login")
  })
}

okToken()
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
</template>

<style scoped lang='scss'>
.a-layout-sider {
  height: 100vh;
}
</style>
