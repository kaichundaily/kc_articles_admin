<script setup>

import { MdEditor } from "md-editor-v3";
import { ref, watch } from "vue";
import { MarkdownToolbar } from "@/views/article/js/Tools.js";
import { UploadImage } from "@/api/file.js";
import { editArticle } from "@/api/article.js";
import { message } from "ant-design-vue";

const props = defineProps({
  articleData: Object
})
const customToolbar = MarkdownToolbar() || []
// 初始化数据
const title = ref("")
const showMdEditor = ref(false)
const content = ref("")
const articleID = ref("")
// 初始化数据
const initData = () => {
  switch (props.articleData.showMdEditor) {
    case true:
      title.value = props.articleData.title
      showMdEditor.value = props.articleData.showMdEditor
      content.value = props.articleData.content
      articleID.value = props.articleData.id
      break
    case false:
      title.value = ""
      showMdEditor.value = false
      content.value = ""
      articleID.value = ""
      break
  }
}

const emit = defineEmits(["closeShowEditArticle","submit"])


const closeShowEditArticle = () => {
  emit("closeShowEditArticle")
}
const submit = async () => {
  await editArticle(articleID.value,content.value).then((result) => {
    if (result.code === 200) {
      message.success("修改成功")
    }
  }).catch(() => {
    message.error("修改失败")
  })
  emit("submit")
}

// 上传图片
const uploadImage = async (files, callback) => {
  await UploadImage(files[0]).then((result) => {
    console.log(result.data.imgUrl)
    // alert(result.data.imgUrl)
    callback([result.data.imgUrl])
    message.success("图片上传成功")
  }).catch((err) => {
    message.error("图片上传失败")
  })
}


// 更新数据
watch(props, (newValue, oldValue) => {
  initData()
})


</script>

<template>
  <!--  文章编辑功能  -->
  <a-modal
      :title="title || '编辑内容'"
      :width="`60%`"
      :open="showMdEditor"
      @close="closeShowEditArticle"
      cancel-text="取消编辑"
      ok-text="提交"
      @cancel="closeShowEditArticle"
      @ok="submit"
  >
    <div class="custom-modal" style="height: 800px;">
      <MdEditor
          theme="dark"
          preview-theme="cyanosis"
          v-model="content"
          :preview="true"
          style="height: 100%"
          :toolbars="customToolbar"
          :on-upload-img="uploadImage"
      />
    </div>
  </a-modal>
</template>

<style scoped>

</style>