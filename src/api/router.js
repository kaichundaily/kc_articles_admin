import request from "@/utils/request.js";

export const getRouters = async ( id ) => {
    return await request.post("/api/getRouter", {
        id
    },{
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}

// 获取用的的路由权限
export const getUserRouter = async (page, size, childuid, fatheruid) => {
    return await request.get("/api/getUserRouterForPage", {
        params: {
            childuid,
            fatheruid,
            page,
            size,
        }
    })
}