// store/module/home.js
import * as Types from "../mutations-types";
import { getSliders } from "../../api/home";

export default {
  namespaced: true,
  state: {
    sliders: []
  },
  actions: {
    async [Types.SET_SLIDER]({ commit }) {
      try {
        const sliders = await getSliders();
        commit(Types.SET_SLIDER, sliders);
      } catch (error) {
        console.log(error);
      }
    }
  },
  mutations: {
    // mutations 只用来修改state状态
    [Types.SET_SLIDER](state, payload) {
      state.sliders = [...payload];
    }
  }
};
