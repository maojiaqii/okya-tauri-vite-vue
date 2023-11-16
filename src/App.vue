<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useAppStore } from '~/stores/app'

const { t } = useI18n()
const userStore = useAppStore()
const locale = computed(() => {
  return userStore.$state.lang === 'en' ? en : zhCn
})

const width = ref(1536)
const height = ref(731)
const currentRatio = ref(1)

function updateScaleRatio() {
  const newWidth = document.documentElement.clientWidth
  const newHeight = document.documentElement.clientHeight
  const ratio = newWidth / newHeight
  const innerRatio = width.value / height.value
  const scaleWidthRatio = newWidth / width.value
  const scaleHeightRatio = newHeight / height.value
  if (ratio < innerRatio)
    currentRatio.value = scaleWidthRatio
  else
    currentRatio.value = scaleHeightRatio
  userStore.ratio = currentRatio.value
  document.getElementById('app').style.width = `${width.value}px`
  document.getElementById('app').style.height = `${height.value}px`
  document.getElementById('app').style.transform = `scale(${currentRatio.value})`
  document.getElementById('app').style.transformOrigin = 'top left'
}

onMounted(() => {
  updateScaleRatio()
  window.addEventListener('resize', () => {
    updateScaleRatio()
  })
  window.addEventListener('keydown', (event: any) => {
    // 禁掉F11的全屏的默认事件,不会禁止F11的退出全屏
    const e = event || window.event
    if (e && e.keyCode === 122)
      e.preventDefault()
  })
  if (window.performance.getEntriesByType('navigation')[0].type === 'reload')
    userStore.refreshWindow()
})
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
  <!-- 动画节点 -->
  <transition name="el-fade-in-linear">
    <div v-show="userStore.loading" id="loading-mask">
      <div class="loading-wrapper">
        <span class="loading-dot loading-dot-spin"><i /><i /><i /><i /></span>
        <br>
        <span class="load_title">{{ t('message.loading') }}</span>
      </div>
    </div>
  </transition>
</template>
