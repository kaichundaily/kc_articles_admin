<script setup>
import { ref } from "vue";
import { getAllUser } from '@/api/user.js'
import { message } from "ant-design-vue";

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



const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['2', '5', '10', '20', '50',],
  onChange: (page, size) => {
    pagination.value.current = page
    pagination.value.pageSize = size
    getAllUserInfo(page, size)
  }
})
const data = ref([])
const loading = ref(false)
const getAllUserInfo = async (page, size) => {
  loading.value = true
  console.log(typeof page)
  let res = null
  try {
    res = await getAllUser(page, size)
  } catch (err) {
    message.error("查询失败")
    loading.value = false
    return
  }
  // const res = await getAllUser(page, size)
  data.value = res.data.data
  pagination.value.total = res.data.total
  loading.value = false
}
getAllUserInfo(1, 10)
</script>

<template>
  <div>
    <div>
      <a-button type="primary">添加用户</a-button>
    </div>
    <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="pagination"
    >
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