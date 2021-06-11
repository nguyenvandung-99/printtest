import Vue from 'vue'
import Vuex from 'vuex'
import userSelection from '@/models/userSelection'
import snackbar from "@/store/snackbar"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product: {
      properties: []
    },
    cart: [] as userSelection[],
  },
  getters: {
    getProduct: state => state.product,
    getCart: state => state.cart
  },
  mutations: {
    setProduct(state, payload) {
      state.product = payload;
    },
    setCart(state, payload) {
      state.cart = payload;
      localStorage.setItem('cart', JSON.stringify(payload));
    }
  },
  actions: {
    async getProductSetToStore({ commit }, payload) {
      const { productName } = payload;
      const product = require(`@/assets/database/${productName}.json`);
      commit('setProduct', product);
    },
    async addItemToCart({ state, commit }, payload) {
      const { cart } = state;
      const { newItem } = payload;
      commit('setCart', [
        ...cart,
        newItem
      ]);
      commit(
        "snackbar/showMessage",
        {
          content: "Added to cart",
          color: "success"
        },
        {
          root: true
        }
      );
    }
  },
  modules: {
    snackbar,
  }
})
