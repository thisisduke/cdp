import service from '@/service'

const api = {
  tree: '/sys/menu/menuTree',
  getApplication: '/sys/menu/top/menu',
}

// 查询所有机构,左侧树
export function tree () {
  return service({
    url: api.tree,
    method: 'get'
  })
}

// 获取应用
export function getApplication () {
  return service({
    url: api.getApplication,
    method: 'get'
  })
}
