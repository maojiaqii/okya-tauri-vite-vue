<script lang="ts" setup>
import {a} from "@unhead/vue/dist/shared/vue.a001678c";
import type { TableColumnCtx } from 'element-plus'
import type { TableColumnObject, TableDataObject } from "~/types";

const props = defineProps({
  data: {
    type: Object as PropType<any>,
    default: undefined,
  },
  column: {
    type: Object as PropType<TableColumnObject>,
    default: undefined
  },
})

const initColumn = (column: any, col: TableColumnObject) => {
  column.sum = col.sum;
  return column.label
};

const filterData = (column: TableColumnObject) => {
  let fData: any[] = [];
  if (props.data) {
    props.data.forEach((v: any) => {
      fData.includes(v[column.prop]) || fData.push(v[column.prop])
    })
  }
  for (const i in fData) {
    fData[i] = { text: fData[i], value: fData[i] }
  }
  return fData
};

const filterHandler = (value: string, row: any, column: TableColumnCtx<any>) => {
  return row[column['property']] === value
}
</script>

<template>
  <el-table-column
    v-if="column && column.visible && column.children && column.children.length > 0"
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
    v-else-if="column && column.visible && (!column.children || column.children.length == 0)"
    :show-overflow-tooltip="true"
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :min-width="column.minWidth"
    :sortable="column.sortable ? 'custom' : false"
    :filters="column.filterable ? filterData(column) : undefined"
    :filter-method="column.filterable ? filterHandler : undefined"
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
