<script lang="ts" setup>
import { ElTreeV2, ElPopover } from 'element-plus'
import type {TableColumnCtx} from 'element-plus'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'
import type {TableColumnObject} from "~/types";
import {debounce} from "~/utils";

const props = defineProps({
  column: {
    type: Object as PropType<TableColumnObject>,
    default: undefined
  },
  selectRowIndex: Number, //可编辑表格时用到
  selectCellIndex: Number,
  allEditable: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['filterData', 'filterHandler'])
const {t} = useI18n()
const filterRef = ref<InstanceType<typeof ElTreeV2>>()
const popoverRef = ref<InstanceType<typeof ElPopover>>()

const query = ref('');
const onQueryChanged = debounce((query: string) => {
  filterRef.value!.filter(query)
});
const treeFilterMethod = (query: string, node: TreeNode) => {
  console.log(query, node)
  return node.label!.indexOf(query) !== -1
};

const initColumn = (column: any, col: TableColumnObject) => {
  column.sum = col.sum;
  return column.label
};

const filterData = (column: TableColumnObject) => {
  let fData: any[] = []
  let callback = (result: any[]) => {
    fData.push(...result)
  }
  emits('filterData', {
    column: column,
    callBack: callback
  })
  return fData
};

const resetFilter = (column: TableColumnObject) => {
  popoverRef.value!.hide()
  filterRef.value!.setCheckedKeys([])
  confirmFilter(column)
};

const confirmFilter = (column: TableColumnObject) => {
  popoverRef.value!.hide()
  emits('filterHandler', {
    value: filterRef.value!.getCheckedKeys(),
    column: column.prop
  })
}
</script>

<template>
  <el-table-column
    v-if="column && column.visible !== false && column.children && column.children.length > 0"
    :show-overflow-tooltip="column.overflowTooltip !== false"
    :prop="column.prop"
    :label="column.label"
    :fixed="column.fixed"
    :align="column.align ? column.align : 'center'"
  >
    <template #header="scope">
      <el-tooltip placement="top" v-if="column.comment">
        <template #content>
          <span v-html="column.comment"></span>
        </template>
        <span>{{ initColumn(scope.column, column) }}</span>
      </el-tooltip>
      <span v-else>{{ initColumn(scope.column, column) }}</span>
    </template>
    <m-table-column v-for="(columnC, index) in column.children"
                    :column="columnC"
                    :key="index"
                    :selectRowIndex="selectRowIndex"
                    :selectCellIndex="selectCellIndex"
                    :allEditable="allEditable"
                    @filterData="filterData"
                    @filterHandler="confirmFilter"
    />
  </el-table-column>
  <el-table-column
    v-else-if="column && column.visible !== false && (!column.children || column.children.length == 0)"
    :show-overflow-tooltip="column.overflowTooltip !== false"
    :prop="column.prop"
    :label="column.label"
    :width="column.width"
    :min-width="column.minWidth"
    :sortable="column.sortable ? 'custom' : false"
    :filters="[]"
    :fixed="column.fixed"
    :key="column.prop"
    :align="column.align ? column.align : 'center'"
    :formatter="column.formatter"
  >
    <template #header="scope">
      <el-tooltip placement="top" v-if="column.comment">
        <template #content>
          <span v-html="column.comment"></span>
        </template>
        <span>{{ initColumn(scope.column, column) }}</span>
      </el-tooltip>
      <span v-else>{{ initColumn(scope.column, column) }}</span>
      <el-popover
        ref="popoverRef"
        v-if="column.filterable"
        placement="bottom-start"
        :width="200"
        trigger="click"
      >
        <el-input
          v-model="query"
          :placeholder="t('component.placeholder_input')"
          @input="onQueryChanged"
        />
        <el-tree-v2
          ref="filterRef"
          show-checkbox
          check-on-click-node
          :props="{ value: 'value', label: 'label', children: 'children' }"
          :data="filterData(column)"
          :filter-method="treeFilterMethod"
          :height="208"
        />
        <m-divider border-style="dashed"/>
        <div style="text-align: right; margin: 0">
          <el-link type="primary" @click="resetFilter(column)">
            {{ t('button.reset') }}
          </el-link>
          <el-link type="success" style="margin-left: 10px" @click="confirmFilter(column)">
            {{ t('button.filter') }}
          </el-link>
        </div>
        <template #reference>
          <MSvgIcon class="caret-wrapper" icon="down"/>
        </template>
      </el-popover>
    </template>
    <template #default="scope">
      <slot :name="column.prop" :colData="scope.row[column.prop]">
        <span style="height: 23px;display: inline-block;">
          {{ scope.row[column.prop] ? scope.row[column.prop] : "" }}
        </span>
      </slot>
    </template>
  </el-table-column>
</template>
