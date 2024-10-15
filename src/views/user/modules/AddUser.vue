<script setup>
import { ref, watch } from "vue";
import { message } from "ant-design-vue";
import { UploadImage, DeleImg } from '@/api/file.js'
import { addUser,updateUser } from '@/api/user.js'
import { addUserRules } from '@/utils/rules.js'
const props = defineProps({
  showDrawer: Boolean,
  mode: String,
  record: Object
})

const formRef = ref(null)
// 1. 图片上传
const fileList = ref([])


const formData = ref({
  imgUrl: '',
  username: '',
  password: '',
  confirmPassword: ''
})

const formRules = addUserRules()

const loading = ref(false)

const emit = defineEmits(["changeShowDrawer", "closeSubmit"])

// 退出创建用户
const changeShowDrawer = async () => {
  console.log(props.mode)
  // 如果退出没有提交则删除上传的图片
  switch (props.mode) {
    case "edit":
      if (oldImgUrl.value !== "") {
        await DeleImg(formData.value.imgUrl)
      }
      break
    case "add":
      if (formData.value.imgUrl !== ''){
        await DeleImg(formData.value.imgUrl)
      }
      break
  }
  // DeleImg(imgUrl)
  formData.value = {
    imgUrl: '',
    username: '',
    password: '',
    confirmPassword: ''
  }
  emit('closeSubmit')
}

// 提交创建用户
const drawerSubmit = async () => {
  switch (props.mode){
    // 修改用户信息
    case 'edit':
      if (formData.value.imgUrl === "" && formData.value.password === "") {
        message.warning("未修改不能提交")
        oldImgUrl.value = ""
        formData.value = {
          imgUrl: '',
          username: '',
          password: '',
          confirmPassword: ''
        }
        emit('changeShowDrawer')
        break
      }
      await updateUser(props.record.id,formData.value.imgUrl, formData.value.password).then((result) => {
        if (result.code === 200) {
          message.success("用户信息修改成功")
        } else {
          message.error("用户信息修改失败:S")
        }
      }).catch(() => {
        message.error("用户信息修改失败:C")
      }).finally(() => {
        oldImgUrl.value = ""
        formData.value = {
          imgUrl: '',
          username: '',
          password: '',
          confirmPassword: ''
        }
        emit('changeShowDrawer')
      })
      break
    // 添加新的用户
    case 'add':
      if (formData.value.password === "") {
        message.error("账号不能为空")
        return
      }
      if (formData.value.password === "")  {
        message.error("密码不能为空")
        return
      }
      if (formData.value.confirmPassword === "")  {
        message.error("验证密码不能为空")
        return
      }

      if (formData.value.password !== formData.value.confirmPassword) {
        message.error("两次输入的密码不一致")
        return
      }
      await addUser(formData.value.username, formData.value.password, formData.value.imgUrl).then((result) => {
        if (result.code === 200) {
          message.success(result.message)
        } else {
          message.error("创建用户失败或用户已存在")
        }
      }).catch((error) => {
        message.error(`创建用户失败:${error}`)
      }).finally(() => {
        oldImgUrl.value = ""
        formData.value = {
          imgUrl: '',
          username: '',
          password: '',
          confirmPassword: ''
        }
        emit('changeShowDrawer')
      })
      break
  }
}

// 1.1 上传前处理
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2m = file.size / 1024 / 1024 < 2
  if (!isImage) {
    message.error("上传的必须是图片")
  }
  if (!isLt2m) {
    message.error('上传的图片必须小于2MB')
  }
  return isImage && isLt2m
}

const oldImgUrl = ref("")
// 1.2 上传
const handleUpload = async (options) => {
  if (formData.value.imgUrl !== "") {
    oldImgUrl.value = formData.value.imgUrl
  }
  const { file, onSuccess, onError, onProgress } = options
  loading.value = true
  await  UploadImage(file).then((result) => {
    formData.value.imgUrl = result.data.url
    message.success(result.message)
  }).catch((error) => {
    message.error(`上传头像失败:${error}`)
  }).finally(() => {
    loading.value = false
  })
}

// 2. 修改用户信息
const initEditUserInfo = () => {
  switch (props.mode) {
    case "edit":
      formData.value.imgUrl = props.record.avatar
      formData.value.username = props.record.username
      break
    case "add":
      break
  }
}
// 监听props的变化，以便初始化数据
watch(props,(newValue,oldValue) => {
  initEditUserInfo()
})
</script>

<template>
  <a-drawer :width="500" title="添加用户" placement="right" :open="showDrawer" @close="changeShowDrawer">
    <template #extra>
      <a-button style="margin-right: 8px" @click="changeShowDrawer">取消</a-button>
      <a-button type="primary" @click="drawerSubmit">提交</a-button>
    </template>
    <a-form
      :rules="formRules"
      :model="formData"
      ref="formRef"
    >
      <a-form-item>
        <div v-if="mode === 'edit'">修改头像:</div>
        <div v-else>上传头像:</div>
        <a-upload
            v-model:file-list="fileList"
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            :custom-request="handleUpload"
        >
          <img v-if="formData.imgUrl" :src="formData.imgUrl" alt="avatar" class="uploaded-img" />
          <div v-else class="upload-placeholder">
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item name="username" :rules="formRules.username">
        <div v-if="mode === 'edit'">账户名称:</div>
        <div v-else>创建账户:</div>
        <!--    如果是编辑模式,则用户名不能修改    -->
        <a-input v-if="mode === 'edit'" v-model:value="formData.username" readOnly>
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
        <a-input v-else v-model:value="formData.username" placeholder="请输入账户">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password" :rules="formRules.password">
        <div v-if="mode === 'edit'">修改密码:</div>
        <div v-else>创建密码:</div>
        <a-input-password v-model:value="formData.password" placeholder="请输入密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item name="confirmPassword" :rules="formRules.confirmPassword">
        <div>密码验证:</div>
        <a-input-password v-model:value="formData.confirmPassword" placeholder="请再次输入密码">
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