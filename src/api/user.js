import request from "@/utils/request.js";

export const userLoginService = async ({ username, password }) => {
    return await request.postForm('/api/login', {
        username,
        password
    })
}

export const getAllUserInfos = async () =>  {
    return await request.get('/api/getAllUserInfo')
}
