import request from '@/utils/request'
// 获取所有的用户
export function getTableData(data) {
  return request({
    url: '/api/user/getAllUserList',
    method: 'post',
    data
  })
}
// 新增用户
export function insertUser(data) {
  return request({
    url: '/api/user/insertUser',
    method: 'post',
    data
  })
}
// 编辑用户
export function updateUser(data) {
  return request({
    url: '/api/user/updateUser',
    method: 'put',
    data
  })
}
// 删除用户
export function deleteUser(id) {
  return request({
    url: `/api/user/deleteUser/${id}`,
    method: 'delete'
  })
}
