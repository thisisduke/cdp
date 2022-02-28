import service from '@/service'

const api = {
  page: '/dmp/portrait/template/page',
  list: '/dmp/portrait/template/list',
  setDefaultTemplate: '/dmp/portrait/template/setDefaultTemplate',
  treeProjectList: '/dmp/project/treeProjectList',
  projectList: '/dmp/project/selectProjectList',
  getOfflineLabelList: '/dmp/label/getOfflineLabelList',
  getRealtimeLabelList: '/dmp/label/getRealtimeLabelList',
  getEventList: '/dmp/event/list',
  save: '/dmp/portrait/template/insert',
  update: '/dmp/portrait/template/update'
}

export function page (parameter:any) {
  return service({
    url: api.page,
    method: 'get',
    params: parameter
  })
}
// 分页查询
export function list (parameter:any) {
  return service({
    url: api.list,
    method: 'get',
    params: parameter
  })
}

export function treeProjectList (parameter:any) {
  return service({
    url: api.treeProjectList,
    method: 'post',
    params: parameter
  })
}

export function projectList (parameter:any) {
  return service({
    url: api.projectList,
    method: 'post',
    params: parameter
  })
}

export function getOfflineLabelList (parameter:any) {
  return service({
    url: api.getOfflineLabelList,
    method: 'post',
    data: parameter
  })
}

export function getRealtimeLabelList (parameter:any) {
  return service({
    url: api.getRealtimeLabelList,
    method: 'post',
    data: parameter
  })
}

export function getEventList (parameter:any) {
  return service({
    url: api.getEventList,
    method: 'get',
    data: parameter
  })
}

// 新增
export function save (parameter:any) {
  return service({
    url: api.save,
    method: 'post',
    data: parameter
  })
}

// 修改
export function update (parameter:any) {
  return service({
    url: api.update,
    method: 'post',
    data: parameter
  })
}

// 修改
export function setDefaultTemplate (parameter:any) {
  return service({
    url: api.setDefaultTemplate,
    method: 'post',
    data: parameter
  })
}
