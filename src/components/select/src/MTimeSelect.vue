<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
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
   * @description 字符串格式
   */
  format: {
    type: String,
    default: 'HH:mm:ss',
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: undefined,
  },
})
const emits = defineEmits(['update:modelValue', 'change'])
const { t } = useI18n()
const childValue = computed({
  get: () => props.modelValue,
  set: (nv) => {
    emits('update:modelValue', new Date(nv).valueOf())
  },
})
function changeEvent(val: string) {
  emits('change', val)
}
</script>

<template>
  <el-time-picker
    v-model="childValue"
    :size="size"
    :placeholder="placeholder ? placeholder : t('component.placeholder_select_time')"
    :format="format"
    :disabled="disabled"
    @change="changeEvent">
  </el-time-picker>
</template>
