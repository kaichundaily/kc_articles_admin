<script setup>
import { ref } from "vue";
import { getAllUser } from '@/api/user.js'
import { message } from "ant-design-vue";
import { userTableColumns } from "@/utils/columns.js";
import { EditOutlined } from "@ant-design/icons-vue";
import EditUser from "@/views/user/modules/EditUser.vue";


// table`s header
const columns = userTableColumns()


 // 表格数据 和 分页功能
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
getAllUserInfo(1, 10)  // 初始化数据, 默认一页10条

// 添加用户相关逻辑
const showDrawer = ref(false)
const changeSubmit = () => {
  showDrawer.value = false
  getAllUserInfo()
}
const closeSubmit = () => {
  showDrawer.value = false
}
</script>

<template>
  <div>
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
        <template v-else-if="column.key === 'status'">
<!--          TODO-->
        </template>
        <template v-else-if="column.key === 'edit'">
          <a-button type="text" style="color: dodgerblue">编辑</a-button>
          <a-button type="text" style="color: dodgerblue">删除</a-button>
        </template>
      </template>
    </a-table>
    <!--  添加用户抽屉  -->
    <edit-user
        :showDrawer="showDrawer"
        @changeShowDrawer="changeSubmit"
        @closeSubmit="closeSubmit"
    />
    <!--  右下角按钮  -->
    <a-float-button
        type="primary"
        class="custom-float-button"
        @click="showDrawer = true"
    >
      <template #icon>
        <EditOutlined class="custom-float-button-icon"/>
      </template>
    </a-float-button>
  </div>
</template>

<style scoped>
.custom-float-button {
  width: 55px;
  height: 55px;
  .custom-float-button-icon{
    font-size: 20px;
  }
}
</style>