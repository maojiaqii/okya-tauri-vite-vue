<script lang="ts" setup>
import type { TableColumnObject, TableDataObject } from "~/types";

const props = defineProps({
  data: {
    type: Object as PropType<TableDataObject>,
    default: undefined,
  },
  column: {
    type: Object as PropType<TableColumnObject>,
    default: undefined
  },
})

const initColumn = (column: any, col: any) => {
  column.sum = col.sum;
  return column.label
};
</script>

<template>
  <el-table-column
    v-if="column.visible && column.children && column.children.length > 0"
    :show-overflow-tooltip="true"
    :prop="column.prop"
    :label="column.label"
    :fixed="column.fixed"
    :align="column.align ? column.align : 'center'"
  >
    <template #header="scope">
      <span>{{ initColumn(scope.column, column) }}</span>
      <el-tooltip v-if="column.comment">
        <template #content>
          <span v-html="column.comment"></span>
        </template>
        <i style="vertical-align: middle;" class="icon-info1"></i>
      </el-tooltip>
    </template>
    <m-table-column v-for="(columnC, index) in column.children"
                    :column="columnC"
                    :key="index"
                    :data="data"
    />
  </el-table-column>
  <el-table-column
    v-else-if="column.visible && (!column.children || column.children.length == 0)"
    :show-overflow-tooltip="true"
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :min-width="column.minWidth"
    :sortable="column.sortable"
    :fixed="column.fixed"
    :key="column.prop"
    :align="column.align ? column.align : 'center'"
    :formatter="column.formatter"
  >
    <template #header="scope">
      <span>{{ initColumn(scope.column, column) }}</span>
      <el-tooltip v-if="column.comment">
        <template #content>
          <span v-html="column.comment"></span>
        </template>
        <i style="vertical-align: middle;" class="icon-info1"></i>
      </el-tooltip>
    </template>
    <template #default="scope">
        <slot :name="column.prop" :colData="scope.row[column.prop]">
          <span style="height: 23px;display: inline-block;">{{ scope.row[column.prop] ? scope.row[column.prop] : "" }}</span>
        </slot>
    </template>
  </el-table-column>
</template>
