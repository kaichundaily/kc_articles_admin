import request from "@/utils/request.js";

export const getRouters = async ( id ) => {
    await request.post("/api/getRouter", {
        id
    },{
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}