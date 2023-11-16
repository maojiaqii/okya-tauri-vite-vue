<script lang="ts" setup>
import type { Menu } from '~/types'
import router from '~/route'
import { debounce } from '~/utils'
import { useAppStore } from '~/stores/app'

const props = defineProps({
  menu: {
    type: Object as PropType<Menu>,
    required: true,
  },
})

const app = useAppStore()

const {
  locale,
} = useI18n()

const lang = computed(() => {
  return locale.value
})

const handleRoute = debounce((path: string, query: any) => {
  if (query) {
    for (const e in query)
      query[e] = encodeURIComponent(query[e])
  }
  router.push({
    path,
    query,
  })
})
</script>

<template>
  <el-sub-menu v-if="menu.children && menu.children.length >= 1" :index="`${menu.menuId}`">
    <template #title>
      <MSvgIcon :icon="menu.icon" size="1.7em" />
      <span v-if="lang === 'en' && menu.menuNameEn" class="menu-font">{{ menu.menuNameEn }}</span>
      <span v-else class="menu-font">{{ menu.menuName }}</span>
    </template>
    <MenuTree v-for="item in menu.children" :key="item.menuId" :menu="item" />
  </el-sub-menu>
  <el-menu-item v-else :index="`${menu.menuId}`" @click="handleRoute(menu.path, menu.query)">
    <MSvgIcon :icon="menu.icon" size="1.7em" />
    <template #title>
      <span class="menu-font">{{ lang === 'en' && menu.menuNameEn ? menu.menuNameEn : menu.menuName }}</span>
    </template>
  </el-menu-item>
</template>

<style scoped lang="scss">
  .menu-font {
    font-size: 1.5em;
  }
</style>
