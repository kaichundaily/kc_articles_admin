import request from "@/utils/request.js";

export const userLoginService = async ({ username, password }) => {
    return await request.postForm('/api/login', {
        username,
        password
    })
}

export const getAllUser = async (page, size) =>  {
    return await request.get('/api/getAllUserInfo', {
        params: {
            page: page,
            size: size
        }
    })
}
