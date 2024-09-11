import request from "@/utils/request.js";


export const UploadImage = async (file) => {

    const formData = new FormData()

    formData.append("file", file)

    return await request.post("/api/uploadimg", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}