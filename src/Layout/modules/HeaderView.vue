<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/index.js";
import { ref } from "vue";
import { revisePasswordRules } from "@/utils/rules.js";
import { message } from "ant-design-vue";
import { updatePassword } from "@/api/user.js";

const router = useRouter()
const useStore = useUserStore()

// 侧边栏伸缩icon相关
const props = defineProps({
  collapsed: Boolean
})
const emit = defineEmits(["change-collapsed"])
const changeCollapsed = () => {
  emit('change-collapsed')
  // console.log(props.collapsed)
}

const logout = async () => {
  await useStore.removeToken()
  await router.push('/login')
}
//提示框相关
const isShow = ref(false)

const showModel = () => {
  isShow.value = true
}

const handleOk = () => {
  logout()
  isShow.value = false
}

// 修改密码

const reviseShow = ref(false)
const formRules = revisePasswordRules()
const revRef = ref()
const formData = ref({
  oldPassword: "",
  newPassword: "",
  verifyPassword: ""
})


// 提交修改

const submitRevise = async () => {
  revRef.value.validate()
  // console.log("模拟提交")
  if (formData.value.newPassword === formData.value.oldPassword) {
    message.warning("新旧密码不能一样")
    return
  }
  if (formData.value.newPassword !== formData.value.verifyPassword) {
    message.warning("两次输入的新密码请保持一致")
    return
  }
  await updatePassword(useStore.userInfo.id, formData.value.newPassword).then((result) => {
    if (result.code === 200) {
      logout()
      message.success("修改密码成功请重新登录")
    } else {
      message.error("密码修改失败")
    }
  }).catch(() => {
    message.error("该操作失败,请稍后操作")
  }).finally(() => {
    reviseShow.value = false
    formData.value = {
      oldPassword: "",
      newPassword: "",
      verifyPassword: ""
    }
  })
}

const closeSubmit = () => {
  reviseShow.value = false
  formData.value = {
    oldPassword: "",
    newPassword: "",
    verifyPassword: ""
  }
}
</script>

<template>
  <div class="header">
    <!--侧边栏icon和面包屑相关-->
    <div class="header-icon-breadcrumb">
      <!--侧边栏伸缩icon-->
      <div class="header-icon">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="changeCollapsed" />
        <menu-fold-outlined v-else class="trigger" @click="changeCollapsed" />
      </div>
    </div>
    <!--header中间消息-->
    <div class="header-message">
      淳淳子的后台
    </div>
    <!--header用户相关-->
    <div class="header-user">
      <div>
        <a-menu mode="horizontal" :arrow="false" :selectedKeys="['']">
          <a-sub-menu>
            <template #title>
              <!--可根据回传数据是否有头像数据来进行显示-->
              <a-avatar v-if="useStore.userInfo.avatar" shape="square" :src="useStore.userInfo.avatar" />
              <a-avatar v-else shape="square">U</a-avatar>
            </template>
            <a-menu-item key="1" @click="reviseShow = true">
              <FormOutlined />
              修改密码
            </a-menu-item>
            <a-menu-item key="2" @click="showModel">
              <LogoutOutlined />
              退出登录
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
<!--      退出确认框-->
      <a-modal
          :open="isShow"
          title="确认要退出吗？"
          cancel-text="取消"
          ok-text="确认"
          @cancel="isShow = false"
          @ok="handleOk"
      >
        <p>不再考虑一下？</p>
      </a-modal>
<!--      修改密码框-->
      <a-modal
        :open="reviseShow"
        title="修改密码"
        cancel-text="取消"
        ok-text="确认"
        @cancel="closeSubmit"
        @ok="submitRevise"
      >
        <a-form
          :rules="formRules"
          :model="formData"
          ref="revRef"
        >
          <a-form-item name="oldPassword" :rules="formRules.oldPassword">
            <div>旧密码:</div>
            <a-input-password v-model:value="formData.oldPassword" placeholder="请输入旧密码">
              <template #prefix>
                <LockOutlined  class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="newPassword" :rules="formRules.newPassword">
            <div>新密码:</div>
            <a-input-password v-model:value="formData.newPassword" placeholder="请输入新密码">
              <template #prefix>
                <LockOutlined  class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item name="verifyPassword" :rules="formRules.verifyPassword">
            <div>新密码:</div>
            <a-input-password v-model:value="formData.verifyPassword" placeholder="请再次输入新密码">
              <template #prefix>
                <LockOutlined  class="site-form-item-icon"/>
              </template>
            </a-input-password>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 22px;
  margin: 0 20px;
  .header-icon-breadcrumb {
    display: flex;
    align-items: center;
  }
  .header-message {
    font-weight: bold;
  }
  .header-user {
    display: flex;
    align-items: center;
    .header-avatar {
      margin-right: 10px;
    }
  }
}
</style>
