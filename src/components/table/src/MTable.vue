<script lang="ts" setup>
import {ElTable} from "element-plus";
import type { ResponseObject, TableDataObject } from "~/types";

const {t} = useI18n()

const props = defineProps({
  data: {
    type: Object as PropType<TableDataObject>,
    default: undefined,
  },
  /**
   * @description 列信息
   */
  columns: {
    type: Array,
    default: [],
  },
  /**
   * @description 控件尺寸
   */
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
  /**
   * @description 显示边框
   */
  border: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
   */
  expandAll: {
    type: Boolean,
    default: false
  },
  /**
   * @description 行高
   */
  rowHeight: {
    type: Number,
    default: 30,
  },
  /**
   * @description 最大高度
   */
  maxHeight: {
    type: Number,
    default: 450
  },
  /**
   * @description 显示合计行
   */
  showSum: {
    type: Boolean,
    default: false
  },
  /**
   * @description 显示摘要行第一列的文本
   */
  sumText: {
    type: String,
    default: ''
  },
  /**
   * @description 显示复选框
   */
  showCheckBox: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否分页
   */
  pagination: {
    type: Boolean,
    default: true
  },
  /**
   * @description 显示行号
   */
  showRowNum: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示操作列
   */
  showOperation: {
    type: Boolean,
    default: true
  },
  /**
   * @description 每页显示条数集合
   */
  pageSizes: {
    type: Array as PropType<unknown | number>,
    default: [20, 50, 100, 200, 500, 1000]
  },
  /**
   * @description 编辑按钮提示
   */
  editTip: {
    type: String,
    default: ''
  },
  /**
   * @description 删除按钮提示
   */
  deleteTip: {
    type: String,
    default: ''
  },
  /**
   * @description 编辑按钮图标
   */
  editIcon: {
    type: String,
    default: "edit"
  },
  /**
   * @description 删除按钮图标
   */
  deleteIcon: {
    type: String,
    default: "delete"
  },
  /**
   * @description 编辑权限标识
   */
  permsEdit: String,
  /**
   * @description 删除权限标识
   */
  permsDelete: String,
  /**
   * @description 是否可编辑表格
   */
  editable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 可编辑表格全部可编辑
   */
  allEditable: {
    type: Boolean,
    default: false
  },
})
const emits = defineEmits(['edit', 'delete'])

const mTable = ref<InstanceType<typeof ElTable>>()
const borderProp = ref(props.border)
const columnsProps = ref(props.columns)
const showSumProp = ref(props.showSum)
const showCheckBoxProp = ref(props.showCheckBox)
const showRowNumProp = ref(props.showRowNum)
const paginationProp = ref(props.pagination)
const showOperationProp = ref(props.showOperation)
const pageNum = ref<number>(1)
const pageSize = ref(props.pageSizes[0])
const start = ref<number>(0)
const selectRowIndex = ref(-1)
const selectCellIndex = ref(-1)

const visibleData = computed(() => {
  if (props.data) {
    return props.data.data
  }
  return []
})

const total = computed(() => {
  if (props.data) {
    return props.data.count
  }
  return 0
})

const emptyImage = new URL('../images/empty.svg', import.meta.url).href;

const getSummaries = (param: any) => {
  const {columns, data} = param;
  const sums: any = [];
  columns.forEach((column: any, index: number) => {
    if (index === 0) {
      sums[index] = props.sumText ? props.sumText : t('component.sum_text');
      return;
    }
    if (column.sum) {
      const values = data.map((item: any) => Number(item[column.property]));
      if (!values.every((value: number) => isNaN(value))) {
        sums[index] = values.reduce((prev: number, curr: number) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
      }
    }
  });
  return sums;
};

const handleEdit = (index: number, row: any) => {
  emits('edit', {index: index, row: row})
};

const deleteRows = (rows: Array<any>) => {
  ElMessageBox.confirm(t(`${props.deleteTip ? props.deleteTip : t('button.delete')} ${t('message.deleteTableRows')}`), t('message.remind'), {
    type: 'warning',
  }).then(() => {
    let callback = (res: ResponseObject) => {
      if (res.code === 200) {
        ElMessage.success(res.msg)
        // findPage()
      }
    };
    emits('delete', {params: {"rows": rows}, callback: callback})
  }).catch(() => {
  })
};

const handleDelete = (index: number, row: any) => {
  deleteRows([row])
};

// 页数刷新
const refreshPageNo = (pageNumN: number) => {
  pageNum.value = pageNumN;
  // findPage();
  mTable.value?.$refs.scrollBarRef?.setScrollTop(0)
};
// 行数刷新
const refreshPageSize = (pageSizeN: number) => {
  pageSize.value = pageSizeN;
  pageNum.value = 1;
  // findPage();
  mTable.value?.$refs.scrollBarRef?.setScrollTop(0)
};
</script>

<template>
  <div>表格上方操作按钮组</div>
  <el-table ref="mTable"
            :border="borderProp"
            :data="visibleData"
            :default-expand-all="expandAll"
            :show-summary="showSumProp"
            :summary-method="getSummaries"
            :max-height="maxHeight"
            :size="size"
            style="width: 99%"
            stripe
            highlight-current-row
            :tree-props="{children: 'children'}"
            @header-contextmenu="(column, event) => event.preventDefault()"
  >
    <template #empty>
      <el-empty />
    </template>
    <el-table-column align="center" type="selection" width="40" v-if="showCheckBoxProp"/>
    <el-table-column align="center" :label="t('component.index_text')" width="65" v-if="showRowNumProp">
      <template #default="scope">
        <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 + start }}</span>
      </template>
    </el-table-column>
    <m-table-column v-for="(column, key) in columnsProps"
                    :allData="visibleData"
                    :column="column"
                    :key="key"
                    :selectRowIndex="selectRowIndex"
                    :selectCellIndex="selectCellIndex"
                    :allEditable="allEditable"
    >
      <template v-slot:[column.prop]="slotProps">
        <slot :name="column.prop" v-bind:colData="slotProps.colData"/>
      </template>
    </m-table-column>
    <el-table-column :label="t('component.operation_text')" align="center" width="180" fixed="right" v-if="showOperationProp">
      <template #default="scope">
        <div style="align-items: center;display: flex;justify-content: center;">
          <MButton :name="props.editTip ? props.editTip : t('button.edit')" :icon="editIcon" :perms="permsEdit" :size="size"
                   @click="handleEdit(scope.$index, scope.row)" circle
          />
          <MButton :name="props.deleteTip ? props.deleteTip : t('button.delete')" :icon="deleteIcon" :perms="permsDelete" :size="size" type="danger"
                   @click="handleDelete(scope.$index, scope.row)" circle
          />
          <slot name="customizeOperation" v-bind:rowData="scope"/>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="paginationProp"
                 float-right
                 mr-4
                 mt-2
                 layout="sizes, prev, pager, next, jumper, ->, total"
                 :small="size === 'small'"
                 :page-sizes="pageSizes"
                 :current-page="pageNum"
                 :page-size="pageSize"
                 :total="total"
                 @current-change="refreshPageNo"
                 @size-change="refreshPageSize"
  />
</template>
