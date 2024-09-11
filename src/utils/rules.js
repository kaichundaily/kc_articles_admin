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


export function addUserRules(formData) {
    return{
        username: [
            { required: true, message: "请输入用户名", trigger: 'change' },
            { pattern: /^[a-zA-Z]{3,10}$/, message: "用户名职能是字母最短3,最长10", trigger: 'blur' }
        ],
        password: [
            {
                required: true,
                message: "请输入密码",
                trigger: 'change'
            },
            {
                min: 6, max: 16, message: "密码最小6位,最大16位", trigger: 'blur'
            }
        ],
        confirmPassword: [
            { required: true, message: "请再次输入密码", trigger: 'change' },
            {
                validator: (rule, value) => {
                    if (value !== formData.value.password) {
                        return Promise.reject('两次输入的密码不一致')
                    } else {
                        return Promise.resolve()
                    }
                },
                trigger: 'blur'
            }
        ]
    }
}
