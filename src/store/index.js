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
    // 用户侧边栏
    menuList: [],
    // 面包屑
    crumbs: [],
    // 控制dialog弹出框显示和隐藏
    dialogVisible: false,
    // dialog数据源
    stuForm: {
      name: '',
      productUrl: '',
      headimgurl: '',
      class: '',
      age: '',
      city: '',
      degree: '',
      description: ''
    }
  },
  mutations: {
    SET_USERINFO(state, payload) {
      state.userInfo = payload
    },
    // 动态添加
    SET_MENULIST(state, payload) {
      state.menuList = payload
      // 将menulist的值给dynamicRoutes
      let target = dynamicRoutes.find(item => item.path === "/")
      target.children = [...state.menuList]
      // console.log(dynamicRoutes);
      // 动态添加router
      router.addRoutes(dynamicRoutes)
    },
    // 设置面包屑
    SET_CRUMBS(state, payload) {
      state.crumbs = payload
    }
  },
  actions: {
    // 发送请求，获取
    async FETCH_MENULIST({
      commit
    }) {
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