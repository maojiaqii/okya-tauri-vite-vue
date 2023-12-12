<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
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
  disabled: Boolean,
  /**
   * @description 满分值
   */
  max: {
    type: Number,
    default: 5,
  },
  /**
   * @description 允许半选
   */
  allowHalf: Boolean,
})
const emits = defineEmits(['update:modelValue', 'change'])
const childValue = computed({
  get: () => props.modelValue,
  set: (nv) => {
    emits('update:modelValue', nv)
  },
})
function changeEvent(val: string) {
  emits('change', val)
}
</script>

<template>
  <el-rate
    v-model="childValue"
    :disabled="disabled"
    :size="size"
    show-score
    :allow-half="allowHalf"
    clearable
    :max="max"
    text-color="#ff9900"
    @change="changeEvent"
  />
</template>
