<script lang="ts" setup>
import type { ValabelObject } from '~/types'

const props = defineProps({
  modelValue: {
    type: [Array<string>, Array<number>, Array<boolean>],
    default: undefined,
  },
  /**
   * @description 选项集
   */
  options: {
    type: Array<ValabelObject>,
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
   * @description 是否显示全部选项
   */
  showAll: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 可被勾选的 checkbox 的最小数量
   */
  min: {
    type: Number,
    default: 0,
  },
  /**
   * @description 可被勾选的 checkbox 的最大数量
   */
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY,
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

const checkAll = ref(false)
const isIndeterminate = ref(true)
const allValues = ref([])

onMounted(() => {
  for (const obj of props.options) {
    if ('value' in obj) { // 判断对象中是否包含指定键（这里为"name"）
      allValues.value.push(obj.value)
    }
  }
})

function handleCheckAllChange(val: boolean) {
  selectedValue.value = val ? allValues.value : []
  isIndeterminate.value = false
}
function handleCheckedChange(value: string[]) {
  emits('change', value)
  const checkedCount = value.length
  checkAll.value = checkedCount === props.options.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.options.length
}
</script>

<template>
  <div flex>
    <el-checkbox
      style="margin-right: 30px"
      v-if="showAll"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <el-checkbox-group v-model="selectedValue" :disabled="disabled" @change="handleCheckedChange" :min="min" :max="max">
      <el-checkbox v-for="item in options"
                   :key="item.value"
                   :label="item.value"
      >{{ item.label }}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>
