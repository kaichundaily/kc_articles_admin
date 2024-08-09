export function loginFormRules() {
    return {
        username: [
            { required: true, message: '请输入用户名', trigger: 'change' },
            { min: 3,max: 10, message: '用户名最低3个字符最高10个字符', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 6,max: 16, message: '用户名最低6个字符最高16个字符', trigger: 'blur' }
        ]
    }
}
