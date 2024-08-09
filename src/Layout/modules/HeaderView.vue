<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/index.js";
import { ref } from "vue";
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
              <a-avatar shape="square">U</a-avatar>
            </template>
<!--            <a-menu-item key="1" @click="router.push('/userinfo')">-->
            <a-menu-item key="1" >
              <UserOutlined />
              用户详情
            </a-menu-item>
<!--            <a-menu-item key="2" @click="router.push('/passwd')">-->
            <a-menu-item key="2" >
              <FormOutlined />
              修改密码
            </a-menu-item>
            <a-menu-item key="3">
              <QuestionOutlined />
              忘记密码
            </a-menu-item>
            <a-menu-item key="4" @click="showModel">
              <LogoutOutlined />
              退出登录
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
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
