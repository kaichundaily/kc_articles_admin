<script setup>
 
</script>
<template>
  <a-layout-content
    :style="{ padding: '16px', background: '', minHeight: '280px' }"
  >
    <RouterView />
<!--    <RouterView v-slot="{ Component }">-->
<!--      <transition-->
<!--        name="fade"-->
<!--        mode="out-in"-->
<!--        enter-active-class="animate__animated animate__zoomIn"-->
<!--      >-->
<!--        <keep-alive>-->
<!--          <component :is="Component" />-->
<!--        </keep-alive>-->
<!--      </transition>-->
<!--    </RouterView>-->
  </a-layout-content>
</template>
<style scoped>
.animate__fadeIn {
  animation-duration: 1s;
}
</style>
