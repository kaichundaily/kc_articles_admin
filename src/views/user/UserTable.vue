<script setup>
import {onMounted, ref} from "vue";
import { getAllUserInfos } from '@/api/user.js'
const columns = ref([
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID'
  },
  {
    title: '用户名',
    dataIndex: '用户名',
    key: 'username'
  },
  {
    title: '头像',
    dataIndex: '头像',
    key: 'avatar'
  },
  {
    title: '编辑',
    dataIndex: '编辑',
    key: 'edit',
    scopedSlots: { customRender: 'action' }  // 绑定插槽
  }
])

// const data = ref([
//   {
//     ID: '1',
//     username: 'user001',
//     avatar: 'https://oss.kaichun.cloudns.be/kc-article-sys/2024/0809112445.jpg'
//   }
// ])
const data = ref([])
const loading = ref(false)
const getAllUserInfo = async () => {
  loading.value = true
  const res = await getAllUserInfos()
  data.value = res.data.data
  loading.value = false
}

onMounted(() => {
  getAllUserInfo()
})
</script>

<template>
  <div>
    <div>
      <a-button>添加用户</a-button>
    </div>
    <a-table :columns="columns" :data-source="data" :loading="loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'ID'">
          {{ record.ID }}
        </template>
        <template v-else-if="column.key === 'username'">
          {{ record.username }}
        </template>
        <template v-else-if="column.key === 'avatar'">
          <a-avatar v-if="record.avatar" shape="square" :src="record.avatar" />
          <a-avatar v-else shape="square">无</a-avatar>
        </template>
        <template v-else-if="column.key === 'edit'">
          <a-button>编辑</a-button>
          <a-button>删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>

</style>