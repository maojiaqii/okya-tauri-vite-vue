import axios from '../axios'

export function merge(data: object) {
  return axios({
    url: '/file/merge',
    method: 'get',
    data,
  })
}

export function getInfo(data: object) {
  return axios({
    url: '/file/getInfo',
    method: 'get',
    silence: true,
    data,
  })
}
