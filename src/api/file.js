import request from "@/utils/request.js";

// 上传图片
export const UploadImage = async (file) => {

    return await request.postForm("/api/uploadFile", {
        file
    })
}

// 删除图片

export const DeleImg = async (fileUrl) => {

    return await request.postForm("/api/delFile", {
        fileUrl
    })
}