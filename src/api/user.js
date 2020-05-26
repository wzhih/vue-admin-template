import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function info(token) {
  return request({
    url: '/login/info'
  })
}

export function index(token) {
  return request({
    url: '/user/index',
    method: 'post',
    params: { token }
  })
}

export function add(data) {
  return request({
    url: '/user/add',
    data
  })
}

