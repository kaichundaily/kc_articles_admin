<script setup>
import { ref } from "vue";
import { articleTableColumns } from "@/utils/columns.js";
import {
  EditOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons-vue'
import { message } from "ant-design-vue";
import { MdEditor } from "md-editor-v3";
import { testArticle } from "@/views/article/js/testArticle.js";
const loading = ref(false)
const columns = articleTableColumns()

const testContent = testArticle()

const data = ref([{
  title: "测试文章",
  tag: "测试文章",
  status: true,
  public: false,
  content: testContent
}])

const content = ref("")
const title = ref("")
const id = ref("")
const showMdEditor = ref(false)

const openShowEditArticle = (newContent, newTitle, newID) => {
  content.value = newContent
  title.value = newTitle
  id.value = newID
  showMdEditor.value = true
}

const closeShowEditArticle = () => {
  content.value = ""
  title.value = ""
  id.value = ""
  showMdEditor.value = false
}

const submit = () => {
  message.success("模拟提交成功")
  closeShowEditArticle()
}

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
</script>

<template>
  <div>
    <a-table
      :columns="columns"
      :loading="loading"
      :data-source="data"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          {{ record.title }}
        </template>
        <template v-else-if="column.key === 'tag'">
          {{ record.tag }}
        </template>
        <template v-else-if="column.key === 'status'">
          <a-switch v-model:checked="record.status">
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
        </template>
        <template v-else-if="column.key === 'public'">
          <a-switch v-model:checked="record.public">
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
        </template>
        <template v-else-if="column.key === 'edit'">
          <a-button>删除</a-button>
          <a-button type="primary" @click="openShowEditArticle(record.content, record.title, record.id)">编辑</a-button>
        </template>
      </template>
    </a-table>
    <a-float-button
      type="primary"
      class="custom-float-button"
    >
      <template #icon>
        <EditOutlined class="custom-float-button-icon"/>
      </template>
    </a-float-button>
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
      <div class="custom-modal" style="height: 800px">
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
  </div>
</template>

<style scoped>
.custom-float-button {
  width: 55px;
  height: 55px;
  .custom-float-button-icon{
    font-size: 20px;
  }
}
.custom-modal {
  overflow: auto;
}
</style>