<script setup>
import { MdEditor } from 'md-editor-v3';
import {onBeforeMount, ref} from "vue";

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
</script>

<template>
 <a-drawer
     :width="'100vw'"
     :title="dataSet.nowTitle || '编辑文章' "
     placement="right"
     :open="dataSet.showEditArticleDrawer"
     @close="closeEditArticle"
 >
   <template #extra>
     <a-button style="margin-right: 8px" @click="closeEditArticle">取消</a-button>
     <a-button type="primary">提交</a-button>
   </template>
   <MdEditor
       v-model="content"
       :preview="true"
   />
 </a-drawer>
</template>

<style scoped>

</style>