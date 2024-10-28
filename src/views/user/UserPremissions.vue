<script setup>
import {ref} from "vue";

const expandedKeys = ref([])
const selectedKeys = ref([])

const treeData = ref([
  {
    title: "admin",
    key: 0,
    children: [
      {
        title: "admin1",
        key: 1,
        isLeaf: true,
      }
    ]
  }
])

const onLoadData = async (treeNode) => {
  return
}

const treeColHeight = () => {
  return 90 / 100 * window.innerHeight - 96 + 'px'
}
</script>

<template>
  <div style="height: 100%; width: 100%; background-color: #2b88d1">
    <a-row>
      <a-col :span="4" class="title"></a-col>
    </a-row>
    <a-row>
      <!--  TODO 等待实现动态监听  -->
      <a-col :span="4" :style="{ height: treeColHeight(),backgroundColor: 'red' }"></a-col>
    </a-row>
  </div>
</template>

<style scoped>
.title {
  background-color: #b57aba;
  height: 10vh;
}
</style>