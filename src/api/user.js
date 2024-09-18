import request from "@/utils/request.js";
// 登录接口
export const userLoginService = async ({ username, password }) => {
    return await request.postForm('/api/login', {
        username,
        password
    })
}
// 获取所有用户信息
export const getAllUser = async (page, size) =>  {
    return await request.get('/api/getAllUserInfo', {
        params: {
            page: page,
            size: size
        }
    })
}
// 添加用户信息
export const addUser = async (username, password, imgUrl) => {
    return await request.postForm('/api/createUser', {
        username,
        password,
        avatar: imgUrl
    })
}
// 逻辑删除某个用户
export const deleUser = async (id) => {
    return await request.postForm("/api/deleUser", {
        id
    })
}
// 修改账户信息
export const updateUser = async (ID, newImgUrl, newPassword) => {
    return await request.postForm("/api/updateUserInfo", {
        ID,
        imgUrl: newImgUrl,
        password: newPassword
    })
}

// 修改密码
export const updatePassword = async (ID, newPassword) => {
    return await request.postForm("", {
        ID,
        password: newPassword
    })
}