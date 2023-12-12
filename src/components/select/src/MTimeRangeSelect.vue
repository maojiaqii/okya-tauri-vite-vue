<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Array<string | number>,
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
   * @description 开始时间的占位内容
   */
  startPlaceholder: {
    type: String,
    default: undefined,
  },
  /**
   * @description 结束时间的占位内容
   */
  endPlaceholder: {
    type: String,
    default: undefined,
  },
})
const emits = defineEmits(['update:modelValue', 'change'])
const { t } = useI18n()
const childValue = computed({
  get: () => props.modelValue,
  set: (nv) => {
    console.log(nv)
    emits('update:modelValue', [new Date(nv[0]).valueOf(), new Date(nv[1]).valueOf()])
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
    is-range
    :start-placeholder="startPlaceholder ? startPlaceholder : t('component.placeholder_select_time')"
    :end-placeholder="endPlaceholder ? endPlaceholder : t('component.placeholder_select_time')"
    :format="format"
    :disabled="disabled"
    @change="changeEvent"
  />
</template>
