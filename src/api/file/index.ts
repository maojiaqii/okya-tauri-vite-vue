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

export function downLoad(data: object) {
  return axios({
    url: '/file/downLoad',
    method: 'get',
    silence: true,
    data,
    responseType: 'blob',
  })
}

export function downLoadCount(data: object) {
  return axios({
    url: '/file/downLoadCount',
    method: 'get',
    silence: true,
    data,
  })
}
