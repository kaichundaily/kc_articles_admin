import request from "@/utils/request.js";

// 上传图片
export const UploadImage = async (file) => {

    const formData = new FormData()

    formData.append("file", file)

    return await request.post("/api/uploadimg", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

// 删除图片

export const DeleImg = async (imgUrl) => {

    return await request.postForm("/api/deleimg", {
        imgUrl
    })
}