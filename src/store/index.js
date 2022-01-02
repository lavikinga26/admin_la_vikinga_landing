import Vue from "vue";
import Vuex, { Store } from "vuex";
//import API from '../api/index'
//import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loader: false,
    StoreCart: localStorage.getItem('shoppingCartVikinga') ? JSON.parse(localStorage.getItem('shoppingCartVikinga')) : [] || [],
    token: localStorage.getItem('token') || '',
  },
  getters: {
    //------CART------
    StoreCart: (state) => state.StoreCart,

    //------AUTH------
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,

  },
  mutations: {
    loader(state, playload){
      state.loader = playload;
    },
    //------CART------
    add_Item(state, id) {
      state.StoreCart.push(id);
      localStorage.setItem('shoppingCartVikinga', JSON.stringify(state.StoreCart));
    },
    remove_Item(state, index) {
      state.StoreCart.splice(index, 1);
      localStorage.setItem('shoppingCartVikinga', JSON.stringify(state.StoreCart));
    },
    clean_Cart(state){
      state.StoreCart = [];
      localStorage.removeItem('shoppingCartVikinga');
    },

    //------AUTH------
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },

  },
  actions: {
    //------CART------
    addItem(context, id) {
      context.commit("add_Item", id);
    },
    removeItem(context, index) {
      context.commit("remove_Item", index);
    },
    cleanCart(context) {
      context.commit("clean_Cart");
    },
  },
  modules: {

  },
});