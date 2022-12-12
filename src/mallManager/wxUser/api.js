import request from '@/utils/request'
// 获取所有的小程序用户
export function getTableData(data) {
  return request({
    url: '/api/wxUser/getAllWxUserList',
    method: 'post',
    data
  })
}
