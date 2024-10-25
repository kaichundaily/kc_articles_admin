<script setup>
import { ref } from 'vue'
import SiderView from '@/Layout/modules/SiderView.vue';
import HeaderView from '@/Layout/modules/HeaderView.vue';
import ContentView from '@/Layout/modules/ContentView.vue';
const collapsed = ref(false);

const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
}
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
