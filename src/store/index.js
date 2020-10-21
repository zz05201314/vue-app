import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// 获取登录信息
// let userInfo = localStorage.getItem("proj-userInfo") || "{}"
// userInfo = JSON.parse(userInfo)

export default new Vuex.Store({
  state: {
    // userInfo
  },
  mutations: {
    // SET_USERINFO(state, payload) {
    //   state.userInfo = payload
    // }
  },
  actions: {},
  modules: {},
})