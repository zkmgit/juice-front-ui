import request from '@/utils/request'
// 获取所有的属性
export function getTableData(data) {
  return request({
    url: '/api/attribute/getAllAttributeList',
    method: 'post',
    data
  })
}
// 新增属性
export function insertAttribute(data) {
  return request({
    url: '/api/attribute/insertAttribute',
    method: 'post',
    data
  })
}
// 编辑属性
export function updateAttribute(data) {
  return request({
    url: '/api/attribute/updateAttribute',
    method: 'put',
    data
  })
}
// 删除属性
export function deleteAttribute(id) {
  return request({
    url: `/api/attribute/deleteAttribute/${id}`,
    method: 'delete'
  })
}
