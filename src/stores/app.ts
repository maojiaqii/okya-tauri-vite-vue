import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', {
  state: () => {
    const ratio = ref(1)
    const appWindow = ref(false)
    const viewTransition = ref(false)
    const lang = ref('zh')
    const loading = ref(false)
    const menuMode = ref('vertical')
    const menuCollapse = ref(false)
    const expendWidth = 15
    const collapseWidth = 3.2
    // tabs/breadcrumb
    const viewOpenStyle = ref('breadcrumb')
    // el-fade-in-linear 、el-fade-in、el-zoom-in-center、el-zoom-in-top、el-zoom-in-bottom
    const transition = ref('')
    const refreshed = ref(false)
    const openedTabs = ref([])
    const keepAliveNames = ref([])
    const activeTab = ref('')
    const buttons = ref([])

    return {
      appWindow,
      lang,
      viewTransition,
      loading,
      menuMode,
      menuCollapse,
      expendWidth,
      collapseWidth,
      viewOpenStyle,
      refreshed,
      openedTabs,
      keepAliveNames,
      activeTab,
      buttons,
      ratio,
      transition,
    }
  },
  actions: {
    refreshWindow() {
      this.refreshed = true
      this.activeTab = ''
      this.openedTabs.length = 0
      this.keepAliveNames.length = 0
      this.buttons.length = 0
    },
    setLang(lang: string) {
      this.lang = lang
      localStorage.setItem('lang', lang)
    },
    addTabView(to: any) {
      this.openedTabs.push(to)
      this.keepAliveNames.push(to.path)
    },
    removeTab(path: string) {
      const index = this.keepAliveNames.indexOf(path)
      this.openedTabs.splice(index, 1)
      this.keepAliveNames.splice(index, 1)
    },
    removeLeftTab(path: string) {
      const index = this.keepAliveNames.indexOf(path)
      this.openedTabs.splice(1, index - 1)
      this.keepAliveNames.splice(1, index - 1)
    },
    removeRightTab(path: string) {
      const index = this.keepAliveNames.indexOf(path)
      const length = this.keepAliveNames.length
      this.openedTabs.splice(index + 1, length - index - 1)
      this.keepAliveNames.splice(index + 1, length - index - 1)
    },
    removeOtherTab(path: string) {
      const index = this.keepAliveNames.indexOf(path)
      this.openedTabs.splice(1, index - 1)
      this.keepAliveNames.splice(1, index - 1)
      const length = this.keepAliveNames.length
      this.openedTabs.splice(2, length - 2)
      this.keepAliveNames.splice(2, length - 2)
    },
    removeAllTab() {
      const length = this.keepAliveNames.length
      this.openedTabs.splice(1, length - 1)
      this.keepAliveNames.splice(1, length - 1)
    },
  },
  persist: {
    enabled: true,
    // 自定义持久化参数
    /* strategies: [
      {
        // 自定义key
        key: 'Userinfo',
        // 自定义存储方式，默认sessionStorage
        storage: localStorage,
        // 指定要持久化的数据，默认所有 state 都会进行缓存，可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
        paths: ['userinfoData'],
      },
    ], */
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
