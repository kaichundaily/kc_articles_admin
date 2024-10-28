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
  return `calc(90vh -84px)`
}
</script>

<template>
  <a-row>
    <a-col :span="4" class="title"></a-col>
  </a-row>
  <a-row>
    <!--  TODO  -->
    <a-col :span="4" :style="{height: treeColHeight}"></a-col>
  </a-row>
</template>

<style scoped>
.title {
  background-color: #b57aba;
  height: 10vh;
}
</style>