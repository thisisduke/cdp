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
        dataIndex: 'projectName',
        sorter: true
    },
    {
        title: '模版名称',
        dataIndex: 'name',
        sorter: true
    },
    {
        title: '模版描述',
        dataIndex: 'desc',
        sorter: true,
    },
    {
        title: '状态',
        dataIndex: 'status',
        slots: { customRender: 'status' }
    },
    {
        title: '是否默认模版',
        dataIndex: 'isDefault',
        slots: { customRender: 'isDefault' }
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: '150px',
        slots: { customRender: 'action' }
    }
]