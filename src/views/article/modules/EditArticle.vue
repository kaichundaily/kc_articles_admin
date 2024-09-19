<script setup>

import { MdEditor } from "md-editor-v3";
import { ref, watch } from "vue";
import { MarkdownToolbar } from "@/views/article/js/Tools.js";

const props = defineProps({
  articleData: Map
})
const customToolbar = MarkdownToolbar() || []
// 初始化数据
const title = ref("")
const showMdEditor = ref(false)
const content = ref("")
// 初始化数据
const initData = () => {
  title.value = props.articleData.title
  showMdEditor.value = props.articleData.showMdEditor
  content.value = props.articleData.content
}

const emit = defineEmits(["closeShowEditArticle","submit"])


const closeShowEditArticle = () => {
  emit("closeShowEditArticle")
}

const submit = () => {
  emit("submit")
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
      />
    </div>
  </a-modal>
</template>

<style scoped>

</style>