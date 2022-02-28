import service from '@/service'

const api = {
    create: '/dmp/project/insert', // 新增项目
    update: '/dmp/project/update', // 编辑项目
    getList: '/dmp/project/selectProjectPageList', // 项目分页列表
    selectProjectList: '/dmp/project/selectProjectList', // 项目列表
    getCategoriesLabelList: '/dmp/label/getCategoriesLabelList', // 项目标签选中列表
    updateConf: '/dmp/project/updateConf', // 项目配置
    getProject: '/dmp/project/getProject' // 项目详情
}

// 新增
export function create (parameter:any) {
    return service({
        url: api.create,
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