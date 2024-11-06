export function userTableColumns() {
    return [
        {
            title: '用户名',
            dataIndex: '用户名',
            key: 'username',
            align: 'left'
        },
        {
            title: '密码',
            dataIndex: '密码',
            key: 'password',
            align: 'left'
        },
        {
            title: '头像',
            dataIndex: '头像',
            key: 'avatar',
            align: 'left'
        },
        {
            title: '身份',
            dataIndex: '身份',
            key: 'mark',
            align: 'left'
        },
        {
            title: '权限',
            dataIndex: '权限',
            key: 'grade',
            align: 'left'
        },
        {
            title: '上级',
            dataIndex: '上级',
            key: 'level',
            align: 'left'
        },
        {
          title: '状态',
          dataIndex: '状态',
          key: 'status',
          align: "center"
        },
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

export function userRouterTableColumns() {
    return [
        {
            title: '昵称',
            dataIndex: 'nickname',
            key: 'nickname',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '20%'
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: '20%'
        },
        {
            title: 'level',
            dataIndex: 'level',
            key: 'level',
            width: '20%'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '20%'
        }
    ]
}