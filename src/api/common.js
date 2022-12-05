import request from '@/utils/request'
// 获取轮播图
export function getCarouselImageList() {
  return request({
    url: '/api/system/carouselImageList',
    method: 'get'
  })
}
// 获取类目
export function getCategoryList() {
  return request({
    url: '/api/system/categoryList',
    method: 'get'
  })
}
// 获取属性
export function getAttributeList() {
  return request({
    url: '/api/system/attributeList',
    method: 'get'
  })
}
// 获取所有用户
export function getUserList() {
  return request({
    url: '/api/system/userList',
    method: 'get'
  })
}
