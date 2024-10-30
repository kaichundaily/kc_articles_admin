<script setup>
import { ref } from "vue";
import { getUserRouter, getUserTreeList } from "@/api/user.js";
import { message } from "ant-design-vue";
import { userRouterTableColumns } from "@/utils/columns.js";

const expandedKeys = ref([])
const selectedKeys = ref([])

const treeData = ref([
  {
    title: "admin",
    key: 0,
  }
])
// 节点被展开时
const onLoadData = (treeNode) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    if (treeNode.dataRef.children && treeNode.data.children.length > 0) {
      resolve()
      return
    }
    let userList = []
    const result = await getUserTreeList(treeNode.dataRef.title)
    if (result.code === 200 && result.data.len > 0) {
      result.data.tree.forEach((item) => {
        if (item.grade === 2) {
          userList.push({
            title: item.username,
            key: item.id,
            isLeaf: true
          })
        } else {
          userList.push({
            title: item.username,
            key: item.id,
            isLeaf: false
          })
        }
      })
      treeNode.dataRef.children = userList
      treeData.value = [...treeData.value]
      resolve()
      return
    } else {
      message.warning("未发现子用户")
      treeNode.dataRef.children = []
      treeData.value = [...treeData.value]
      resolve()
      return
    }
  })
}
// 节点被点击时
const onSelected = (onSelectKeys, e) => {
  console.log(treeData.value)
  console.log(e)
}

const treeColHeight = (num) => {
  return num / 100 * window.innerHeight - 106 + 'px'
}
const tableColHeight = (num) => {
  return num / 100 * window.innerHeight - 96 + 'px'
}


// 表格相关
const tableData = ref([])
const tableLoading = ref(false)
const tablePagination = ref({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  pageSizeOptions: ['2','5','10','20','50'],
  onChange: (page, size) => {
    tablePagination.value.current = page
    tablePagination.value.pageSize = size
    getUserRouterTable(tablePagination.value.current, tablePagination.value.pageSize,selectedKeys.value[0])
  }
})
const tableColumns = userRouterTableColumns()

const getUserRouterTable = async (page, size, id) => {
  tableLoading.value = true
  await getUserRouter(page, size, id).then(() => {

  }).catch(() => {

  }).finally(() => {
    tableLoading.value = false
  })

}
</script>

<template>
  <div style="height: 100%; width: 100%;">
    <a-row :gutter="[25, 0]">
      <a-col :span="4">
        <a-row>
          <a-col :span="24" class="title">
            <span>User Tree</span>
          </a-col>
          <a-col :span="24" :style="{ height: treeColHeight(90),backgroundColor: 'rgb(255, 255, 255)', margin: '10px 0px 0px 0px', padding: '20px', borderRadius: '15px' }">
            <a-tree
                v-model:expandedKeys="expandedKeys"
                v-model:selectedKeys="selectedKeys"
                :load-data="onLoadData"
                :tree-data="treeData"
                @select="onSelected"
            />
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="20" :style="{ height: tableColHeight(100), backgroundColor: 'rgb(255, 255, 255)', borderRadius: '15px', padding: '20px' }">
        <a-table
          :columns="tableColumns"
          :data-source="tableData"
          :loading="tableLoading"
          :pagination="tablePagination"
          :bordered="true"
        >

        </a-table>
      </a-col>
    </a-row>
    <a-row>
    </a-row>
  </div>
</template>

<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  height: 10vh;
  border-radius: 15px;
  padding: 20px;
}
</style>