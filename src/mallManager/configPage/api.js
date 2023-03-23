import request from '@/utils/request'

export function batchCheck(data) {
  return request({
    url: '/api/utils/batchCheck',
    method: 'post',
    data
  })
}
