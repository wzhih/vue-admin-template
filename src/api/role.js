import request from '@/utils/request'

export function index(data) {
    return request({
        url: '/role/index',
        data
    })
}

export function add(data) {
    return request({
        url: '/role/add',
        data
    })
}

export function update(data) {
    return request({
        url: '/role/update',
        data
    })
}

export function del(data) {
    return request({
        url: '/role/delete',
        data
    })
}

export function show(data) {
    return request({
        url: '/role/show',
        data
    })
}
