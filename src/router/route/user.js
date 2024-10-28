const userMap = new Map()


// 2.user
userMap.set('user', {
    path: '/user',
    name: 'user',
    meta: {
        title: '用户',
        key: '2',
        icon: 'UserOutlined'
    },
    children: Array()
})
// 2.1 userTable
userMap.set('userTable', {
    path: '/user/userTable',
    name: 'userTable',
    component: () => import('@/views/user/UserTable.vue'),
    meta: {
        title: '用户列表',
        key: '2.1',
        icon: '',
        level: 'user'
    }
})

userMap.set('userPremissions', {
    path: '/user/userPremissions',
    name: 'userPremissions',
    component: () => import('@/views/user/UserPremissions.vue'),
    meta: {
        title: '用户权限',
        key: '2.2',
        icon: '',
        level: 'user'
    }
})

export default userMap