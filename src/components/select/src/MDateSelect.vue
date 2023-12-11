<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: undefined,
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
   * @description 控件类型
   */
  type: {
    type: String,
    default: 'date',
    validator: (val: string) => ['year', 'month', 'date', 'datetime', 'week'].includes(val),
  },
  /**
   * @description 字符串格式
   */
  format: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: undefined,
  },
  /**
   * @description 禁用今天之前、之后、今天
   */
  disabledDate: {
    type: String,
    default: undefined,
    validator: (val: string) => ['', 'before', 'after', 'now'].includes(val),
  },
})
const emits = defineEmits(['update:modelValue', 'change'])
const { t } = useI18n()
const childValue = computed({
  get: () => props.modelValue,
  set: (nv) => {
    emits('update:modelValue', nv)
  },
})
function changeEvent(val: string) {
  emits('change', val)
}
function toggle(time: Date) {
  const t1 = Date.parse(time.toLocaleDateString())
  const t2 = Date.parse(new Date().toLocaleDateString())
  if (props.disabledDate === 'before')
    return t1 < t2
  else if (props.disabledDate === 'after')
    return t1 > t2
  else if (props.disabledDate === 'now')
    return t1 === t2
  else
    return false
}
</script>

<template>
  <el-date-picker
    v-model="childValue"
    :size="size"
    :type="type"
    :format="format"
    :value-format="format"
    :disabled="disabled"
    :placeholder="placeholder ? placeholder : t('component.placeholder_select_date')"
    @change="changeEvent"
    :disabled-date="toggle"
    style="width: 100%;">
  </el-date-picker>
</template>
