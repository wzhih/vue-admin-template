import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/permission/index',
        data
    })
}

export function add(data) {
    return request({
        url: '/permission/add',
        data
    })
}

export function update(data) {
    return request({
        url: '/permission/update',
        data
    })
}

export function del(data) {
    return request({
        url: '/permission/delete',
        data
    })
}

export function show(data) {
    return request({
        url: '/permission/show',
        data
    })
}
