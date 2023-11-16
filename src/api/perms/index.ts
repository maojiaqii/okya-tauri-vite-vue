import axios from '../axios'

export function myMenus() {
  return axios({
    url: '/perms/myMenus',
    method: 'get',
  })
}

export function myButtons() {
  return axios({
    url: '/perms/myButtons',
    method: 'get',
  })
}
