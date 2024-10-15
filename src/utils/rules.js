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


export function addUserRules() {
    return {
        mark: [
           {
                required: true,
                message: "请选择身份"
           }
        ],
        level: [
            {
                required: true,
                message: "请选择上级"
            }
        ],
        username: [
            {
                required: true,
                message: "请输入用户名"
            },
            {
                pattern: /^[a-zA-Z0-9]{3,10}$/,
                message: "用户名职能是字母最短3,最长10",
                trigger: 'blur'
            }
        ],
        password: [
            {
                required: true,
                message: "请输入密码"
            },
            {
                min: 6, max: 16, message: "密码最小6位,最大16位", trigger: 'blur'
            }
        ],
        confirmPassword: [
            {
                required: true,
                message: "请输入密码"
            },
            {
                min: 6, max: 16, message: "密码最小6位,最大16位", trigger: 'blur'
            }
        ]
    }
}


export function revisePasswordRules() {
    return {
        oldPassword: [
            {
                required: true,
                message: "请输入旧密码"
            },
            {
                min: 6,
                max: 16,
                message: "密码最小6位,最大16位",
                trigger: 'blur'
            }
        ],
        newPassword: [
            {
                required: true,
                message: "请输入新密码"
            },
            {
                min: 6,
                max: 16,
                message: "密码最小6位,最大16位",
                trigger: 'blur'
            }
        ],
        verifyPassword: [
            {
                required: true,
                message: "请再次输入新密码"
            },
            {
                min: 6,
                max: 16,
                message: "密码最小6位,最大16位",
                trigger: 'blur'
            }
        ]
    }
}
