import request from "@/utils/request.js";

export const getAllArticle = async (page, size, id) => {
    return await request.get("/api/getAllArticle", {
        params: {
            page,
            size,
            id
        }
    })
}

export const isStatusArticle = async (id, number) => {
    let data = {
        articleid: id,
        num: number
    }
    return await request.post("/api/isStatusArticle", data)
}

export const isPublicArticle = async (id, number) => {
    let data = {
        articleid: id,
        num: number
    }
    return await request.post("/api/isPublicArticle", data)
}