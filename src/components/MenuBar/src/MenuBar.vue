<script lang="ts" setup>
import { perms } from '~/api'
import { useAppStore } from '~/stores/app'
import router from '~/route'
import type { ResponseObject, RouteObject } from '~/types'
import { createRoutes, handleMenuTree } from '~/utils'

const {
  t,
} = useI18n()
const app = useAppStore()
const svgIconVisible = ref(false)
const menus = ref([])

const menuButtonLeft = computed(() => {
  return `${(app.menuCollapse ? app.collapseWidth : app.expendWidth) - 1.3}em`
})

function getMenus() {
  perms.myMenus().then(async (res: ResponseObject) => {
    menus.value = handleMenuTree(res.data, 0, '', '')
    createRoutes(res.data, []).then((newRoutes: Array<RouteObject>) => {
      for (const rt of newRoutes)
        router.addRoute('layout', rt)
    })
  }).catch((e) => {
  }).finally(() => {
    router.push('/homePage')
  })
}

function menuCollapse() {
  app.$state.menuCollapse = !app.$state.menuCollapse
  svgIconVisible.value = false
}

function svgIconVisibleChange1() {
  setTimeout(() => {
    svgIconVisible.value = true
  }, 100)
}

function svgIconVisibleChange2() {
  setTimeout(() => {
    svgIconVisible.value = false
  }, 100)
}

onMounted(() => {
  getMenus()
})
</script>

<template>
  <MButton circle @click="menuCollapse" :icon="app.menuCollapse ? 'right' : 'left'" :name="t(app.menuCollapse ? 'button.expend' : 'button.collapse')"
           :style="{ position: 'fixed', zIndex: 99, top: '50%', left: menuButtonLeft, transform: 'translateY(-50%)' }" />
  <el-scrollbar h="full" b-r w="full">
    <el-menu
      :collapse-transition="false"
      unique-opened
      :mode="app.menuMode"
      :collapse="app.menuCollapse"
      @mouseenter="svgIconVisibleChange1"
      @mouseleave="svgIconVisibleChange2"
    >
      <!-- 动态加载菜单 -->
      <MenuTree v-for="item in menus" :key="item.menuId" :menu="item" />
    </el-menu>
  </el-scrollbar>
</template>

<style scoped>
  .el-menu {
    border-right-width: 0!important;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
</style>
