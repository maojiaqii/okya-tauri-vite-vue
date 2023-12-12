<script lang="ts" setup>
import type { CSSProperties } from 'vue'

const props = defineProps({
  /**
   * @description html内容
   */
  content: {
    type: String,
    default: undefined,
  },
  /**
   * @description 自定义样式
   */
  style: {
    type: Object as PropType<CSSProperties>,
  },
})
</script>

<template>
  <div :style="style" v-html="content" />
</template>
