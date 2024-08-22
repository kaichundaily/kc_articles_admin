<script setup>
import { MdEditor } from 'md-editor-v3';
import { ref } from "vue";
import { message } from "ant-design-vue";

const props = defineProps({
  dataSet: Object,
})
const  content = ref("")
// content.value = props.dataSet.nowContent
const emit = defineEmits(["closeShowEditArticle"])

const closeEditArticle = () => {
  content.value = ""
  emit("closeShowEditArticle")
}

const submit = () => {
  message.success("模拟提交成功")
  closeEditArticle()
}

const toContent = () => {
  content.value = props.dataSet.nowContent
}
// 自定义工具栏
const customToolbar = ref([
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  'mermaid',
  'katex',
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'previewOnly',
  'htmlPreview',
  'catalog',
])

defineExpose({
  toContent
})
</script>

<template>
  <a-modal
    :title="dataSet.nowTitle || '编辑内容'"
    :width="`60%`"
    :open="dataSet.showEditArticleDrawer"
    @close="closeEditArticle"
    class="custom-modal"
    cancelText="取消编辑"
    okText="提交"
    @cancel="closeEditArticle"
    @ok="submit"
  >
    <div class="custom-modal" style="height: 800px">
      <MdEditor
          previewTheme="cyanosis"
          v-model="content"
          :preview="true"
          style="height: 100%"
          :toolbars="customToolbar"
      />
    </div>
  </a-modal>
</template>

<style scoped>
.custom-modal {
  overflow-y: auto; /* 如果内容超过高度，则添加滚动条 */
}
</style>