<script setup>
import { loginFormRules } from '@/utils/rules.js';
import { ref } from "vue";
import { useUserStore } from "@/stores/index.js";
import { useRouter } from "vue-router";
import { userLoginService } from '@/api/user.js';
import { message } from "ant-design-vue";
const rules = loginFormRules()

const formModel = ref({
  username: '',
  password: ''
})
const form = ref()

const userStore = useUserStore()
const router = useRouter()

const  login = async () => {
  console.log("被点击")
  // console.log(formModel.value.username)
  await form.value.validate()
  console.log(formModel.value.username)
  try {
    const res = await userLoginService(formModel.value)
    userStore.setToken(res.data.token)
    userStore.setUserInfo({
      id: res.data.id,
      username: res.data.username,
      avatar: res.data.avatar,
    })
    message.success('登录成功')

    router.push("/")
  } catch (error) {
    message.error('登录失败')
    return
  }
}

</script>

<template>
  <div class="login">
    <a-card title="登录" class="login-form">
      <a-form :rules="rules" ref="form" :model="formModel">
        <a-form-item
            name="username"
        >
          <a-input size="large" v-model:value="formModel.username">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password size="large" v-model:value="formModel.password">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button style="width: 100%" size="large" @click="login">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -100px;
  font-weight: bold;
  font-size: 60px;
}
.login-form {
  width: 350px;
  max-height: 400px;
  border-radius: 20px;
  font-weight: bold;
}
</style>
