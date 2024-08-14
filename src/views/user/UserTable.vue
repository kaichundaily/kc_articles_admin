<script setup>
import {onMounted, ref} from "vue";
import { getAllUserInfos } from '@/api/user.js'
const columns = ref([
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
    align: 'center'
  },
  {
    title: '用户名',
    dataIndex: '用户名',
    key: 'username',
    align: 'center'
  },
  {
    title: '头像',
    dataIndex: '头像',
    key: 'avatar',
    align: 'center'
  },
  {
    title: '编辑',
    dataIndex: '编辑',
    key: 'edit',
    align: 'center',
    scopedSlots: { customRender: 'action' }  // 绑定插槽
  }
])

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
      <a-button type="primary">添加用户</a-button>
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
          <a-button type="text" style="color: dodgerblue">编辑</a-button>
          <a-button type="text" style="color: dodgerblue">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped>

</style>