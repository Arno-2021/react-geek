import axios from 'axios'
import { getToken } from './token'
import { message } from 'antd'
import history from '@/utils/history'
const instance = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0/',
    timeout: 5000,
})
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        config.headers.Authorization = `Bearer ${getToken()}`
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response.data
    },
    function (error) {
        // 对响应错误做点什么
        if (!error.response) {
            message.error('网络繁忙！请稍后重试')
            return Promise.reject(error)
        }
        if (error.response.status === 401) {
            history.replace({
                pathname: '/login',
                state: {
                    from: history.location.pathname,
                },
            })
        }
        return Promise.reject(error)
    }
)

export default instance
