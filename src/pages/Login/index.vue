<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { login } from '~/api'
import type { ResponseObject } from '~/types'

const { t } = useI18n()

// 验证码
const captchaImg = ref()
const router = useRouter()

// 点击登陆后校验登陆逻辑，然后登陆
interface loginType {
  uuid: string
  userCode: string
  password: string
  captchaCode: string
}

const loginForm: loginType = reactive({
  uuid: '',
  userCode: 'admin',
  password: '0kya.top!',
  captchaCode: '',
})

onMounted(() => {
  getKaptcha()
})

// 密码输入框不能输入空格
function cantSpace() {
  loginForm.userCode = loginForm.userCode.replaceAll(' ', '')
  loginForm.password = loginForm.password.replaceAll(' ', '')
  loginForm.captchaCode = loginForm.captchaCode.replaceAll(' ', '')
}

async function getKaptcha() {
  login.captchaImage().then((res: ResponseObject) => {
    captchaImg.value = res.img
    if (res.uuid != null)
      loginForm.uuid = res.uuid
  }).catch((e) => {
  })
}

// 登陆行为
async function loginAction() {
  if (loginForm.userCode.length === 0) {
    ElMessage.error({ message: t('login.emptyUserCode') })
    return
  }
  if (loginForm.password.length === 0) {
    ElMessage.error({ message: t('login.emptyPassWord') })
    return
  }
  if (loginForm.captchaCode.length === 0 && captchaImg.value) {
    ElMessage.error({ message: t('login.emptyCaptcha') })
    return
  }
  login.userLogin(loginForm).then((res: ResponseObject) => {
    if (res.code === 200) {
      // 保存用户到本地会话
      sessionStorage.setItem('user', JSON.stringify(res.data))
      ElNotification.success({
        message: `欢迎你,${res.data.asUser.userName}!`,
        duration: 3000,
      })
      nextTick(() => {
        router.push('/layout')
      })
    }
    else {
      if (captchaImg.value)
        getKaptcha()
    }
  }).catch((e) => {
  })
}
</script>

<template>
  <div class="loginWindow">
    <NavBar />
    <div class="container">
      <a href="" target="_blank">
        <img src="../../../src-tauri/icons/icon.png" class="logo">
      </a>
      <form class="form">
        <input
          v-model="loginForm.userCode" class="form__input" type="text" :placeholder="t('login.UserCode')"
          @input="cantSpace" @keydown.enter="loginAction"
        >
        <input
          v-model="loginForm.password" class="form__input" type="passWord"
          :placeholder="t('login.passWord')" @keydown.enter="loginAction" @input="cantSpace"
        >
        <div>
          <input v-model="loginForm.captchaCode" float-left class="form__input_captcha" :placeholder="t('login.captcha')" @keyup.enter="loginAction" @input="cantSpace">
          <img :src="captchaImg" class="form__captcha" :alt="t('login.refreshCaptcha')" @click="getKaptcha">
        </div>
        <MButton :name="t('login.login')" type="primary" round size="large" class="login-btn" @click="loginAction">
        </MButton>
      </form>
    </div>
    <FooterBar />
  </div>
</template>

<style scoped>
@import '../../styles/login.css';
</style>
