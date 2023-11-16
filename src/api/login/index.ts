import axios from '../axios'

export function captchaImage() {
  return axios({
    url: '/ua/login/captchaImage',
    method: 'get',
  })
}

export function userLogin(data: object) {
  return axios({
    url: '/ua/login/userLogin',
    method: 'post',
    data,
  })
}
