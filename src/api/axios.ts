// 二次封装 axios 模块，包含拦截器等信息
import type { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import i18n from '~/modules/i18n'
import router from '~/route'
import { useAppStore } from '~/stores/app'
import { enCodePwd } from '~/utils'

const config: AxiosRequestConfig<any> = {
  // 基础url前缀
  baseURL: `${!location.origin.includes('tauri.localhost') ? '' : process.env.__NGINX_URL__}/api`,
  // 请求头
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 30000,
  // 携带凭证
  withCredentials: true,
}

// 是否静默请求
config.silence = false

const api = axios.create(config)
const t = i18n.global.t
let reqCount = 0
// request 拦截器
api.interceptors.request.use(
  (config) => {
    const userStore = useAppStore()
    if (!config.silence) {
      reqCount++
      userStore.$state.loading = true
    }
    const token = sessionStorage.getItem('token')
    // 2. 带上token
    if (token)
      config.headers.Authorization = token

    config.headers.timestamp = new Date().getTime().toString()
    enCodePwd(config.data)
    // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    if (config.method.toLowerCase() === 'post') {
      if (config.data) {
        config.data = JSON.stringify(config.data)
        config.headers.sign = bcrypt.hashSync(config.headers.timestamp + config.data)
      }
      else {
        config.headers.sign = bcrypt.hashSync(config.headers.timestamp)
      }
    }
    else {
      if (config.data) {
        config.params = config.data
        config.paramsSerializer = params => qs.stringify(params)
        config.data = {}
      }
    }
    return config
  },
)

// response 拦截器
api.interceptors.response.use(
  (response) => {
    const userStore = useAppStore()
    if (!config.silence)
      reqCount--
    if (reqCount <= 0) {
      reqCount = 0
      userStore.$state.loading = false
    }
    const token = response.headers.authorization || response.data.token
    if (token)
      sessionStorage.setItem('token', token)
    const code = response.data.code
    if (code !== 200) {
      ElMessage.error({
        dangerouslyUseHTMLString: true,
        message: `<p><b>${t('message.errorCode')}</b>${code}</p><p style="margin-top: 0.2rem"><b>${t('message.errorMsg')}</b>${response.data.msg}</p>`,
      })
    }
    return Promise.resolve(response.data)
  },
  (err) => {
    console.log(err)
    ElMessage.error({
      dangerouslyUseHTMLString: true,
      message: `<p><b>${t('message.errorCode')}</b>${err.response.status}</p><p style="margin-top: 0.2rem"><b>${t('message.errorMsg')}</b>${err.response.statusText}</p>`,
    })
    const userStore = useAppStore()
    if (!config.silence)
      reqCount--
    if (reqCount <= 0) {
      reqCount = 0
      userStore.$state.loading = false
    }
    // token过期自动路由到登录页面
    if (err.response.data.message.includes('Token')) {
      router.push({
        path: '/',
      })
    }
    return Promise.reject(err)
  },
)

export default api
