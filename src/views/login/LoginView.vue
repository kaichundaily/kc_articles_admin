<script setup>
import { loginFormRules } from '@/utils/rules.js';
import { ref } from "vue";
import { useMenuStore, useRouterStore, useUserStore } from "@/stores/index.js";
import { useRouter } from "vue-router";
import { userLoginService } from '@/api/user.js';
import { message } from "ant-design-vue";
import { getRouters } from "@/api/router.js";
import { convertToDynamicImport } from "@/utils/addRouter.js";

const rules = loginFormRules()
const formModel = ref({
  username: '',
  password: ''
})
const form = ref()
const routerStore = useRouterStore()
const userStore = useUserStore()
const menuStore = useMenuStore()
const router = useRouter()

const login = async () => {
  await form.value.validate()
  const result = await userLoginService(formModel.value)
  if (result.code === 200) {
    userStore.setToken(result.data.token)
    userStore.setUserInfo({
      id: result.data.id,
      username: result.data.username,
      avatar: result.data.avatar,
      grade: result.data.grade
    })
    const res = await getRouters(result.data.id)
    console.log(res.data)
    menuStore.setMenuList(res.data)
    const routes = convertToDynamicImport(res.data)
    routes.forEach((route) => {
      router.addRoute('Layout', route)
    })
    routerStore.commitRouter(true)
    message.success("登陆成功")
    await router.push("/")
  }
}

</script>

<template>
    <section class="w3l-hotair-form">
        <h1>Report Login Form</h1>
        <div class="container">
            <!-- /form -->
            <div class="workinghny-form-grid">
                <div class="main-hotair">
                    <div class="content-wthree">
                        <h2>Log In</h2>
                        <a-form :rules="rules" ref="form" :model="formModel">
                          <a-form-item name="username">
                            <a-input size="large" v-model:value="formModel.username">
                              <template #prefix>
                                <UserOutlined class="site-form-item-icon"/>
                              </template>
                            </a-input>
                          </a-form-item>
                          <a-form-item name="password">
                            <a-input-password size="large" v-model:value="formModel.password">
                              <template #prefix>
                                <LockOutlined class="site-form-item-icon"/>
                              </template>
                            </a-input-password>
                          </a-form-item>
                          <a-form-item>
                            <a-button style="display: flex; align-items: center; justify-content: center;" class="" size="large" @click="login">登录</a-button>
                          </a-form-item>
                        </a-form>
                    </div>
                    <div class="w3l_form align-self">
                        <div class="left_grid_info">
                            <img src="./images/1.png" alt="" class="img-fluid">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@import "css/style.css";
@import "css/font-awesome.min.css";

</style>
