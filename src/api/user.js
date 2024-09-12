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

export const addUser = async (username, password, imgUrl) => {
    return await request.postForm('/api/createUser', {
        username,
        password,
        avatar: imgUrl
    })
}
