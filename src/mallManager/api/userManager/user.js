import request from '@/utils/request'
// 获取所有的用户
export function getTableData(data) {
  return request({
    url: '/api/user/getAllUserList',
    method: 'post',
    data
  })
}
