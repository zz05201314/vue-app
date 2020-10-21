import axios from "./config"

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