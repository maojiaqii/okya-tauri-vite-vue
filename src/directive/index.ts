import type { Directive, DirectiveBinding } from 'vue'

const clickOutside: Directive = {
  mounted(el: any, binding: DirectiveBinding) {
    function eventHandler(e: any) {
      if (!el.contains(e.target)) {
        // 如果绑定的参数是函数，正常情况也应该是函数，执行
        if (binding.value && typeof binding.value === 'function')
          binding.value(e)
      }
    }

    // @ts-expect-error 用于销毁前注销事件监听
    el.__click_outside__ = eventHandler
    // 添加事件监听
    document.addEventListener('click', eventHandler)
  },
  beforeUnmount(el: any) {
    // @ts-expect-error 移除事件监听
    document.removeEventListener('click', el.__click_outside__)
    // @ts-expect-error 删除无用属性
    delete el.__click_outside__
  },
}

const elSelectLoadMore: Directive = {
  beforeMount(el: any, binding: DirectiveBinding) {
    const selectDom = document.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    function loadMores(this: any) {
      if (!el.contains(this.target)) {
        const isBase = this.scrollHeight - this.scrollTop <= this.clientHeight
        if (isBase)
          binding.value && binding.value()
      }
    }
    el.selectDomInfo = selectDom
    el.userLoadMore = loadMores
    selectDom?.addEventListener('scroll', loadMores)
  },
  beforeUnmount(el: any) {
    if (el.userLoadMore) {
      el.selectDomInfo.removeEventListener('scroll', el.userLoadMore)
      delete el.selectDomInfo
      delete el.userLoadMore
    }
  },
}

export {
  clickOutside,
  elSelectLoadMore,
}
