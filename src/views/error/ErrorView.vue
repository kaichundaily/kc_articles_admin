<script setup>
import { useRouter } from "vue-router";

const router = useRouter()

const backHome = async () => {
  await router.push("/")
}
</script>

<template>
  <div class="error">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <a-button type="primary" @click="backHome">返回主页</a-button>
      </template>
    </a-result>
  </div>
</template>

<style scoped>
.error {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -150px;
  font-size: 200px;
}

</style>
