import { Module } from "vuex";

export default {
  namespaced: true,
  state: {
    content: "",
    color: ""
  },
  mutations: {
    showMessage(state, payload) {
      state.content = payload.content;
      state.color = payload.color;
    }
  }
} as Module<any, any>
