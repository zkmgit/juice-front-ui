import request from '@/utils/request'
// 获取所有的订单信息
export function getTableData(data) {
  return request({
    url: '/api/order/getAllOrderList',
    method: 'post',
    data
  })
}
// 发货
export function insertLogistics(data) {
  return request({
    url: '/api/logistics/insertLogistics',
    method: 'post',
    data
  })
}
