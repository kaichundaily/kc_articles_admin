export function userTableColumns() {
    return [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            align: 'center'
        },
        {
            title: '用户名',
            dataIndex: '用户名',
            key: 'username',
            align: 'center'
        },
        {
            title: '头像',
            dataIndex: '头像',
            key: 'avatar',
            align: 'center'
        },
        {
          title: '状态',
          dataIndex: '状态',
          key: 'status',
          align: "center"
        },
        {
            title: '编辑',
            dataIndex: '编辑',
            key: 'edit',
            align: 'center',
            scopedSlots: { customRender: 'action' }  // 绑定插槽
        }
    ]
}

export function articleTableColumns() {
    return [
        {
            title: '标题',
            dataIndex: '标题',
            key: 'title',
            align: 'center'
        },
        {
            title: '标签',
            dataIndex: '标签',
            key: 'tag',
            align: 'center'
        },
        {
            title: '发布',
            dataIndex: '发布',
            key: 'status',
            align: 'center'
        },
        {
            title: '公开',
            dataIndex: '公开',
            key: 'public',
            align: 'center'
        },
        {
            title: '编辑',
            dataIndex: '编辑',
            key: 'edit',
            align: 'center'
        }
    ]
}