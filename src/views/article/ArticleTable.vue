<script setup>
import { computed, reactive, ref } from "vue";
import { articleTableColumns } from "@/utils/columns.js";
import {
  EditOutlined,
    CheckOutlined,
    CloseOutlined
} from '@ant-design/icons-vue'
import { useUserStore } from "@/stores/index.js";
import { message } from "ant-design-vue";
import EditArticle from "@/views/article/modules/EditArticle.vue";

import { getAllArticle, isPublicArticle, isStatusArticle, deleArticle } from "@/api/article.js";

import AddArticle from "@/views/article/modules/AddArticle.vue";

const loading = ref(false)
const columns = articleTableColumns()

const data = ref([])

const content = ref("")
const title = ref("")
const id = ref("")
const showMdEditor = ref(false)

const userStore = useUserStore()
// 打开编辑
const openShowEditArticle = (newContent, newTitle, newID) => {
  content.value = newContent
  title.value = newTitle
  id.value = newID
  showMdEditor.value = true
}
// 关闭编辑
const closeShowEditArticle = () => {
  content.value = ""
  title.value = ""
  id.value = ""
  showMdEditor.value = false
}
// 编辑成功
const submit = async () => {
  await getAllArticle(pagination.value.current, 10, userStore.userInfo.id).then((result) => {
    data.value = result.data.data
    pagination.value.total = result.data.total
  }).catch(() => {
    message.error("表格加载失败")
  }).finally(() => {
    closeShowEditArticle()
  })
}
// 表格分页功能
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['2','5','10','20','50'],
  onChange: (page, size) => {
    pagination.value.current = page
    pagination.value.pageSize = size
    getAllArticleData(page, size)
  }
})
// 获取数据
const getAllArticleData = async (page, size) => {
  loading.value = true
  // 分页获取当前登录用户文章
  await getAllArticle(page, size, userStore.userInfo.id).then((result) => {
    // 若使用table的复选框需要给每一行加上key
    let resultData = result.data.data
    resultData.forEach((item, index) => {
      item.key = index
    })
    data.value = resultData
    pagination.value.total = result.data.total
    message.success("表格加载成功")
  }).catch((err) => {
    message.error(`表格加载失败:${err}`)
  }).finally(() => {
    loading.value = false
  })
}

const changeGetAllArticleData = async (page, size) => {
  await getAllArticle(page, size, userStore.userInfo.id).then((result) => {
    // 若使用table的复选框需要给每一行加上key
    let resultData = result.data.data
    resultData.forEach((item, index) => {
      item.key = index
    })
    data.value = resultData
    pagination.value.total = result.data.total
  }).catch((err) => {
    message.error(`表格加载失败:${err}`)
  })
}

// 文章状态变更相关逻辑
const changeSwitch = async (record, mode) => {
  loading.value = true
  if (mode === "status") {
    await isStatusArticle(record.article_id,record.status === 1 ? 0 : 1).then( async (result) => {
      if (result.code === 200) {
        await changeGetAllArticleData(pagination.value.current,10)
        message.success("修改成功")
      }
    }).catch(() => {
      message.error("修改失败")
    }).finally(() => {
      loading.value = false
    })
  } else if (mode === "is_public") {
    if (record.status === 1) {
      message.error("请先发布文章")
      loading.value = false
      return
    }
    await isPublicArticle(record.article_id,record.is_public === 1 ? 0 : 1).then(async (result) => {
      if (result.code === 200) {
        await changeGetAllArticleData(pagination.value.current,10)
        message.success("修改成功")
      }
    }).catch(() => {
      message.error("修改失败")
    }).finally(() => {
      loading.value = false
    })
  }
}

// 2.1 添加新的文章记录
const addShow = ref(false)


const closeAddShow = () => {
  addShow.value = false
}


const submitAddShow = async () => {
  await getAllArticle(pagination.value.current, 10, userStore.userInfo.id).then((result) => {
    let resultData = result.data.data
    resultData.forEach((item, index) => {
      item.key = index
    })
    data.value = resultData
    pagination.value.total = result.data.total
  }).catch(() => {
    message.error("表格加载失败")
  }).finally(() => {
    closeAddShow()
  })
}
getAllArticleData(1, 10)
// 3 文章批量删除功能

const state = reactive({
  selectedRow: [],     // 被选中行内容
  selectedRowKeys: [], // 被选中行key
  loading: false,
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const start = async () => {
  state.loading = true;
  const articleIdList = state.selectedRow.map(item => item.article_id)
  console.log(articleIdList)
  await deleArticle(articleIdList).then((result) => {
    if (result.code === 200) {
      message.success("删除成功")
      submitAddShow()
    }
  }).catch(() => {
    message.error("删除失败")
  }).finally(() => {
    state.selectedRow = []
    state.selectedRowKeys = []
    state.loading = false
  })
};
const onSelectChange = (selectedRowKeys, selectedRow) => {
  // console.log('selectedRowKeys changed: ', selectedRowKeys);
  state.selectedRow = selectedRow
  state.selectedRowKeys = selectedRowKeys;
};
</script>

<template>
  <div>
    <a-table
        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
        :columns="columns"
        :loading="loading"
        :data-source="data"
        :pagination="pagination"
    >
      <!-- 自定义分页部分 -->
      <template #title>
        <div style="margin-bottom: 16px">
          <a-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="start">
            删除
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{ `Select ${state.selectedRowKeys.length} items` }}
            </template>
          </span>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          {{ record.title }}
        </template>
        <template v-else-if="column.key === 'tag'">
          <a-tag  color="blue" v-for="(tag, index) in record.tag" :key="index">
            {{ tag }}
          </a-tag>
        </template>
        <template v-else-if="column.key === 'status'">
          <a-switch @click="changeSwitch(record,'status')" :checked="record.status === 0">
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
        </template>
        <template v-else-if="column.key === 'public'">
          <a-switch @click="changeSwitch(record,'is_public')" :checked="record.is_public === 0">
            <template #checkedChildren><check-outlined /></template>
            <template #unCheckedChildren><close-outlined /></template>
          </a-switch>
        </template>
        <template v-else-if="column.key === 'edit'">
          <a-button type="primary" @click="openShowEditArticle(record.content, record.title, record.article_id)">编辑</a-button>
        </template>
      </template>
    </a-table>
    <a-float-button
      type="primary"
      class="custom-float-button"
      @click="addShow = true"
    >
      <template #icon>
        <EditOutlined class="custom-float-button-icon"/>
      </template>
    </a-float-button>
    <!--  文章编辑功能  -->
    <edit-article
      :articleData="{ id, title, showMdEditor, content }"
      @closeShowEditArticle="closeShowEditArticle"
      @submit="submit"
    />
  </div>
<!--  添加文章 -->
  <add-article
    :addShow="addShow"
    @closeAddShow="closeAddShow"
    @submitAddShow="submitAddShow"
  />
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