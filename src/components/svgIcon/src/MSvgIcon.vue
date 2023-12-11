<script lang="ts" setup>
const props = defineProps({
  // SVG 图标名称或在线URL或xml
  icon: {
    type: String,
    required: true,
  },
  // 颜色值
  color: {
    type: String,
    default: '#1296db',
  },
  // 宽高
  size: {
    type: String,
    default: '1.3em',
  },
})

const isOnlineSvg = computed(() => /^(https?:)/.test(props.icon) || /^(http?:)/.test(props.icon))
const isSvgXml = computed(() => /^(<svg ?)/.test(props.icon))
const iColor = computed(() => props.color)
const iSize = computed(() => props.size)
</script>

<template>
  <div v-if="isOnlineSvg"
       :style="{ '--svg-icon-url': `url(${icon})` }"
       class="svg-icon svg-icon-online"/>
  <div v-else-if="isSvgXml"
       class="svg-icon"
       v-html="icon"/>
  <svg v-else
       class="svg-icon"
       aria-hidden="true">
    <use :xlink:href="`#icon-${icon}`"/>
  </svg>
</template>

<style scoped lang="scss">
.svg-icon {
  width: v-bind(iSize);
  height: v-bind(iSize);
  fill: currentColor;
  overflow: hidden;
  color: v-bind(iColor);
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>
