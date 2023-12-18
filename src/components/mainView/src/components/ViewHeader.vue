<script lang="ts" setup>
import { clickOutside } from '~/directive'
import { useAppStore } from '~/stores/app'
import router from '~/route'

const vClickOutside = clickOutside

const {
  t,
  locale,
} = useI18n()

const lang = computed(() => {
  return locale.value
})
const app = useAppStore()

const scrollbar = ref()
const rightClickTab = ref('')
const contextMenuLeft = ref('0px')
const contextMenuTop = ref('0px')
const contextMenuOpacity = ref(0)
const contextMenuZIndex = ref(-999)

function scrollBarWheel(e: WheelEvent) {
  const wheelDelta = e.wheelDelta || -e.deltaY
  const scrollBar = scrollbar.value
  if (scrollBar.wrap$)
    scrollBar.setScrollLeft(scrollBar.wrap$.scrollLeft - wheelDelta * 0.1)
}

// tab标签点击时，切换相应的路由
function tabClick(tab: any) {
  router.push({
    path: tab.path,
  })
};

// 移除tab标签
function tabRemove(tab: any) {
  ElMessageBox.confirm(t('message.closeTab'), t('message.remind'), {
    type: 'warning',
  }).then(() => {
    app.removeTab(tab.path)
    router.push({
      path: app.$state.keepAliveNames.slice(-1)[0],
    })
  }).catch(() => {
  })
}

// 移除tab标签
function closeLeftTabs() {
  ElMessageBox.confirm(t('message.closeLeftTab'), t('message.remind'), {
    type: 'warning',
  }).then(() => {
    app.removeLeftTab(rightClickTab.value)
    router.push({
      path: rightClickTab.value,
    })
  }).catch(() => {
  })
}

// 移除tab标签
function closeRightTabs() {
  ElMessageBox.confirm(t('message.closeRightTab'), t('message.remind'), {
    type: 'warning',
  }).then(() => {
    app.removeRightTab(rightClickTab.value)
    router.push({
      path: rightClickTab.value,
    })
  }).catch(() => {
  })
}

// 移除tab标签
function closeOtherTabs() {
  ElMessageBox.confirm(t('message.closeOtherTab'), t('message.remind'), {
    type: 'warning',
  }).then(() => {
    app.removeOtherTab(rightClickTab.value)
    router.push({
      path: rightClickTab.value,
    })
  }).catch(() => {
  })
}

// 移除tab标签
function closeAllTabs() {
  ElMessageBox.confirm(t('message.closeAllTab'), t('message.remind'), {
    type: 'warning',
  }).then(() => {
    app.removeAllTab()
    router.push({
      path: app.$state.openedTabs[0].path,
    })
  }).catch(() => {
  })
}

// tab标签右击时
function tabRClick(e: MouseEvent, tab: any) {
  rightClickTab.value = tab.path
  e.preventDefault()
  contextMenuLeft.value = `${e.pageX}px`
  contextMenuTop.value = `${e.pageY}px`
  contextMenuOpacity.value = 1
  contextMenuZIndex.value = 9999
};

function onClickOutside() {
  contextMenuLeft.value = '0px'
  contextMenuTop.value = '0px'
  contextMenuOpacity.value = 0
  contextMenuZIndex.value = -999
  rightClickTab.value = ''
}
</script>

<template>
  <div v-if="app.viewOpenStyle !== 'breadcrumb'" w="99%" h="2em" mt-2 ml-2>
    <el-scrollbar ref="scrollbar" @wheel.passive="scrollBarWheel">
      <div class="flex gap-2">
        <el-tag
          v-for="(item, index) in app.openedTabs"
          :key="item.path"
          :closable="item.meta.tabClosable"
          size="large"
          :type="app.activeTab === item.path ? 'success' : index === 0 ? 'danger' : 'info'"
          :effect="app.activeTab === item.path ? 'dark' : 'plain'"
          @click="tabClick(item)"
          @close="tabRemove(item)"
          @contextmenu="(e) => tabRClick(e, item)"
        >
          <div class="flex">
            <MSvgIcon mr-1 :icon="item.meta.icon" size="1.7em" />
            <span class="tab-font">{{ lang === 'en' && item.meta.titleEn ? item.meta.titleEn : item.meta.title }}</span>
          </div>
        </el-tag>
      </div>
    </el-scrollbar>
    <ul v-click-outside="onClickOutside" class="context_menu">
      <li @click="closeLeftTabs"><MSvgIcon mr-1 icon="left" />{{t('button.close_left')}}</li>
      <li @click="closeRightTabs"><MSvgIcon mr-1 icon="right" />{{t('button.close_right')}}</li>
      <li @click="closeOtherTabs"><MSvgIcon mr-1 icon="delete" />{{t('button.close_others')}}</li>
      <li @click="closeAllTabs"><MSvgIcon mr-1 icon="clear" />{{t('button.close_all')}}</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .tab-font {
    font-size: 1.3em;
    line-height: 1.5em;
  }

  .context_menu {
    font-size: 0.6em;
    line-height: 1.2em;
    width: auto;
    padding: 0.3em;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.09);
    position: absolute;
    left: v-bind(contextMenuLeft);
    top: v-bind(contextMenuTop);
    z-index: v-bind(contextMenuZIndex);
    opacity: v-bind(contextMenuOpacity);

    li {
      display: flex;
      justify-content: left;
      align-items: center;
      list-style-type: none;
      padding: 0.1em;
      background-color: var(--c-bg);
      border-radius: 4px;
      cursor: pointer;
    }

    li:hover {
      background-color: cornflowerblue;
      color: #fff;
    }
  }
</style>
