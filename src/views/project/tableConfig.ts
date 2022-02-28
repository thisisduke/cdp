export const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true
    },
    {
        title: '业务线',
        dataIndex: 'businessName',
        sorter: true
    },
    {
        title: '项目名称',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: '项目描述',
        dataIndex: 'desc',
        sorter: true
    },
    {
        title: '状态',
        dataIndex: 'status',
        sorter: true,
        slots: { customRender: 'status' }
    },
    {
        title: '创建者',
        dataIndex: 'creater',
        sorter: true
    },
    {
        title: '修改者',
        dataIndex: 'editor',
        sorter: true
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        sorter: true
    },
    {
        title: '更新时间',
        dataIndex: 'updatedAt',
        sorter: true
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        slots: { customRender: 'action' }
    }
]