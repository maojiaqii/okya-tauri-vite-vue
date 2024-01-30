<script lang="ts" setup>
import type { DictObject, ResponseObject } from '~/types'
import { dict } from '~/api'
import { debounce, throttle } from '~/utils'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: undefined,
  },
  /**
   * @description 静态选项内容
   */
  options: {
    type: Array,
    default: undefined,
  },
  /**
   * @description 远程字典代码
   */
  remote: {
    type: String,
    default: undefined,
  },
  /**
   * @description 实际值的字段标志
   */
  valueKey: {
    type: String,
    default: 'id',
  },
  /**
   * @description 显示值的字段标志
   */
  labelKey: {
    type: String,
    default: 'label',
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
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否可过滤
   */
  filterable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否可清空
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否可新建
   */
  allowCreate: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否多选
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否懒加载
   */
  lazy: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 懒加载每次加载条数
   */
  lazyCount: {
    type: Number,
    default: 10,
  },
  /**
   * @description 多选时是否合并选项标志
   */
  collapseTags: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 超过多少选项时合并标志
   */
  maxCollapseTags: {
    type: Number,
    default: 2,
  },
})
const emits = defineEmits(['change', 'update:modelValue', 'optionSelected'])

const { locale, t } = useI18n()
const loadingSpan = ref()
let ob: IntersectionObserver
const optionArray = ref([])
const valueKeyOps = ref(props.valueKey)
const labelKeyOps = ref(props.labelKey)
const filterVal = ref('')
const pageNo = ref(1)
const pageSize = ref(props.lazyCount)
const style = ref('list')
const loadingBottomVisible = ref(props.lazy)

const selectedValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (nv) => {
    emits('update:modelValue', nv)
  },
})

function changeOptionArray() {
  if (props.options) {
    optionArray.value = props.options.filter((item: any) => item[labelKeyOps].includes(filterVal.value))
  }
  else if (props.remote) {
    const params: DictObject = {
      dictCode: props.remote,
      filterValue: filterVal.value,
    }
    if (props.lazy) {
      if (props.modelValue) {
        if (typeof props.modelValue !== 'object') {
          params.selectedIds = undefined
          params.selectedId = selectedValue.value
        }
        else {
          params.selectedId = undefined
          params.selectedIds = selectedValue.value
        }
      }
      params.pageNum = pageNo.value++
      params.pageSize = pageSize.value
    }
    dict.data(params).then((res: ResponseObject) => {
      if (res.code === 200) {
        style.value = res.data.dictStyle
        valueKeyOps.value = res.data.dictValue ? res.data.dictValue : props.valueKey
        labelKeyOps.value = res.data.dictLabel ? res.data.dictLabel : props.labelKey
        if (props.lazy) {
          loadingBottomVisible.value = res.data.data && res.data.data.length !== 0
          for (const item of res.data.data) {
            const index = optionArray.value.findIndex(i => i[valueKeyOps.value] === item[valueKeyOps.value])
            if (index !== -1)
              optionArray.value.splice(index, 1)
            optionArray.value.push(item)
          }
          // 懒加载数据回显
          for (const item of res.data.selectedData) {
            const index = optionArray.value.findIndex(i => i[valueKeyOps.value] === item[valueKeyOps.value])
            if (index === -1)
              optionArray.value.push(item)
          }
        }
        else {
          optionArray.value = res.data
        }
      }
    })
  }
  return []
}

function changeEvent(val: any) {
  emits('change', val)
  if (!props.multiple) {
    if (val)
      emits('optionSelected', optionArray.value.find(i => i[valueKeyOps.value] === val))
    else
      emits('optionSelected', undefined)
  }
  else {
    if (val && val.length > 0) {
      const selected = []
      for (const item of val)
        selected.push(optionArray.value.find(i => i[valueKeyOps.value] === item))
      emits('optionSelected', selected)
    }
    else {
      emits('optionSelected', [])
    }
  }
}

const filterMethod = debounce((val: string) => {
  if (val !== filterVal.value) {
    pageNo.value = 1
    filterVal.value = val
    optionArray.value.length = 0
    changeOptionArray()
  }
})

const loadMore = throttle(() => props.lazy ? changeOptionArray() : {})

watch(() => loadingBottomVisible.value,
  (nv) => {
    nextTick(() => {
      nv && ob && ob.observe(loadingSpan.value)
    })
  })

onMounted(() => {
  if (props.lazy) {
    ob = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting) {
        loadMore()
        !loadingBottomVisible.value && ob && ob.unobserve(entries[0].target)
      }
    }, { root: loadingSpan.value.parentElement.parentElement.parentElement, threshold: 0 })
    ob.observe(loadingSpan.value)
  }
  changeOptionArray()
})
</script>

<template>
  <el-select
    v-model="selectedValue"
    :filterable="allowCreate ? allowCreate : filterable"
    :default-first-option="allowCreate"
    :allow-create="allowCreate"
    :filter-method="filterMethod"
    :placeholder="placeholder ? placeholder : allowCreate ? t('component.placeholder_input_or_select') : t('component.placeholder_select')"
    :collapse-tags="collapseTags"
    collapse-tags-tooltip
    :max-collapse-tags="maxCollapseTags"
    :clearable="clearable"
    :disabled="disabled"
    :multiple="multiple"
    :size="size"
    @change="changeEvent"
  >
    <template v-if="style === 'list'" #default>
      <el-option
        v-for="item in optionArray"
        :key="item[valueKeyOps]"
        :label="locale !== 'zh' && item[`${labelKeyOps}_${locale}`] ? item[`${labelKeyOps}_${locale}`] : item[labelKeyOps]"
        :value="item[valueKeyOps]"
      >
        <slot :item="item">
          <span>{{locale !== 'zh' && item[`${labelKeyOps}_${locale}`] ? item[`${labelKeyOps}_${locale}`] : item[labelKeyOps]}}</span>
        </slot>
      </el-option>
      <el-option
        v-if="loadingBottomVisible"
        style="height: 0.01em"
        value=""
        disabled
      >
        <span ref="loadingSpan" />
      </el-option>
    </template>
  </el-select>
</template>
