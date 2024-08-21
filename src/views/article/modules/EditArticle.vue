<script setup>
import { MdEditor } from 'md-editor-v3';
import { onBeforeMount, ref } from "vue";
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
onBeforeMount(() => {
  content.value = props.dataSet.nowContent
})

const submit = () => {
  message.success("模拟提交成功")
  emit("closeShowEditArticle")
}
</script>

<template>
  <a-modal
    :title="dataSet.nowTitle || '编辑内容'"
    :width="1500"
    :open="dataSet.showEditArticleDrawer"
    @close="closeEditArticle"
    class="custom-modal"
    cancelText="取消编辑"
    okText="提交"
    @cancel="closeEditArticle"
    @ok="submit"
  >
    <div class="custom-modal">
      <MdEditor
          v-model="content"
          :preview="true"
          style="height: 100%"
      />
    </div>
  </a-modal>
</template>

<style scoped>
.custom-modal {
  height: 800px; /* 设置高度 */
  overflow-y: auto; /* 如果内容超过高度，则添加滚动条 */
}
</style>