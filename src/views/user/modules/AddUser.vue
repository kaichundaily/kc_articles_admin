<script setup>
import { ref, watch } from "vue";
import { addUserRules } from '@/utils/rules.js'
import { getManagerList, addUser } from "@/api/user.js";
import { useUserStore } from '@/stores/modules/user.js'
import { message } from "ant-design-vue";

const props = defineProps({
  showSubmit: Boolean,
})

const formRef = ref(null)

const userStore = useUserStore()
const userInfo = userStore.userInfo

const mark = ref("")
const level = ref("")
const username = ref("")
const password = ref("")
const confirmPassword = ref("")

const levelList = ref([])
const levels = ref([])
const formRules = addUserRules()
const markList = ref([])
const emit = defineEmits(["closeSubmit"])


watch(props,async (newValue,oldValue) => {
  switch (props.showSubmit) {
    case true:
      switch (userInfo.grade) {
        case 0:
          markList.value = ["管理员","普通账号"]
          await getManagerList(userInfo.grade).then((result) => {
            if (result.code === 200) {
              levelList.value = result.data
            } else {
              message.error(result.message)
            }
          }).catch((error) => {
            console.log(error)
          })
          break
        case 1:
          markList.value = ["普通账号"]
          break
      }
      break
  }
})

watch(mark,(newValue,oldValue) => {
  if (userInfo.grade === 0) {
    switch (mark.value) {
      case "管理员":
        levels.value = []
        level.value = userInfo.username
        break
      case "普通账号":
        level.value = ""
        levels.value = levelList.value
        break
    }
  } else {
    level.value = userInfo.username
  }
})


// 关闭创建
const closeSubmit = () => {
  mark.value = ""
  level.value = ""
  username.value = ""
  password.value = ""
  confirmPassword.value = ""
  levelList.value = []
  levels.value = []
  emit("closeSubmit")
}
// 提交创建用户
const submit = async () => {
  if (username.value === "") {
    message.error("请填写用户名")
    return
  }
  if (password.value === "") {
    message.error("请填写密码")
    return
  }
  if (password.value !== confirmPassword.value) {
    message.error("两次填写的密码不一致")
    return
  }
  if (mark.value === "") {
    message.error("请选择身份")
    return
  }
  if (level.value === "") {
    message.error("请选择上级")
    return
  }
  await addUser({
    "username": username.value,
    "password": password.value,
    "mark": mark.value,
    "grade": mark.value === "管理员" ? 1 : 2,
    "level": level.value,
    "status": 1
  }).then((result) => {
    result.code === 200 ? message.success(result.message) : message.error(result.message)
  }).catch((error) => {
    message.error(error)
  }).finally(() => {
    closeSubmit()
  })
}
</script>

<template>
  <a-modal
    title="新建用户"
    :width="400"
    :open="showSubmit"
    @close="closeSubmit"
    cancel-text="取消添加"
    ok-text="提交"
    @cancel="closeSubmit"
    @ok="submit"
  >
    <a-form
      :rules="formRules"
      ref="formRef"
    >
      <a-form-item name="mark" :rules="formRules.mark">
        <div>身份:</div>
        <a-select v-model:value="mark">
          <template #suffixIcon>
            <UserOutlined class="site-form-item-icon" />
          </template>
          <a-select-option v-for="(value, index) in markList" :value="value" :key="index">{{ value }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="level" :rules="formRules.level">
        <div>上级:</div>
        <a-select v-model:value="level">
          <template #suffixIcon>
            <UserOutlined class="site-form-item-icon" />
          </template>
          <a-select-option v-for="(value, index) in levels" :value="value" :key="index">{{ value }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="username" :rules="formRules.username">
        <div>账户:</div>
        <a-input v-model:value="username" placeholder="请输入账户">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" :rules="formRules.password">
        <div>密码:</div>
        <a-input-password v-model:value="password" placeholder="请输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="confirmPassword" :rules="formRules.confirmPassword">
        <div>验证:</div>
        <a-input-password v-model:value="confirmPassword" placeholder="请再次输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.avatar-uploader {
  width: 104px;
  height: 104px;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
}

.uploaded-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持图片的比例并适应容器 */
}
</style>