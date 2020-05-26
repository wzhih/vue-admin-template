import request from '@/utils/request'

export function index(data) {
  return request({
    url: '/role/index',
    data
  })
}
