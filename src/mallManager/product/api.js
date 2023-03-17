import request from '@/utils/request'
// 获取所有的产品
export function getTableData(data) {
  return request({
    url: '/api/product/getAllProductList',
    method: 'post',
    data
  })
}
// 新增产品
export function insertProduct(data) {
  return request({
    url: '/api/product/insertProduct',
    method: 'post',
    data
  })
}
// 编辑产品
export function updateProduct(data) {
  return request({
    url: '/api/product/updateProduct',
    method: 'put',
    data
  })
}
// 增加秒杀时间
export function updateSkillProduct(data) {
  return request({
    url: '/api/product/updateSkillProduct',
    method: 'put',
    data
  })
}
// 删除产品
export function deleteProduct(id) {
  return request({
    url: `/api/product/deleteProduct/${id}`,
    method: 'delete'
  })
}
