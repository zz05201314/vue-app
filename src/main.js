import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入全局css和element-rest
import './assets/css/global.css'
import '@/assets/css/el-reset.css'
// 引入图标库
import "./assets/iconfont/iconfont.css"

// Vue.config.productionTip = false;
Vue.use(ElementUI);

// 导航守卫（前置钩子
router.beforeEach((to, from, next) => {
  // 用户登录。localStorage带有token
  // 获取本地的token值
  let token = localStorage.getItem("proj-token")
  // console.log(to);
  if (token) {
    next()
  } else {
    // 没有token
    if (to.path === "/login") {
      // 如果没有登录，但你访问其他页面，要跳转登录页面
      next()
    } else {
      // 没有登录，访问login，不拦截
      next({
        path: "/login"
      })
    }
  }
})

import "./utils/recursionRoutes"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");