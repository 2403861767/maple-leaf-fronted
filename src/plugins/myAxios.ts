import axios, {AxiosInstance} from 'axios'

const myAxios : AxiosInstance = axios.create({
    baseURL: 'http://localhost:8972/api/',
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
});
// 携带凭证（cookie）
myAxios.defaults.withCredentials=true
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    console.log('request',config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log('response',response)
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;