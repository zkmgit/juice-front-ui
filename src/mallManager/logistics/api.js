import request from '@/utils/request'
// 获取所有的物流信息
export function getTableData(data) {
  return request({
    url: '/api/logistics/getAllLogisticsList',
    method: 'post',
    data
  })
}
