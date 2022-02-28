import service from '@/service'

const api = {
  getLabelBusinessList: '/dmp/label/getLabelBusinessList', // 业务线列表
  getLabelFirstClassList: '/dmp/label/getLabelFirstClassList', // 一级分类列表 参数：{"businessId":?,"level":1}
  getLabelSecondClassList: '/dmp/label/getLabelSecondClassList', // 二级分类列表 参数：{"businessId":?,"parentId":?,"level":2} parentId:一级分类id
  getLabelDataSourceList: '/dmp/label/getLabelDataSourceList', // 数据源列表
  getLabelDataTypeList: '/dmp/label/getLabelDataTypeList', // 标签值类型列表
  getLabelOperatorsList: '/dmp/label/getLabelOperatorsList', // 标签运算符列表
  getLabelCompoundOperatorsList: '/dmp/label/getLabelCompoundOperatorsList', // 复合标签运算符列表
  getLabelStatisticalTypeList: '/dmp/label/getLabelStatisticalTypeList', // 标签统计类型列表
  getLabelTableList: '/dmp/label/getLabelTableList', // 标签数据表列表 {"businessId":?}
  getLabelUpdateFrequencyList: '/dmp/label/getLabelUpdateFrequencyList', // 标签更新频率列表
  getLabelValueTypeList: '/dmp/label/getLabelValueTypeList', // 标签值类型列表
  getLabelTableColumn: '/dmp/label/getLabelTableColumn', // 标签数据表获取字段
  insert: '/dmp/label/insert', // 新增标签
  update: '/dmp/label/update', // 编辑标签
  getList: '/dmp/label/list', // 标签列表
  getLabelStatistics: '/dmp/label/getLabelStatistics', // 标签数统计
  getLabelStatisticsData: '/dmp/label/getLabelStatisticsData', // 标签值分布
  getLabelTableById: '/dmp/label/getLabelTableById', // 标签详情
  getDimValueList: '/dmp/dim-info/list' // 纬度值列表
}

export function getLabelBusinessList () {
  return service({
    url: api.getLabelBusinessList,
    method: 'post',
    data: {}
  })
}

export function getLabelFirstClassList (businessId:number) {
  return service({
    url: api.getLabelFirstClassList,
    method: 'post',
    data: { businessId: businessId, level: 1 }
  })
}

export function getLabelSecondClassList (businessId:number, parentId:number) {
  return service({
    url: api.getLabelSecondClassList,
    method: 'post',
    data: { businessId: businessId, parentId: parentId, level: 2 }
  })
}

export function getLabelTableColumn (tableName:string, businessName:string) {
  return service({
    url: api.getLabelTableColumn,
    method: 'post',
    data: { tableName: tableName, businessName: businessName }
  })
}

export function getLabelDataSourceList () {
  return service({
    url: api.getLabelDataSourceList,
    method: 'post',
    data: {}
  })
}

export function getLabelDataTypeList () {
  return service({
    url: api.getLabelDataTypeList,
    method: 'post',
    data: {}
  })
}

export function getLabelOperatorsList () {
  return service({
    url: api.getLabelOperatorsList,
    method: 'post',
    data: {}
  })
}

export function getLabelCompoundOperatorsList () {
  return service({
    url: api.getLabelCompoundOperatorsList,
    method: 'post',
    data: {}
  })
}

export function getLabelStatisticalTypeList () {
  return service({
    url: api.getLabelStatisticalTypeList,
    method: 'post',
    data: {}
  })
}

export function getLabelTableList (businessId:number) {
  return service({
    url: api.getLabelTableList,
    method: 'post',
    data: { businessId: businessId }
  })
}

export function getLabelTableById (labelId:number) {
  return service({
    url: api.getLabelTableById,
    method: 'post',
    data: { labelId: labelId }
  })
}

export function getLabelStatisticsData (labelId:number, dateTime:string) {
  return service({
    url: api.getLabelStatisticsData,
    method: 'post',
    data: { labelId: labelId, dateTime: dateTime }
  })
}

export function getLabelUpdateFrequencyList () {
  return service({
    url: api.getLabelUpdateFrequencyList,
    method: 'post',
    data: {}
  })
}

export function getLabelValueTypeList () {
  return service({
    url: api.getLabelValueTypeList,
    method: 'post',
    data: {}
  })
}

// 新增
export function insert (parameter:any) {
  return service({
    url: api.insert,
    method: 'post',
    data: parameter
  })
}
// 编辑
export function update (parameter:any) {
  return service({
    url: api.update,
    method: 'post',
    data: parameter
  })
}

// 列表
export function getList (parameter:any) {
  return service({
    url: api.getList,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 标签数统计
export function getLabelStatistics (parameter:any) {
  return service({
    url: api.getLabelStatistics,
    method: 'post',
    data: parameter
  })
}

export function getDimValueList () {
  return service({
    url: api.getDimValueList,
    method: 'get',
    data: { status: 0 }
  })
}
