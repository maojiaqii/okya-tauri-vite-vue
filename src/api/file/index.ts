import axios from '../axios'

export function merge(data: object) {
  return axios({
    url: '/file/merge',
    method: 'get',
    data,
  })
}
