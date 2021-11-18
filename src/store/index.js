import Vue from "vue";
import Vuex, { Store } from "vuex";
//import API from '../api/index'
//import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loader: false,
    StoreCart: [],
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
    },
    remove_Item(state, index) {
      state.StoreCart.splice(index, 1);
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
  },
  modules: {

  },
});