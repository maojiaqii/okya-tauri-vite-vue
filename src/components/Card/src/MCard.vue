<script lang="ts" setup>
import type { CSSProperties } from 'vue'

const props = defineProps({
  cardHeight: {
    type: [String, Number],
    default: undefined,
  },
  header: {
    type: String,
    default: '',
  },
  shadow: {
    type: String,
    default: 'always',
    validator: (val: string) => ['', 'always', 'never', 'hover'].includes(val),
  },
  bodyClass: {
    type: String,
    default: '',
  },
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
    default: { padding: '10px' },
  },
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
