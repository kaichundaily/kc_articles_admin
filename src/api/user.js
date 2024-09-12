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