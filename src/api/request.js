import axios from "axios";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 3000
});

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 携带 token 请求
    config.headers.Authorization = localStorage.getItem("token");
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default Axios;
