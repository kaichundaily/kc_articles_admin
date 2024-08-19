<script setup>
import { ref } from "vue";
import { articleTableColumns } from "@/utils/columns.js";
import {
  EditOutlined
} from '@ant-design/icons-vue'
const loading = ref(false)
const columns = articleTableColumns()
</script>

<template>
  <div>
    <a-table
      :columns="columns"
      :loading="loading"
    >
      <template #bodyCell="column, record">
        <template v-if="column.key === 'title'">
          {{ record.title }}
        </template>
        <template v-else-if="column.key === 'tag'"></template>
        <template v-else-if="column.key === 'status'"></template>
        <template v-else-if="column.key === 'select'"></template>
        <template v-else-if="column.key === 'edit'"></template>
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