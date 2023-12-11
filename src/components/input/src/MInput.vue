<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
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
   * @description 控件类型
   */
  type: {
    type: String,
    default: 'text',
    validator: (val: string) => ['text', 'textarea', 'password'].includes(val),
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
   * @description 是否可以被清空
   */
  clearable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 自动高度
   */
  autosize: {
    type: [Object, Boolean],
    // eslint-disable-next-line vue/require-valid-default-prop
    default: { minRows: 2, maxRows: 2 },
  },
  /**
   * @description 最小长度
   */
  minLength: {
    type: Number,
    default: undefined,
  },
  /**
   * @description 最大长度
   */
  maxLength: {
    type: Number,
    default: undefined,
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
    <el-input
      v-model="childValue"
      :size="size"
      :type="type"
      :disabled="disabled"
      :placeholder="placeholder ? placeholder : t('component.placeholder_input')"
      @change="changeEvent">
      <template v-if="$slots.suffix" #suffix>
        <slot name="suffix" />
      </template>
      <template v-if="$slots.prefix" #prefix>
        <slot name="prefix" />
      </template>
      <template v-if="$slots.prepend" #prepend>
        <slot name="prepend" />
      </template>
      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </el-input>
</template>
