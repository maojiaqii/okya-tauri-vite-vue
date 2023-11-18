<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
  type: {
    type: String,
    default: 'text',
    validator: (val: string) => ['text', 'textarea', 'password'].includes(val),
  },
  size: {
    type: String,
    default: 'default',
    validator: (val: string) => ['', 'default', 'small', 'large'].includes(val),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  autosize: {
    type: [Object, Boolean],
    // eslint-disable-next-line vue/require-valid-default-prop
    default: { minRows: 2, maxRows: 2 },
  },
  minLength: {
    type: Number,
    default: undefined,
  },
  maxLength: {
    type: Number,
    default: undefined,
  },
})
const emits = defineEmits(['update:modelValue'])
const { locale, t } = useI18n()
const childValue = computed({
  get: () => props.modelValue,
  set: (nv) => {
    emits('update:modelValue', nv)
  },
})
</script>

<template>
    <el-input-number v-model="childValue"
              :size="size"
              :disabled="disabled"
              :placeholder="placeholder ? placeholder : t('component.placeholder_input')"
              auto-complete="off"
              :clearable="clearable"
              :show-password="type === 'password'"
              :autosize="autosize"
              :minlength="minLength"
              :maxlength="maxLength"
              :show-word-limit="minLength !== undefined || maxLength !== undefined">
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
    </el-input-number>
</template>
