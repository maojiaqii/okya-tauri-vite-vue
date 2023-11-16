<script lang="ts" setup>
import { perms } from '~/api'
import { useAppStore } from '~/stores/app'
import type { ResponseObject } from '~/types'

const app = useAppStore()

function getButtons() {
  perms.myButtons().then(async (res: ResponseObject) => {
    app.$state.buttons.push(...res.data)
  }).catch((e) => {
  })
}

onMounted(() => {
  getButtons()
})
</script>

<template>
  <el-container>
    <el-header>
      <NavBar />
    </el-header>
    <el-container h="33em">
      <el-aside :width="`${app.menuCollapse ? app.collapseWidth : app.expendWidth}em`">
        <MenuBar />
      </el-aside>
      <el-main>
        <MainView />
      </el-main>
    </el-container>
    <el-footer>
      <FooterBar />
    </el-footer>
  </el-container>
</template>

<style scoped lang="scss">
::v-deep(.el-header) {
  --el-header-padding: 0;
  --el-header-height: 2.4em;
}

::v-deep(.el-footer) {
  --el-footer-padding: 0;
  --el-footer-height: 0.6em;
}

.el-main {
  --el-main-padding: 0em;
}
</style>
