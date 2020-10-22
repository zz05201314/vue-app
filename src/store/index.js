import Vue from "vue";
import Vuex from "vuex";
import {
  getMenuList
} from "@/api";

import recursionRoutes from "../utils/recursionRoutes";
import allRoutes from "../router/allRoutes";
import dynamicRoutes from "../router/dynamicRoutes"
import router from "../router";
Vue.use(Vuex);
// 获取登录信息
let userInfo = localStorage.getItem("proj-userInfo") || "{}"
userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    userInfo,
    menuList: []
  },
  mutations: {
    SET_USERINFO(state, payload) {
      state.userInfo = payload

    },
    SET_MENULIST(state, payload) {
      state.menuList = payload
      // 将menulist的值给dynamicRoutes
      let target = dynamicRoutes.find(item => item.path == "/")
      target.children = [...state.menuList]
      // console.log(dynamicRoutes);
      // 动态添加样式router
      router.addRoutes(dynamicRoutes)
    }
  },
  actions: {
    // 发送请求，获取
    async FETCH_MENULIST() {
      // allRoutes 与 递归方法
      let userMenu = await getMenuList()
      // console.log(userMenu);
      let sideMenu = recursionRoutes(allRoutes, userMenu.data.menuList)

      commit("SET_MENULIST", sideMenu)
      // getMenuList().then(res => {
      //   console.log(res);
      // })
    }
  },
  modules: {},
})