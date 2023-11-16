<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'default',
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
