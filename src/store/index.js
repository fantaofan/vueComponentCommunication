import Vue from "vue";
import Vuex from "vuex";
import * as Types from "./mutations-types";
import home from "./module/home";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: []
  },
  mutations: {
    // 存放取消请求令牌
    [Types.PUSH_TOKEN](state, c) {
      // state.token = state.token.push(c);
      state.token = [...state.token, c]; // es6写法可以确保是一个新数组
    },
    [Types.CANCEL_TOKEN](state) {
      // 取消请求的函数拿出来依次执行
      state.token.forEach(fn => fn());
    }
  },
  actions: {},
  modules: {
    home
  }
});
