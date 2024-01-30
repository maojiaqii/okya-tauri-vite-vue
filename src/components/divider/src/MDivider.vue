<script lang="ts" setup>
const props = defineProps({
  /**
   * @description 文本内容（支持html）
   */
  content: {
    type: String,
    default: '',
  },
  /**
   * @description 分割线方向
   */
  direction: {
    type: String,
    default: 'horizontal',
    validator: (val: string) => ['', 'horizontal', 'vertical'].includes(val),
  },
  /**
   * @description 文本内容位置
   */
  contentPosition: {
    type: String,
    default: 'left',
    validator: (val: string) => ['', 'left', 'right', 'center'].includes(val),
  },
})
</script>

<template>
  <el-divider :direction="direction" :content-position="contentPosition"><span v-html="content" /></el-divider>
</template>

<style scoped lang="scss">
.el-divider--horizontal {
  margin: 10px 0;
}
</style>
