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
// 引入侧边栏
import qfSubMenu from "qf-sub-menu"
import NProgress from "nprogress";
// Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(qfSubMenu)

// 导航守卫（前置钩子
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 用户登录。localStorage带有token
  // 获取本地的token值
  let token = localStorage.getItem("proj-token") || ""
  // console.log(to);
  if (token) {
    // 登录页面直接放行
    if (store.state.menuList.length == 0) {
      // 无用户时，触发用户路由
      store.dispatch("FETCH_MENULIST")
        .then(() => {
          next({
            path: to.path
          })
        })
      // mulation里有的用户路由
    } else {
      next()
    }
    // next()
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
// 使用路由后置钩子处理面包屑
router.afterEach((to, fron) => {
  // console.log(to);
  let crumbList = to.matched.slice(1)
  // console.log(crumbList);
  store.commit('SET_CRUMBS', crumbList)
  // 进度条
  NProgress.done()
})



// 测试
// import "./utils/recursionRoutes"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");