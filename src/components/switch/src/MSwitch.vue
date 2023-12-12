<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  /**
   * @description switch 状态为 on 时的值
   */
  activeValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  /**
   * @description switch 状态为 off 时的值
   */
  inactiveValue: {
    type: [String, Number, Boolean],
    default: false,
  },
  /**
   * @description switch 状态为 on 时的文字描述
   */
  activeText: {
    type: String,
    default: '',
  },
  /**
   * @description switch 状态为 off 时的文字描述
   */
  inactiveText: {
    type: String,
    default: '',
  },
  /**
   * @description 无论图标或文本是否显示在点内，只会呈现文本的第一个字符
   */
  inlinePrompt: {
    type: Boolean,
    default: false,
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
  <el-switch
    v-model="selectedValue"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :active-text="activeText"
    :inactive-text="inactiveText"
    :inline-prompt="inlinePrompt"
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    :disabled="disabled"
    :size="size"
    @change="changeEvent"
  />
</template>
