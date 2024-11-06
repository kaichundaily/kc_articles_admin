<script setup>
import { ref } from "vue";
import { getUserTreeList } from "@/api/user.js";
import { message } from "ant-design-vue";
import { userRouterTableColumns } from "@/utils/columns.js";
import { getUserRouter } from "@/api/router.js";
import {useUserStore} from "@/stores/index.js";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons-vue";

const expandedKeys = ref([])
const selectedKeys = ref([])
const selectedNode = ref()
const treeData = ref([])

const userStore = useUserStore()

const initTreeData = () => {
  treeData.value.push({
    title: userStore.userInfo.nickname,
    key: userStore.userInfo.grade,
    username: userStore.userInfo.username,
    uid: userStore.userInfo.id,
  })
}

initTreeData()
// 节点被展开时
const onLoadData = (treeNode) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    if (treeNode.dataRef.children && treeNode.data.children.length > 0) {
      resolve()
      return
    }
    let userList = []
    const result = await getUserTreeList(treeNode.dataRef.username)
    if (result.code === 200 && result.data.len > 0) {
      result.data.tree.forEach((item) => {
        if (item.grade === 2) {
          userList.push({
            title: item.nickname,
            key: item.id,
            username: item.username,
            uid: item.id,
            leveluid: treeNode.dataRef.uid,
            isLeaf: true
          })
        } else {
          userList.push({
            title: item.nickname,
            key: item.id,
            username: item.username,
            uid: item.id,
            leveluid: treeNode.dataRef.uid,
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
const onSelected = async (onSelectKeys, e) => {
  selectedNode.value = e.node
  console.log(e.node)
  await getUserRouterTable(1, 10 , e.node.uid)
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
    getUserRouterTable(tablePagination.value.current,tablePagination.value.pageSize, selectedNode.value.uid)
  }
})
const tableColumns = userRouterTableColumns()

const getUserRouterTable = async (page, size, id) => {
  tableLoading.value = true
  await getUserRouter(page, size, id).then((result) => {
    if (result.code === 200) {
      tableData.value = result.data.list
      tablePagination.value.total = result.data.total
      message.success(result.message)
    } else {
      message.warning(result.message)
    }
  }).catch((err) => {
    message.warning(err.toString())
  }).finally(() => {
    tableLoading.value = false
  })
}
// 展开行
const expanded_Keys = ref([])
const onExpand = (expanded, record) => {
  const index = expanded_Keys.value.indexOf(record.id)
  if (index === -1) {
    expanded_Keys.value.push(record.id)
  } else {
    expanded_Keys.value.splice(index, 1)
  }
  console.log(expanded_Keys.value)
}


// 路由权限
const changeStatus = (status) => {
  if (selectedNode.value.username === userStore.userInfo.username) {
    message.warning("只能修改子账户")
    return
  }
  console.log(status === 1 ? 0 : 1)
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
          @expand="onExpand"
          rowKey="id"
          v-model:expandedRowKeys="expanded_Keys"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-switch @click="changeStatus(record.status)" :checked="record.status === 1">
                <template #checkedChildren><check-outlined/></template>
                <template #unCheckedChildren><close-outlined /></template>
              </a-switch>
            </template>
          </template>
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