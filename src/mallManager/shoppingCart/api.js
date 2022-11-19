import request from '@/utils/request'
// 获取所有的购物车信息
export function getTableData(data) {
  return request({
    url: '/api/shoppingCart/getAllShoppingCartList',
    method: 'post',
    data
  })
}
// 删除购物车
export function deleteShoppingCart(id) {
  return request({
    url: `/api/shoppingCart/deleteShoppingCart/${id}`,
    method: 'delete'
  })
}
