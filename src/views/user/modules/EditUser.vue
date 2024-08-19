<script setup>
const props = defineProps({
  showDrawer: Boolean
})

const emit = defineEmits(["changeShowDrawer", "drawerSubmit"])
const changeShowDrawer = () => {
  emit('changeShowDrawer')
}
const drawerSubmit = () => {
  emit('drawerSubmit')
}
</script>

<template>
  <a-drawer :width="500" title="添加用户" placement="right" :open="showDrawer" @close="changeShowDrawer">
    <template #extra>
      <a-button style="margin-right: 8px" @click="changeShowDrawer">取消</a-button>
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
</template>

<style scoped>

</style>