import {http} from "@/plugins/http";


// 获取文章评论
export const getComments= (slug)=>{
    return http.get(`/articles/${slug}/comments`)
}

// 添加文章评论
export const addComment= (slug,params)=>{
    return http.post(`/articles/${slug}/comments`,params)
}

// 删除文章评论
export const removeComment= (slug,id)=>{
    return http.delete(`/articles/${slug}/comments/${id}`)
}

