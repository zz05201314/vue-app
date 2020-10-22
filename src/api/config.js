import axios from "axios"

axios.defaults.baseURL = process.env.NOOE_ENV === "development" ? "/api" : "http://www.chst.vip"

//  允许请求携带认证
axios.defaults.withCredentials = true
// console.log(axios.defaults);

// 添加axios拦截器
/**
 * 在进行敏感操作之前，每个请求需要携带token,但是token 有有效期，token 失效后需要换取新的token并继续请求。
 */


// let request = axios.create({
//     timeout: 4000,
//     withCredentials: true
// })

export default axios