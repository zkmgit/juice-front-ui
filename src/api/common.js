import request from '@/utils/request'

export function getCarouselImageList(data) {
  return request({
    url: '/api/system/carouselImageList',
    method: 'get'
  })
}
