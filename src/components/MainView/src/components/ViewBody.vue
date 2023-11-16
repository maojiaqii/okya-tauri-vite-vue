<script lang="ts" setup>
import { h } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { useAppStore } from '~/stores/app'

const app = useAppStore()
const route = useRoute()
const {
  t,
  locale,
} = useI18n()

const cardTopBorder = computed(() => app.viewOpenStyle === 'breadcrumb' ? '0' : '1px')
const cardHeaderBottomBorder = computed(() => app.viewOpenStyle === 'breadcrumb' ? '1px' : '0')
const cardHeight = computed(() => app.viewOpenStyle === 'breadcrumb' ? '29.7em' : '29.5em')
const cardTitle = computed(() => locale.value === 'en' && route.meta.breadcrumbEn ? route.meta.breadcrumbEn : route.meta.breadcrumb)

// 用来存已经创建的组件
const wrapperMap = new Map()
// 将router传个我们的组件重新换一个新的组件，原组件包里面
function formatComponentInstance(component: any, route: any) {
  let wrapper
  if (component) {
    const wrapperName = route.path
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName)
    }
    else {
      wrapper = {
        name: wrapperName,
        render: () => {
          return h(component)
        },
      }
      wrapperMap.set(wrapperName, wrapper)
    }
    return h(wrapper)
  }
}

watch(() => app.$state.keepAliveNames,
  (newValue, oldValue) => {
    oldValue.filter(item => !newValue.includes(item)).forEach((it, index) => {
      wrapperMap.delete(it)
    })
  }, { deep: true })
</script>

<template>
  <div w="full" style="overflow-x: hidden">
    <transition :name="app.transition">
      <MCard v-show="app.viewTransition" :card-height="cardHeight" shadow="hover" :header="cardTitle" :show-header="app.viewOpenStyle === 'breadcrumb'">
        <router-view v-slot="{ Component, route }">
          <keep-alive v-if="app.viewOpenStyle !== 'breadcrumb'" :include="app.keepAliveNames">
            <component :is="formatComponentInstance(Component, route)" :key="route.path" />
          </keep-alive>
          <component v-if="app.viewOpenStyle === 'breadcrumb'" :is="Component" :key="route.path" />
        </router-view>
      </MCard>
    </transition>
  </div>
</template>

<style scoped lang="scss">
::v-deep(.el-card) {
  border-top-width: v-bind(cardTopBorder)!important;
  border-left-width: 0!important;
  border-radius: 0!important;
}

::v-deep(.el-card__header) {
  border-bottom-width: v-bind(cardHeaderBottomBorder)!important;
}
</style>
