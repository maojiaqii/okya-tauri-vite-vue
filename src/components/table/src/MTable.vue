<script lang="ts" setup>
import {ElTable} from "element-plus";
import {PropType} from "vue";
import type {ResponseObject, TableDataObject} from "~/types";

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
  border: Boolean,
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
    default: t('component.sum_text')
  },
  /**
   * @description 显示复选框
   */
  showCheckBox: Boolean,
  /**
   * @description 是否分页
   */
  pagination: Boolean,
  /**
   * @description 显示行号
   */
  showRowNum: Boolean,
  /**
   * @description 是否显示操作列
   */
  showOperation: Boolean,
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
    default: t('button.edit')
  },
  /**
   * @description 删除按钮提示
   */
  deleteTip: {
    type: String,
    default: t('button.delete')
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

const visibleData = computed(() => {
  if (props.data) {
    return props.data.data
  }
  return []
})

const emptyImage = new URL('../images/empty.svg', import.meta.url).href;

const getSummaries = (param: any) => {
  const {columns, data} = param;
  const sums: any = [];
  columns.forEach((column: any, index: number) => {
    if (index === 0) {
      sums[index] = props.sumText;
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
  ElMessageBox.confirm(t(`${props.deleteTip}${t('message.deleteTableRows')}`), t('message.remind'), {
    type: 'warning',
  }).then(() => {
    let callback = (res: ResponseObject) => {
      if (res.code === 200) {
        ElMessage.success(res.message)
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
</script>

<template>
  <div>表格上方操作按钮组</div>
  <el-table ref="mTable"
            :border="borderProp"
            :data="visibleData"
            :default-expand-all="expandAll"
            :row-style="{height: rowHeight + 'px'}"
            :show-summary="showSumProp"
            :summary-method="getSummaries"
            :max-height="maxHeight"
            :size="size"
            width="100%"
            stripe
            highlight-current-row
            :tree-props="{children: 'children'}"
            @header-contextmenu="(column, event) => event.preventDefault()"
  >
    <template #empty>
      <el-image style="width: 100px; height: 100px" :src="emptyImage" fit="cover"/>
    </template>
    <el-table-column align="center" type="selection" width="50" v-if="showCheckBoxProp"/>
    <el-table-column align="center" label="序号" width="50" v-if="showRowNumProp">
      <template #default="scope">
        <span>{{ (pageNum - 1) * pageSize + scope.$index + 1 + start }}</span>
      </template>
    </el-table-column>
    <cus-table-col v-for="(column, key) in columnsProps"
                   :allData="data"
                   :column="column"
                   :key="key"
                   :tableData="visibleData"
    >
      <template v-slot:[column.prop]="slotProps">
        <slot :name="column.prop" v-bind:colData="slotProps.colData"/>
      </template>
    </cus-table-col>
    <el-table-column :label="t('component.operation_text')" align="center" fixed="right" v-if="showOperationProp">
      <template #default="scope">
        <div style="align-items: center;display: flex;justify-content: center;">
          <MButton :name="editTip" :icon="editIcon" :perms="permsEdit" :size="size"
                   @click="handleEdit(scope.$index, scope.row)" circle
          />
          <MButton :name="deleteTip" :icon="deleteIcon" :perms="permsDelete" :size="size" type="danger"
                   @click="handleDelete(scope.$index, scope.row)" circle
          />
          <slot name="customizeOperation" v-bind:rowData="scope"/>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-if="paginationProp" layout="sizes, prev, pager, next, jumper, ->, total, slot"
                 @current-change="refreshPageNo" :small="size === 'small'"
                 @size-change="refreshPageSize" :page-sizes="pageSizes"
                 :current-page="pageNum" :page-size="pageSize" :total="totalCount"
                 style="float:right;">
  </el-pagination>
</template>

<style lang="scss" scoped>

</style>
