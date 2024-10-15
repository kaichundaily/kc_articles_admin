<script setup>
import { ref } from "vue";
import { getUsers, deleUser,closeUser } from '@/api/user.js'
import { DeleImg } from "@/api/file.js";
import { message } from "ant-design-vue";
import { userTableColumns } from "@/utils/columns.js";
import { EditOutlined,CheckOutlined,CloseOutlined } from "@ant-design/icons-vue";
import EditUser from "@/views/user/modules/AddUser.vue";


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
const showDrawer = ref(false)
// 设置在打开抽屉时的模式,编辑模式,添加模式
const mode = ref("")
const olduserinfo = ref({})
const openDrawer = (value,record) => {
  mode.value = value
  // console.log(typeof record)
  if (mode.value === "edit") {
    olduserinfo.value = record
  }
  showDrawer.value = true
}

// 添加用户后再次调用获取用户列表
const changeSubmit = async () => {
  showDrawer.value = false
  await getAllUserInfo(1, 10)
}
// 取消添加用户
const closeSubmit = () => {
  olduserinfo.value = {
    avatar: '',
    username: '',
    ID: '',
  }
  mode.value = ''
  showDrawer.value = false
}

// 2. 删除时弹出确认框
const delShow = ref(false)
const delID = ref("")
const delArticleUrl = ref("")
const delUser = (id,articleUrl) => {
  delID.value = id
  delArticleUrl.value = articleUrl
  delShow.value = true
}
const cloesDelUser = () => {
  delID.value = ""
  delShow.value = false
}

const deleUserInfo = async () => {
  delShow.value = false
  loading.value = true
  if (delArticleUrl.value !== null) {
    await DeleImg(delArticleUrl.value).then((result) => {
      console.log(result)
    }).catch((err) => {
      message.error("删除图片失败")
    }).finally(() => {
      delArticleUrl.value = ""
      loading.value = false
    })
  }
  await deleUser(delID.value).then((reslut) => {
    if (reslut.code === 200) {
      message.success(reslut.message)
    } else {
      message.error(reslut.message)
    }
  }).catch((err) => {
    message.error(`删除失败: ${err}`)
  }).finally(() => {
    delShow.value = false
    delID.value = ""
    getAllUserInfo(pagination.value.current, 10)
  })
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
  const result = await closeUser(record.ID,record.status === 1 ? 0 : 1)
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
          <a-switch @click="CloseUser(record)" :checked="record.status === 1">
            <template #checkedChildren><check-outlined/></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
        </template>
        <template v-else-if="column.key === 'edit'">
          <a-button type="text" style="color: dodgerblue" @click="openDrawer('edit',record)">编辑</a-button>
          <a-button v-if="record.username !== 'admin'" type="text" style="color: dodgerblue" @click="delUser(record.ID, record.avatar)">删除</a-button>
        </template>
      </template>
    </a-table>

    <edit-user
        :showDrawer="showDrawer"
        :mode="mode"
        :record="olduserinfo"
        @changeShowDrawer="changeSubmit"
        @closeSubmit="closeSubmit"
    />
    <!--  右下角按钮  -->
    <a-float-button
        type="primary"
        class="custom-float-button"
        @click="openDrawer('add',{
          avatar: '',
          username: '',
          ID: '',
        })"
    >
      <template #icon>
        <EditOutlined class="custom-float-button-icon"/>
      </template>
    </a-float-button>
  </div>

<!--  删除用户确认框 -->
  <a-modal
    :open="delShow"
    title="确认要删除吗"
    cancel-text="取消"
    ok-text="确认"
    @cancel="cloesDelUser"
    @ok="deleUserInfo"
  >
    <p>不再考虑一下？</p>
  </a-modal>
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