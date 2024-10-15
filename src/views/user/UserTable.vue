<script setup>
import { ref } from "vue";
import { getUsers, deleUser,closeUser } from '@/api/user.js'
import { DeleImg } from "@/api/file.js";
import { message } from "ant-design-vue";
import { userTableColumns } from "@/utils/columns.js";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons-vue";
import AddUser from "@/views/user/modules/AddUser.vue";


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
  await getUsers(page, size).then((result) => {
    console.log(result)
    data.value = result.data.values
    pagination.value.total = result.data.total
  }).catch((error) => {
    message.error(`查询失败:${error}`)
  }).finally(() => {
    loading.value = false
  })
}

// 添加用户相关逻辑
// 调用抽屉的模式
const showSubmit = ref(false)
// 关闭抽屉
const closeSubmit = () => {
  showSubmit.value = false
}

// 数据初始化
getAllUserInfo(1, 10)

// 关闭账户
const CloseUser = async (record) => {
  loading.value = true
  if (record.username === "admin") {
    message.warning("admin账户禁止关闭")
    loading.value = false
    return
  }
  const result = await closeUser(record.id,record.status === 1 ? 0 : 1)
  if (result.code !== 200) {
    message.error("修改失败")
    return
  }
  getAllUserInfo(pagination.value.current, 10)
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
        <template v-if="column.key === 'username'">
          {{ record.username }}
        </template>
        <template v-if="column.key === 'password'">
<!--          <a-input-->
<!--            v-if="true"-->
<!--            v-model:value="a"-->
<!--            type="text"-->
<!--            size="small"-->
<!--            :style="{ width: '78px' }"-->
<!--            @blur=""-->
<!--            @keyup.enter=""-->
<!--            placeholder="New passwd"-->
<!--          />-->
          <a-tag style="background: #fff; border-style: dashed" @click="">
            <PlusOutlined />
            New Passwd
          </a-tag>
        </template>
        <template v-else-if="column.key === 'avatar'">
          <a-avatar v-if="record.avatar" shape="square" :src="record.avatar" />
          <a-avatar v-else shape="square">无</a-avatar>
        </template>
        <template v-else-if="column.key === 'mark'">
          {{ record.mark }}
        </template>
        <template v-else-if="column.key === 'grade'">
          {{ record.grade }}
        </template>
        <template v-else-if="column.key === 'level'">
          {{ record.level }}
        </template>
        <template v-else-if="column.key === 'status'">
          <a-switch @click="CloseUser(record)" :checked="record.status === 1">
            <template #checkedChildren><check-outlined/></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
        </template>
      </template>
    </a-table>
<!--    添加用户抽屉-->
    <add-user
      :showSubmit="showSubmit"
      @closeSubmit="closeSubmit"
    />
<!--    添加用户-->
    <a-float-button
        type="primary"
        class="custom-float-button"
        @click="showSubmit = true"
    >
      <template #icon>
        <EditOutlined class="custom-float-button-icon"/>
      </template>
    </a-float-button>
  </div>

<!--  删除用户确认框 -->
<!--  <a-modal-->
<!--    :open="delShow"-->
<!--    title="确认要删除吗"-->
<!--    cancel-text="取消"-->
<!--    ok-text="确认"-->
<!--    @cancel="cloesDelUser"-->
<!--    @ok="deleUserInfo"-->
<!--  >-->
<!--    <p>不再考虑一下？</p>-->
<!--  </a-modal>-->
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