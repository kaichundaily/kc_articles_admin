import request from "@/utils/request.js";
// 登录接口
export const userLoginService = async ({ username, password }) => {
    return await request.post('/api/login', {
        username,
        password
    }, {
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}
// 获取所有用户信息
export const getUsers = async (page, size) =>  {
    return await request.get('/api/getUsers', {
        params: {
            page,
            size
        }
    })
}

// 添加用户信息
export const addUser = async (data) => {
    return await request.post('/api/addUser', data,{
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}

// 修改密码
export const updatePassword = async (ID, newPassword) => {
    return await request.post("/api/uploadPasswd", {
        id: ID,
        password: newPassword
    },{
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}

// 关闭账户
export const closeUser = async (id, num) => {
    return await request.post("/api/closeUser",{
        uid:id,
        num
    },{
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}

// 获取levelList
export const getManagerList = async (grade) => {
    return await request.get("/api/getManagerList", {
        params: {
            grade
        }
    })
}

// 根据level获取子用户
export const getUserTreeList = async (level) => {
    return await request.get("/api/getUserTree", {
        params: {
            level
        }
    })
}

// 获取用的的路由权限
export const getUserRouter = async (page, size, id) => {
    return await request.get("", {
        params: {
            page,
            size,
            id
        }
    })
}