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

// 评论文章
export const postComment= (slug)=>{
    return http.post(`/articles/${slug}`)
}

// 文章评论列表

export const articleComments= (slug)=>{
    return http.get(`/articles/${slug}、comm`)
}

// 删除评论
export const removeComment= (slug)=>{
    return http.delete(`/articles/${slug}`)
}

 