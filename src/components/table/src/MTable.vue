<script lang="ts" setup>
import {render} from 'vue'
import type {TableColumnCtx, TableInstance} from 'element-plus'
import MTableToolBar from "~/components/table/src/utils/MTableToolBar.vue";
import type {ResponseObject, TableDataObject, TableColumnObject, TableProperties} from "~/types";
import {debounce, randomString, throttle} from "~/utils";

interface Header {
  row: any,
  column: TableColumnCtx<any>,
  rowIndex: number,
  columnIndex: number
}

const props = defineProps({
  data: {
    type: Object as PropType<TableDataObject>,
    default: {
      data: [],
      pageNum: 1,
      count: 0
    },
  },
  /**
   * @description 列信息
   */
  columns: {
    type: Array<TableColumnObject>,
    default: [],
  },
  /**
   * @description 控件尺寸
   */
  size: {
    type: String,
    default: 'small',
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
   * @description 最大高度
   */
  maxHeight: {
    type: Number,
    default: 450
  },
  estimatedRowHeight: {
    type: Number,
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
   * @description 是否显示工具栏
   */
  showToolBar: {
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
  /**
   * @description 是否启用虚拟化表格 默认不启用 当一页数据 >= autoVirtualizedCount，自动启用
   */
  virtualized: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自动启用虚拟化表格的数据条数
   */
  autoVirtualizedCount: {
    type: Number,
    default: 200
  },
})
const emits = defineEmits(['search', 'edit', 'delete', 'sortChange'])
const {t} = useI18n()

const mTable = ref<TableInstance>()
const mTColumn = ref()
const columnsProps = ref(props.columns)
const pageNum = ref<number>(1)
const pageSize = ref(props.pageSizes[0])
const start = ref<number>(0)
const end = ref<number>(20)
let bottomTR: HTMLElement
const selectRowIndex = ref(-1)
const selectCellIndex = ref(-1)
const sorts = ref<any>({})
const filters = ref<any>({})
const tableProps = ref<TableProperties>({
  border: props.border,
  showSum: props.showSum,
  showCheckBox: props.showCheckBox,
  showRowNum: props.showRowNum,
  pagination: props.pagination,
  showOperation: props.showOperation
})

const visibleData = computed(() => {
  let tableData = []
  if (props.data) {
    tableData = props.data.data
    for (let key in filters.value) {
      tableData = tableData.filter((item: any) => {
        return filters.value[key].length > 0 ? filters.value[key].includes(item[key]) : true
      })
    }
  }
  return tableData
})

const loadMore = () => {
  const tableRefs = mTable.value!.$refs;
  let scrollTop = tableRefs.scrollBarRef!.wrapRef.scrollTop
  const selectTbody: HTMLElement = tableRefs.tableBody!.lastElementChild;
  const rowHeight = selectTbody.childNodes[2].clientHeight ? selectTbody.childNodes[2].clientHeight : 24;
  // 此时的开始索引
  start.value = Math.floor(scrollTop / rowHeight);
  if (start.value < 0) start.value = 0;
  // 此时的结束索引
  end.value = Math.round(scrollTop / rowHeight) + 20;
  // 此时的偏移量
  let startOffset = scrollTop - (scrollTop % rowHeight);
  let bh = rowHeight * (visibleData.value.length - end.value) < 0 ? 0 : rowHeight * (visibleData.value.length - end.value)
  selectTbody!.setAttribute('style', `transform: translate3d(0,${startOffset}px,0)`);
  bottomTR.setAttribute('style', `height: ${bh}px;`)
};

watch(() => visibleData.value.length,
    (nv, ov) => {
      nextTick(() => {
        const tableRefs = mTable.value!.$refs;
        if (props.virtualized || nv >= props.autoVirtualizedCount) {
          loadMore()
          tableRefs.bodyWrapper!.addEventListener("scroll", loadMore, true)
        } else {
          start.value = 0
          end.value = nv
          tableRefs.bodyWrapper!.removeEventListener("scroll", loadMore)
        }
      })
    }, {
      deep: true,
      immediate: true
    })

const resultData = computed(() => {
  return visibleData.value.slice(start.value, Math.min(end.value, visibleData.value.length))
})

const total = computed(() => {
  if (props.data) {
    return props.data.count
  }
  return 0
})

const getSummaries = (param: any) => {
  const {
    columns,
    data
  } = param;
  const sums: any = [];
  columns.forEach((column: any, index: number) => {
    if (index === 0) {
      sums[index] = props.sumText ? props.sumText : t('component.sum_text');
      return;
    }
    if (column.sum) {
      const values = props.data.data.map((item: any) => Number(item[column.property]));
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
  emits('edit', {
    index: index,
    row: row
  })
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
    emits('delete', {
      params: {"rows": rows},
      callback: callback
    })
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

const sortChange = (column: TableColumnCtx<any>) => {
  if (column.order) {
    sorts.value[column.prop] = column.order
  } else {
    delete sorts.value[column.prop]
  }
  emits('sortChange', sorts.value)
};

const headerCellClass = ({
                           row,
                           column,
                           rowIndex,
                           columnIndex
                         }: Header) => {
  for (const sort in sorts.value) {
    column.property === sort && (column.order = sorts.value[sort])
  }
}

const clearSort = () => {
  for (let key in sorts.value) {
    if (sorts.value.hasOwnProperty(key)) {
      delete sorts.value[key];
    }
  }
  mTable.value!.$el.querySelectorAll(".is-sortable").forEach((item: HTMLElement) => {
    // 移除table表头中的排序样式descending和ascending
    item.classList.remove("descending");
    item.classList.remove("ascending");
  });
  emits('sortChange', sorts.value)
}

const filterData = (param: any) => {
  const {
    column,
    callBack
  } = param;
  let fData: any[] = [];
  if (props.data.data) {
    props.data.data.forEach((v: any) => {
      fData.includes(v[column.prop]) || fData.push(v[column.prop])
    })
  }
  for (const i in fData) {
    fData[i] = {
      label: fData[i],
      value: fData[i]
    }
  }
  callBack(fData)
}

const filterHandler = (param: any) => {
  const {
    value,
    column
  } = param;
  filters.value[column] = value
  mTable.value?.$refs.scrollBarRef?.setScrollTop(0)
}

const clearFilter = () => {
  mTColumn.value.forEach((item: any) => {
    item.$refs.filterRef?.setCheckedKeys([])
  })
  filters.value = {}
  mTable.value?.$refs.scrollBarRef?.setScrollTop(0)
}

onMounted(() => {
  bottomTR = document.createElement('tr')
  bottomTR.setAttribute('class', 'bottomTR')
  bottomTR.setAttribute('style', `height: 0px`)
  mTable.value!.$refs.tableBody!.lastElementChild.append(bottomTR)
})
</script>

<template>
  <MTableToolBar v-show="showToolBar"
                 v-model="tableProps"
                 @clear-filter="clearFilter"
                 @clear-sort="clearSort"
  />
  <el-table ref="mTable"
            :border="tableProps.border"
            :data="resultData"
            :default-expand-all="expandAll"
            :show-summary="tableProps.showSum"
            :summary-method="getSummaries"
            :max-height="maxHeight"
            :size="size"
            style="width: 99%"
            stripe
            highlight-current-row
            :tree-props="{children: 'children'}"
            :header-cell-class-name="headerCellClass"
            @sort-change="sortChange"
            @header-contextmenu="(column, event) => event.preventDefault()"
  >
    <template #empty>
      <el-empty/>
    </template>
    <el-table-column align="center" type="selection" width="40" v-if="tableProps.showCheckBox"/>
    <el-table-column align="center" :label="t('component.index_text')" width="65" v-if="tableProps.showRowNum">
      <template #default="scope">
        <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 + start }}</span>
      </template>
    </el-table-column>
    <m-table-column v-for="(column, key) in columnsProps"
                    ref="mTColumn"
                    :column="column"
                    :key="key"
                    :selectRowIndex="selectRowIndex"
                    :selectCellIndex="selectCellIndex"
                    :allEditable="allEditable"
                    @filterData="filterData"
                    @filterHandler="filterHandler"
    >
      <template v-slot:[column.prop]="slotProps">
        <slot :name="column.prop" v-bind:colData="slotProps.colData"/>
      </template>
    </m-table-column>
    <el-table-column :label="t('component.operation_text')"
                     align="center"
                     width="180"
                     fixed="right"
                     v-if="tableProps.showOperation"
    >
      <template #default="scope">
        <div class="table-operation">
          <MButton :name="props.editTip ? props.editTip : t('button.edit')"
                   :icon="editIcon"
                   :perms="permsEdit"
                   :size="size"
                   @click="handleEdit(scope.$index, scope.row)"
                   circle
                   plain
          />
          <MButton :name="props.deleteTip ? props.deleteTip : t('button.delete')"
                   :icon="deleteIcon"
                   :perms="permsDelete"
                   :size="size"
                   type="danger"
                   @click="handleDelete(scope.$index, scope.row)"
                   circle
                   plain
          />
          <slot name="customizeOperation" v-bind:rowData="scope"/>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="tableProps.pagination"
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

<style scoped lang="scss">
::v-deep(.el-table__column-filter-trigger) {
  display: none !important;
}

.table-operation {
  display: flex;
  justify-content: center;
  flex-flow: row wrap
}

.table-operation > * {
  margin-right: 10px;
}

.table-operation > *:last-child {
  margin-right: 0;
}
</style>
