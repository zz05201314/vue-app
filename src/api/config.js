import axios from "axios"

// 样式
// import ElementUI from "element-ui";
// import router from "../router";


axios.defaults.baseURL = process.env.NOOE_ENV === "development" ? "/api" : "http://www.chst.vip"

//  允许请求携带认证
axios.defaults.withCredentials = true;
// 添加axios拦截器
/**
 * 在进行敏感操作之前，每个请求需要携带token,但是token 有有效期，token 失效后需要换取新的token并继续请求。
 */
axios.interceptors.request.use(config => {
    // console.log(config);
    // 将token给到一个前后台定好的key中，发送请求
    if (config.url == "/users/login") {
        return config
    } else {
        let token = localStorage.getItem("proj-token")
        config.headers["Authorization"] = token
        // 
        return config
    }
})

axios.create({
    timeout: 4000
})

export default axios