import axios from '../axios'

export function icons(data: any) {
  return axios({
    url: '/data/icons',
    method: 'get',
    data,
  })
}
