import request from '@/utils/request'

export function day(data) {
    return request({
        url: '/rate/day-rate',
        data
    })
}
