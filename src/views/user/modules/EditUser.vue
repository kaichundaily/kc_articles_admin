<script setup>
import {ref} from "vue";
import { message } from "ant-design-vue";
import { UploadImage } from '@/api/file.js'
const props = defineProps({
  showDrawer: Boolean
})

const emit = defineEmits(["changeShowDrawer", "drawerSubmit"])
const changeShowDrawer = () => {
  fileList.value = []
  imgUrl.value = ""
  emit('changeShowDrawer')
}
const drawerSubmit = () => {
  fileList.value = []
  imgUrl.value = ""
  emit('drawerSubmit')
}

// 1. 图片上传
const fileList = ref([])

const imgUrl = ref("")

const loading = ref(false)

// 1.1 上传前处理
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2m = file.size / 1024 / 1024 < 2
  console.log(file.size)
  if (!isImage) {
    message.error("上传的必须是图片")
  }
  if (!isLt2m) {
    message.error('上传的图片必须小于2MB')
  }
  return isImage && isLt2m
}
// 1.2 上传
const handleUpload = async (options) => {
  const { file, onSuccess, onError, onProgress } = options
  console.log(file)
  loading.value = true
  try {
    const response = await UploadImage(file)
    console.log(response)
    imgUrl.value = response.data.imgUrl
    message.success("图片上传成功")
  } catch (error) {
    message.error("图片上传失败")
  } finally {
    loading.value = false
  }

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
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :custom-request="handleUpload"
        >
          <img v-if="imgUrl" :src="imgUrl" alt="avatar" class="uploaded-img" />
          <div v-else class="upload-placeholder">
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