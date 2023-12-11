<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Number,
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
   * @description 最小值
   */
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY,
  },
  /**
   * @description 最大值
   */
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
  },
  /**
   * @description 步长
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 是否只能输入 step 的倍数
   */
  stepStrictly: Boolean,
  /**
   * @description 是否显示控制按钮
   */
  controls: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 控制按钮位置
   */
  controlsPosition: {
    type: String,
    default: 'right',
    values: ['', 'right'],
  },
  /**
   * @description 精度
   */
  precision: {
    type: Number,
    validator: (val: number) =>
      val >= 0 && val === Number.parseInt(`${val}`, 10),
  },
})
const emits = defineEmits(['update:modelValue', 'change'])
const { locale, t } = useI18n()
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
  <el-input-number
    v-model="childValue"
    :size="size"
    :disabled="disabled"
    :placeholder="placeholder ? placeholder : t('component.placeholder_input')"
    :min="min"
    :max="max"
    :step="step"
    :stepStrictly="stepStrictly"
    :controls="controls"
    :controls-position="controlsPosition"
    :precision="precision"
    @change="changeEvent" />
</template>
