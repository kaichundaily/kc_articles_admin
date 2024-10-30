<script setup>
import { ref } from "vue";
import { getUsers, closeUser } from '@/api/user.js'
import { message } from "ant-design-vue";
import { userTableColumns } from "@/utils/columns.js";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons-vue";
import AddUser from "@/views/user/modules/AddUser.vue";
import { updatePassword } from "@/api/user.js";
import { revisePasswordRules } from "@/utils/rules.js"


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
  getAllUserInfo(pagination.value.current, 10)
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

// 修改密码
const uid = ref("")
const formData = ref({
  newPassword: "",
  refPassword: ""
})
const isShow = ref(false)

const oldPasswd = ref("")

const rules = revisePasswordRules()
const reRef = ref()
const openShow = (id, passwd) => {
  isShow.value = true
  uid.value = id
  oldPasswd.value = passwd
}

const closeShow = () => {
  isShow.value = false
  formData.value = {
    newPassword: "",
    refPassword: ""
  }
  uid.value = ""
  oldPasswd.value = ""
}

const submitNewPasswd = async () => {
  reRef.value.validate()
  if (formData.value.newPassword !== formData.value.refPassword) {
    message.error("两次输入密码不一致")
    closeShow()
    return
  }
  if (formData.value.newPassword === oldPasswd.value) {
    message.error("新旧密码一致")
    closeShow()
    return
  }
  await updatePassword(uid.value, formData.value.newPassword).then((result) => {
    if (result.code === 200) {
      message.success(result.message)
    } else {
      message.error(result.message)
    }
  }).catch((error) => {
    message.error(error.toString())
  }).finally(() => {
    closeShow()
  })
}
</script>

<template>
  <div>
    <a-table
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="pagination"
        :bordered="true"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'username'">
          {{ record.username }}
        </template>
        <template v-if="column.key === 'password'">
          <a-button type="primary" @click="openShow(record.id, record)">
            修改密码
          </a-button>
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
  <a-modal
    :open="isShow"
    title="修改密码"
    cancel-text="取消"
    ok-text="提交"
    @cancel="closeShow"
    @ok="submitNewPasswd"
  >
    <a-form
      ref="reRef"
      :rules="rules"
      :model="formData"
    >
      <a-form-item name="newPassword" :rules="rules.newPassword">
        <a-input-password v-model:value="formData.newPassword" placeholder="请输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="verifyPassword" :rules="rules.verifyPassword">
        <a-input-password v-model:value="formData.refPassword" placeholder="请再次输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
    </a-form>
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