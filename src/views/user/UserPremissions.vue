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

const treeColHeight = (num) => {
  return num / 100 * window.innerHeight - 106 + 'px'
}
const tableColHeight = (num) => {
  return num / 100 * window.innerHeight - 96 + 'px'
}
</script>

<template>
  <div style="height: 100%; width: 100%;">
    <a-row :gutter="[25, 0]">
      <a-col :span="4">
        <a-row>
          <a-col :span="24" class="title">
            <span>title</span>
          </a-col>
          <a-col :span="24" :style="{ height: treeColHeight(90),backgroundColor: 'rgb(255, 255, 255)', margin: '10px 0px 0px 0px', padding: '20px', borderRadius: '15px' }">
            <a-tree
                v-model:expandedKeys="expandedKeys"
                v-model:selectedKeys="selectedKeys"
                :load-data="onLoadData"
                :tree-data="treeData"
            />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="20" :style="{ height: tableColHeight(100), backgroundColor: 'rgb(255, 255, 255)', borderRadius: '15px', padding: '20px' }">
        <span>Table</span>
      </a-col>
    </a-row>
    <a-row>
    </a-row>
  </div>
</template>

<style scoped>
.title {
  background-color: rgb(255, 255, 255);
  height: 10vh;
  border-radius: 15px;
  padding: 20px;
}
</style>