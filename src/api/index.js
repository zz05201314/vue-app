import axios from "axios"

import router from "../router"

import ElementUI from "element-ui";
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = "/api"
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? "/api" : "http://www.chst.vip"


axios.defaults.withCredentials = true

// 添加axios拦截器

axios.interceptors.request.use(config => {
    // console.log(config);
    // 将token给到一个前后台定好的key中，发送请求
    if (config.url == "/users/login") {
        return config
    } else {
        let token = localStorage.getItem("proj-token")
        config.headers["authorization"] = token
        // 放行
        return config
    }
})
// 响应拦截
axios.interceptors.response.use(config => {
    let {
        data
    } = config;
    if (data.code == "1004" || data.code == "10022") {
        ElementUI.Message.error("登入信息失效,请重新登入")
        router.push("/login")
    }
    // console.log(config);
    return config
})



axios.create({
    timeout: 3500,
})

export const login = (username, password) => axios({
    method: "post",
    url: "/users/login",
    data: {
        username,
        password
    }
})
// 登录日志
export const getLoginLog = () => axios({
    url: "/getloginlog"
})
// 获取用户权限
export const getMenuList = () => axios({
    url: "/permission/getMenuList"
})
export default axios