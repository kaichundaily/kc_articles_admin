<script setup>
// 0 引入
import { message } from "ant-design-vue";
import {ref} from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import { addArticle } from "@/api/article.js"
import { useUserStore } from "@/stores/index.js";
// 0.1 接收数据
const props = defineProps({
  addShow: Boolean
})

const userStore = useUserStore()

const emit = defineEmits(["closeAddShow"])
// 1. 添加文章记录
// 1.1 取消添加文章记录
const closeAddShow = () => {
  emit('closeAddShow')
  tagList.value = []
  title.value = ""
}

// 1.2 提交编辑文章记录
const submit = async () => {
  if (title.value.length <= 0 && tagList.value.length <= 0) {
    message.error("请输入标签或标题")
    return
  }
  if (title.value.length <= 0) {
    message.error("标题不能为空")
    closeAddShow()
    return
  }
  // message.success("模拟提交文章")
  if (tagList.value.length <= 0) {
    message.error("标签不能为空")
    closeAddShow()
    return
  }
  await addArticle("",title.value, tagList.value, userStore.userInfo.id).then((result) => {
    if (result.code === 200) {
      console.log(result)
      message.success("Success")
    }
  }).catch((err) => {
    console.log(err)
    message.error("Error")
  }).finally(() => {
    // message.success("模拟提交文章")
    closeAddShow()
  })
}
// 2. 添加标签相关
const isShowTagInput = ref(false)
const tagList = ref([])
const tagInputValue = ref("")
const title = ref("")
// 2.1 显示标签输入框
const showInput = () => {
  isShowTagInput.value = true
}
// 2.2 关闭标签输入框
const submitTag = () => {
  console.log(tagInputValue.value)
  if (tagInputValue.value === '') {
    isShowTagInput.value = false
    return
  }
  tagList.value = [...tagList.value, tagInputValue.value]
  console.log(tagList.value)
  isShowTagInput.value = false
  tagInputValue.value = ""
}
// 2.3删除标签
const deleTag = (removeTag) => {
  tagList.value = tagList.value.filter(tag => tag !== removeTag)
}
</script>

<template>
  <a-drawer :width="500" title="添加文章记录" :open="addShow" @close="closeAddShow">
    <template #extra>
      <a-button style="margin-right: 8px" @click="closeAddShow">取消</a-button>
      <a-button type="primary" @click="submit">提交</a-button>
    </template>
    <a-form>
      <a-form-item>
        <div>封图:</div>
      </a-form-item>
      <a-form-item>
        <div>标题:</div>
        <a-input
          v-model:value="title"
          placeholder="input title"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <div>标签:</div>
        <template v-for="(tag, index) in tagList" :key="index">
          <a-tag style="font-size: 16px" color="#108ee9" :closable="true" @close="deleTag(tag)">
            {{ tag }}
          </a-tag>
        </template>
        <a-input
          v-if="isShowTagInput"
          v-model:value="tagInputValue"
          type="text"
          size="small"
          :style="{ width: '78px' }"
          @blur="submitTag"
          @keyup.enter="submitTag"
          placeholder="input tag"
        />
        <a-tag v-else-if="!isShowTagInput && tagList.length < 3" style="background: #fff; border-style: dashed" @click="showInput">
          <PlusOutlined />
          New Tag
        </a-tag>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped>

</style>