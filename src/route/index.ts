import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '~/stores/app'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('~/pages/Login/index.vue'),
    meta: { requireAuth: false },
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('~/pages/Layout/index.vue'),
    meta: { requireAuth: true },
    // 所有的分类全都是layout的子路由
    children: [],
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('~/pages/Error/error.md'),
    meta: { requireAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 配置前置后置路由导航守卫
router.beforeEach(async (to, from, next) => {
  const app = useAppStore()
  if (app.$state.refreshed) {
    app.$state.refreshed = false
    if (to.path === '/')
      next({ path: '/' })
    else
      next({ path: '/layout' })
  }
  else {
    // 如果需要验证
    if (!to.meta.requireAuth) {
      next()
    }
    else {
      // 登录界面登录成功之后，会把用户信息保存在会话
      // 存在时间为会话生命周期，页面关闭即失效。
      const user = sessionStorage.getItem('user')
      if (!user) {
        // 如果用户会话信息不存在，代表未登录，则跳转到登录界面
        next({ path: '/' })
      }
      else {
        app.$state.viewTransition = false
        setTimeout(() => {
          app.$state.viewTransition = true
        }, 500)
        if (app.$state.viewOpenStyle === 'tabs') {
          // 判断是否刷新页面
          // 判断路由是否已经打开
          // 已经打开的 ，将其置为active
          // 未打开的，将其放入队列里
          let flag = false
          for (const item of app.$state.openedTabs) {
            if (item.path === to.path) {
              flag = true
              break
            }
          }
          if (!flag && to.meta.tabClosable !== undefined)
            app.addTabView(to)
          app.$state.activeTab = to.path
        }
        next()
      }
    }
  }
})

export default router
export { routes }
