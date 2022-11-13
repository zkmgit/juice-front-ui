import request from '@/utils/request'
// 获取所有的轮播图
export function getTableData(data) {
  return request({
    url: '/api/carouselImage/getAllCarouselImageList',
    method: 'post',
    data
  })
}
// 新增轮播图
export function insertCarouselImage(data) {
  return request({
    url: '/api/carouselImage/insertCarouselImage',
    method: 'post',
    data
  })
}
// 编辑轮播图
export function updateCarouselImage(data) {
  return request({
    url: '/api/carouselImage/updateCarouselImage',
    method: 'put',
    data
  })
}
// 编辑轮播图排序
export function batchSortCarouselImage(data) {
  return request({
    url: '/api/carouselImage/batchSortCarouselImage',
    method: 'post',
    data
  })
}
// 删除轮播图
export function deleteCarouselImage(id) {
  return request({
    url: `/api/carouselImage/deleteCarouselImage/${id}`,
    method: 'delete'
  })
}
