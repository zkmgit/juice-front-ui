import request from '@/utils/request'
// 获取所有的公告
export function getTableData() {
  return request({
    url: '/api/announcement/getAnnouncementList',
    method: 'get'
  })
}
// 新增公告
export function insertAnnouncement(data) {
  return request({
    url: '/api/announcement/insertAnnouncement',
    method: 'post',
    data
  })
}
// 编辑公告
export function updateAnnouncement(data) {
  return request({
    url: '/api/announcement/updateAnnouncement',
    method: 'put',
    data
  })
}
// 删除公告
export function deleteAnnouncement(id) {
  return request({
    url: `/api/announcement/deleteAnnouncement/${id}`,
    method: 'delete'
  })
}
