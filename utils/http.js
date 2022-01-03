import axios from "axios";

const http = axios.create({
    baseURL: 'https://api.realworld.io/api',
    timeout: 50000,
});

// / 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    const {response}=error;
    if(response.status!==200){
        return Promise.reject(response.data);
    }
});

export default http;