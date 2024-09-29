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

// 添加文章
export const addArticle = async (img,title,tag,id) => {
    let data = {
        id,
        articleImg: img,
        title: title,
        tag: tag
    }
    return await request.post("/api/addArticle", data)
}

// 编辑文章
export const editArticle = async (article_id, content) => {
    return await request.post("/api/editArticle", {
        article_id,
        content
    })
}

export const deleArticle = async (articleIdList) => {
    const formData = new FormData()
    formData.append('articleIdList', articleIdList);
    return await request.post("/api/deleArticle", formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}