import axios from 'axios'

// http就是对axios二次封装的一个请求
const http =  axios.create({
    // 通用请求的地址，地址的前缀
    baseURL: '/api',   // 这里也有斜杠的哈
    timeout: 10000,  // 超时时间
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
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

  export default http