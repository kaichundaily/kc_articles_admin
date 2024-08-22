<script setup>
import { ref } from "vue";
import { articleTableColumns } from "@/utils/columns.js";
import {
  EditOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons-vue'
import EditArticle from "@/views/article/modules/EditArticle.vue";
const loading = ref(false)
const columns = articleTableColumns()

// const showEditArticleDrawer = ref(false)

const data = ref([{
  title: "测试文章",
  tag: "测试文章",
  status: true,
  public: false,
  content: "# 测试文章\n\n## 测试第一节\n\n"
}])
const dataSet = ref({
  nowContent: "",
  nowTitle: "",
  id: '',
  showEditArticleDrawer: false
})

const openShowEditArticle = (newContent, newTitle, id) => {
  dataSet.value.nowContent = newContent
  dataSet.value.nowTitle = newTitle
  dataSet.value.id = id
  dataSet.value.showEditArticleDrawer = true
}

const closeShowEditArticle = () => {
  dataSet.value.nowContent = ""
  dataSet.value.nowTitle = ""
  dataSet.value.id = ""
  dataSet.value.showEditArticleDrawer = false
}

// onBeforeMount(() => {
//   childRef.value.toContent()
// })
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
    <edit-article
        ref="childRef"
        :dataSet="dataSet"
        @closeShowEditArticle="closeShowEditArticle"
    />
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
</style>