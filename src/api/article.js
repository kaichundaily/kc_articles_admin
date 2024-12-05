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

export const isStatusArticle = async (id, status) => {
    let data = {
        id,
        status
    }
    return await request.post("/api/isStatusArticle", data, {
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}

export const isPublicArticle = async (id, is_public) => {
    let data = {
        id,
        is_public
    }
    return await request.post("/api/isPublicArticle", data,{
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}

// 添加文章
export const addArticle = async (img,title,tag,id) => {
    let data = {
        uid: id,
        title: title,
        tag: tag
    }
    return await request.post("/api/addArticle", data, {
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}

// 编辑文章
export const editArticle = async (id, uid, content) => {
    return await request.post("/api/editArticle", {
        id,
        uid,
        content
    })
}

export const deleArticle = async (articleIdList) => {
    return await request.post("/api/deleArticle", articleIdList, {
        headers: {
            'Content-Type': 'application/json' // 或者使用 multipart/form-data 如果有文件上传
        }
    })
}