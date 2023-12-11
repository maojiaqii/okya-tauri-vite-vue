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
})
const emits = defineEmits(['update:modelValue', 'change'])
const predefine = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
]
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
  <el-color-picker
    v-model="childValue"
    show-alpha
    :disabled="disabled"
    @change="changeEvent"
    :predefine="predefine" />
</template>
