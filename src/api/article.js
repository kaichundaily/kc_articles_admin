import request from "@/utils/request.js";

export const getAllArticle = (page, size, id) => {
    return request.get("/api/getAllArticle", {
        params: {
            page,
            size,
            id
        }
    })
}