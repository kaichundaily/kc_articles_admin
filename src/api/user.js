import request from "@/utils/request.js";

export const userLoginService = async ({ username, password }) => {
    return await request.postForm('/api/login', {
        username,
        password
    })
}
