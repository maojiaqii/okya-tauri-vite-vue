<script lang="ts" setup>
import type { CSSProperties } from 'vue'

const props = defineProps({
  /**
   * @description 内容可视高度
   */
  cardHeight: {
    type: [String, Number],
    default: undefined,
  },
  /**
   * @description 标题
   */
  header: {
    type: String,
    default: '',
  },
  /**
   * @description 阴影显示类型
   */
  shadow: {
    type: String,
    default: 'always',
    validator: (val: string) => ['', 'always', 'never', 'hover'].includes(val),
  },
  /**
   * @description 内容样式
   */
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
    default: { padding: '10px' },
  },
  /**
   * @description 是否显示标题
   */
  showHeader: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <el-card shadow="hover" :body-style="bodyStyle">
    <template v-if="showHeader" #header>
      <span float-left>{{header}}</span>
      <div float-right>
        <slot name="header" />
      </div>
    </template>
    <el-scrollbar :height="cardHeight">
      <slot />
    </el-scrollbar>
  </el-card>
</template>

<style scoped lang="scss">
 ::v-deep(.el-card__header) {
   overflow: hidden;
   white-space:nowrap;
   text-overflow:ellipsis;
   padding: 10px!important;
 }
</style>
