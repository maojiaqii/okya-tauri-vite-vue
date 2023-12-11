<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  /**
   * @description 占位内容
   */
  placeholder: {
    type: String,
    default: undefined,
  },
  /**
   * @description 是否禁用
   */
  disabled: {
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
   * @description 控件尺寸
   */
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
})
const emits = defineEmits(['update:modelValue'])
const remote = 'sys_icon'
const selectedValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (nv) => {
    emits('update:modelValue', nv)
  },
})
</script>

<template>
  <MSelect
    v-model="selectedValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    :remote="remote"
    :clearable="clearable"
    filterable
    lazy
  >
    <template #default="{ item }">
      <MSvgIcon :icon="item.svg" size="1.5em" float-left mt-1.75/>
      <span mx-2>{{item.svg_name}}</span>
    </template>
  </MSelect>
</template>
