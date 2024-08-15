<script setup>
import { ref } from "vue";
import { getAllUser } from '@/api/user.js'
import { message } from "ant-design-vue";


// table`s header
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
const drawerSubmit = () => {
  console.log("已提交")
  showDrawer.value = false
}
</script>

<template>
  <div>
    <div>
      <a-button type="primary" @click="showDrawer = true">添加用户</a-button>
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

    <a-drawer :width="500" title="添加用户" placement="right" :open="showDrawer" @close="showDrawer = false">
      <template #extra>
        <a-button style="margin-right: 8px" @click="showDrawer = false">取消</a-button>
        <a-button type="primary" @click="drawerSubmit">提交</a-button>
      </template>
      <a-form>
        <a-form-item>
          <div>头像:</div>
          <a-upload
              v-model:file-list="fileList"
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :before-upload="beforeUpload"
              @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item>
          <div>账户:</div>
          <a-input placeholder="请输入账户">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <div>密码:</div>
          <a-input-password placeholder="请输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <div>密码验证:</div>
          <a-input-password placeholder="请再次输入密码">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<style scoped>

</style>