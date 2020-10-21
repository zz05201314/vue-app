import Vue from "vue";
import VueRouter from "vue-router";
import Home from '@/pages/Home'
import Login from "../pages/Login";
import allRoutes from "./allRoutes"
Vue.use(VueRouter);

const routes = [{
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    component: Home,
    children: allRoutes
    // children: [{
    //   path: "Student",
    //   component: () =>
    //     import( /* webpackChunkName: "Student" */ "../pages/Home/Student")
    // }]
  }
];
// 跳转页面时失败操作
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

const router = new VueRouter({
  routes
});

export default router;