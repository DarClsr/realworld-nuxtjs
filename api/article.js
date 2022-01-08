import {http} from "@/plugins/http";


// 获取说话也文章列表
export const getArticles= (params)=>{
    return http.get('/articles',{params})
}

// 获取用户关注文章列表
export const favorArcticles= (params)=>{
    return http.get('/articles/feed',params)
}

// 获取标签
export const getTags= ()=>{
    return http.get('/tags')
}

// 点赞
export const faviorArticle= (slug)=>{
    return http.post(`/articles/${slug}/favorite`)
}

// 取消点赞
export const removeFavior= (slug)=>{
    return http.delete(`/articles/${slug}/favorite`)
}

// 文章详情
export const articleInfo= (slug)=>{
    return http.get(`/articles/${slug}`)
}

// 添加文章
export const addArticle= (params)=>{
    return http.post(`/articles`,params)
}

//b编辑文章
export const editArticle= (slug,params)=>{
    return http.put(`/articles/${slug}`,params)
}

//删除文章
export const removeArticle= (slug)=>{
    return http.delete(`/articles/${slug}`)
}



 