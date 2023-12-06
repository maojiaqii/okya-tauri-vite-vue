import SparkMD5 from 'spark-md5'
import screenfull from 'screenfull'
import type { Menu, RouteObject } from '~/types'

Date.prototype.format = function (fmt) {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length))

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
  }
  return fmt
}

function enCodePwd(data: object) {
  if (data && Object.keys(data).length !== 0) {
    for (const key in data) {
      if (key.toLowerCase().includes('password'))
        data[key] = new SparkMD5().append(data[key]).end()
    }
  }
}

function handleIsTauri() {
  return Boolean(
    typeof window !== 'undefined'
    && window !== undefined
    && window.__TAURI_IPC__ !== undefined,
  )
}

// 防抖：直到用户做完事情后才处理用户最后一次提交的事件
// 相当于触发则进入等待重新定时直到事件最后一次触发然后再等时间有没有到，才把这定时器清除
function debounce(fn: any, flag = true, delay = 300) {
  if (!flag)
    return fn
  let timeoutId
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-invalid-this
    const _self = this
    // eslint-disable-next-line prefer-rest-params
    const _args = arguments
    if (timeoutId)
      clearTimeout(timeoutId)

    timeoutId = setTimeout(() => fn.apply(_self, _args), delay)
  }
}

// 节流：用户一直在做事，但每次间隔一段时间才触发这件事，常见在滚动时加载的事件
// 相当于只在特定时间内只执行一次事件，在特定时间内，再实行这个事件是无效的，直到设置的时间过了后，才执行下一次，然后再在下一次的时间段内怎么执行事件都无效
function throttle(fn: any, flag = true, delay = 300) {
  flag = flag === undefined ? true : flag
  delay = delay === undefined ? 300 : delay
  if (!flag)
    return fn
  let valid = true
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias,@typescript-eslint/no-invalid-this
    const _self = this
    // eslint-disable-next-line prefer-rest-params
    const _args = arguments
    if (!valid)
      return false
    valid = false
    setTimeout(() => {
      fn.apply(_self, _args)
      valid = true
    }, delay)
  }
}

function handleMenuTree(dataList: Array<Menu>, parentId: number, breadcrumb: string, breadcrumbEn: string) {
  if (dataList.length === 0)
    return dataList
  if (!parentId)
    parentId = 0
  const newDataList = []
  for (const data of dataList) {
    if (parentId === data.parentId) {
      data.breadcrumb = `${breadcrumb === '' ? data.menuName : `${breadcrumb}  >  ${data.menuName}`}`
      data.breadcrumbEn = `${breadcrumbEn === '' ? data.menuNameEn : `${breadcrumbEn}  >  ${data.menuNameEn}`}`
      data.children = handleMenuTree(dataList, data.menuId, data.breadcrumb, data.breadcrumbEn)
      newDataList.push(data)
    }
  }
  return newDataList
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
async function createRoutes(menuList: Menu[], routes: Array<RouteObject>): Promise<Array<RouteObject>> {
  const allComponents = import.meta.glob('~/pages/**/**.vue')
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].component) {
      const cp = allComponents[`/src/pages${menuList[i].component}.vue`]
      if (cp) {
        // 创建路由配置
        const route: RouteObject = {
          path: menuList[i].path,
          component: null,
          name: menuList[i].menuId.toString(),
          meta: {
            requireAuth: true,
            query: menuList[i].query,
            title: menuList[i].menuName,
            titleEn: menuList[i].menuNameEn,
            breadcrumb: menuList[i].breadcrumb,
            breadcrumbEn: menuList[i].breadcrumbEn,
            tabClosable: menuList[i].menuId > 0,
            iframe: menuList[i].isFrame,
            icon: menuList[i].icon,
          },
        }
        route.component = cp
        routes.push(route)
      }
    }
  }
  return routes
}

// 封装：整个页面、元素切换全屏
function useScreenfullEffect() {
  const isFullScreenTag = ref(false)
  // 检测当前页面是否全屏，如果是全屏就退出，否则就全屏
  const handleFullScreen = (element?) => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.toggle()
        isFullScreenTag.value = false
      }
      else {
        // 进入全屏
        screenfull.request(element)
        isFullScreenTag.value = true
      }
    }
    else {
      alert('提示：不支持切换全屏。')
    }
  }
  return { isFullScreenTag, handleFullScreen }
}

export {
  enCodePwd,
  handleIsTauri,
  debounce,
  throttle,
  handleMenuTree,
  createRoutes,
  useScreenfullEffect,
}
