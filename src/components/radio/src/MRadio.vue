<script lang="ts" setup>
import type { ValabelObject } from '~/types'

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description 选项集
   */
  options: {
    type: Array < ValabelObject >,
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
   * @description 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示空值选项
   */
  showBlank: {
    type: Boolean,
    default: true,
  },
})
const emits = defineEmits(['change', 'update:modelValue'])

const selectedValue = computed({
  get: () => {
    return props.modelValue
  },
  set: (nv) => {
    emits('update:modelValue', nv)
  },
})

function changeEvent(val: any) {
  emits('change', val)
}
</script>

<template>
  <el-radio-group v-model="selectedValue" :size="size" :disabled="disabled" @change="changeEvent">
    <el-radio v-for="item in options" :key="item.value"
              :label="item.value"
    >{{ item.label }}
    </el-radio>
    <el-radio v-if="showBlank" label="">空</el-radio>
  </el-radio-group>
</template>
