import request from '@/utils/request'
// 获取所有的分类
export function getTableData(data) {
  return request({
    url: '/api/category/getAllCategoryList',
    method: 'post',
    data
  })
}
// 新增分类
export function insertCategory(data) {
  return request({
    url: '/api/category/insertCategory',
    method: 'post',
    data
  })
}
// 编辑分类
export function updateCategory(data) {
  return request({
    url: '/api/category/updateCategory',
    method: 'put',
    data
  })
}
// 删除分类
export function deleteCategory(id) {
  return request({
    url: `/api/category/deleteCategory/${id}`,
    method: 'delete'
  })
}
