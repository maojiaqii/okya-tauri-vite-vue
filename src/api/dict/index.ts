import axios from '../axios'
import type { DictObject } from '~/types'

export function data(data: DictObject) {
  return axios({
    url: '/dict/data',
    method: 'get',
    data,
  })
}
