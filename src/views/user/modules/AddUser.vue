<script setup>
import { ref, watch } from "vue";
import { message } from "ant-design-vue";
import { UploadImage, DeleImg } from '@/api/file.js'
import { addUser,updateUser } from '@/api/user.js'
import { addUserRules } from '@/utils/rules.js'
const props = defineProps({
  showSubmit: Boolean,
})

const formRef = ref(null)
// 1. 图片上传


const formData = ref({
  mark: '',
  level: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const formRules = addUserRules()


const emit = defineEmits(["closeSubmit"])


// 关闭创建
const closeSubmit = () => {
  emit("closeSubmit")
}
// 退出创建用户
// const changeShowDrawer = async () => {
//   let result = await DeleImg(formData.value.imgUrl)
//   if (result.data === 200) {
//     formData.value = {
//       imgUrl: '',
//       username: '',
//       password: '',
//       confirmPassword: ''
//     }
//     emit('closeSubmit')
//     return
//   }
//   message.error("删除失败")
// }

// 1.1 上传前处理
// const beforeUpload = (file) => {
//   const isImage = file.type.startsWith('image/')
//   const isLt2m = file.size / 1024 / 1024 < 2
//   if (!isImage) {
//     message.error("上传的必须是图片")
//   }
//   if (!isLt2m) {
//     message.error('上传的图片必须小于2MB')
//   }
//   return isImage && isLt2m
// }
//
// const oldImgUrl = ref("")
// // 1.2 上传
// const handleUpload = async (options) => {
//   if (formData.value.imgUrl !== "") {
//     oldImgUrl.value = formData.value.imgUrl
//   }
//   const { file, onSuccess, onError, onProgress } = options
//   loading.value = true
//   await  UploadImage(file).then((result) => {
//     formData.value.imgUrl = result.data.url
//     message.success(result.message)
//   }).catch((error) => {
//     message.error(`上传头像失败:${error}`)
//   }).finally(() => {
//     loading.value = false
//   })
// }
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
    @ok="closeSubmit"
  >
    <a-form
      :rules="formRules"
      :model="formData"
      ref="formRef"
    >
<!--      <a-form-item>-->
<!--        <div>上传头像:</div>-->
<!--        <a-upload-->
<!--            v-model:file-list="fileList"-->
<!--            name="file"-->
<!--            list-type="picture-card"-->
<!--            class="avatar-uploader"-->
<!--            :show-upload-list="false"-->
<!--            :before-upload="beforeUpload"-->
<!--            :custom-request="handleUpload"-->
<!--        >-->
<!--          <img v-if="formData.imgUrl" :src="formData.imgUrl" alt="avatar" class="uploaded-img" />-->
<!--          <div v-else class="upload-placeholder">-->
<!--            <loading-outlined v-if="loading"></loading-outlined>-->
<!--            <plus-outlined v-else></plus-outlined>-->
<!--            <div class="ant-upload-text">Upload</div>-->
<!--          </div>-->
<!--        </a-upload>-->
<!--      </a-form-item>-->
      <a-form-item name="mark" :rules="formRules.mark">
        <div>身份:</div>
        <a-select v-model:value="formData.mark">
          <template #suffixIcon>
            <UserOutlined class="site-form-item-icon" />
          </template>
          <a-select-option value="管理员">管理员</a-select-option>
          <a-select-option value="主管">主管</a-select-option>
          <a-select-option value="组长">组长</a-select-option>
          <a-select-option value="组员">组员</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="level" :rules="formRules.level">
        <div>上级:</div>
        <a-select v-model:value="formData.level">
          <template #suffixIcon>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-select>
      </a-form-item>
      <a-form-item name="username" :rules="formRules.username">
        <div>账户:</div>
        <a-input v-model:value="formData.username" placeholder="请输入账户">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" :rules="formRules.password">
        <div>密码:</div>
        <a-input-password v-model:value="formData.password" placeholder="请输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="confirmPassword" :rules="formRules.confirmPassword">
        <div>验证:</div>
        <a-input-password v-model:value="formData.confirmPassword" placeholder="请再次输入密码">
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