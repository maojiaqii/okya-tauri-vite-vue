<script setup lang="ts">
import { useAppStore } from '~/stores/app'

const props = defineProps({
  containerId: {
    type: String,
    required: true,
    default: undefined,
  },
  modelValue: {
    type: [String, Number, Array, Object],
    default: undefined,
  },
})
const userStore = useAppStore()
const {
  locale,
} = useI18n()

onMounted(() => {
  window.luckysheet.create({
    lang: locale.value,
    container: props.containerId,
    showinfobar: false,
    data: [
      {
        name: 'Sheet1', // 工作表名称
        row: 36, // 行数
        column: 18, // 列数
        celldata: [], // 初始化使用的单元格数据
      },
    ],
  })
})
</script>

<template>
  <div :id="containerId" style="height: 1000px;" />
</template>

<style lang="scss">
.luckysheet-cols-menu {
  z-index: 9004;
}
.luckysheet-input-box {
  z-index:3000
}
</style>
