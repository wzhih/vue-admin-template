import request from '@/utils/request'

export function login(data) {
    return request({
        url: '/login/login',
        method: 'post',
        data
    })
}

export function info() {
    return request({
        url: '/login/info'
    })
}

export function index(data) {
    return request({
        url: '/user/index',
        method: 'post',
        data
    })
}

export function add(data) {
    return request({
        url: '/user/add',
        data
    })
}

export function update(data) {
    return request({
        url: '/user/update',
        data
    })
}

export function del(data) {
    return request({
        url: '/user/delete',
        data
    })
}

export function show(data) {
    return request({
        url: '/user/show',
        data
    })
}
