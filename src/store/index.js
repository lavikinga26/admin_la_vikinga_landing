import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loader: false,
  },
  getters: {
    
  },
  mutations: {
    loader(state, playload){
      state.loader = playload;
    },
  },
  actions: {
      
  },
  modules: {

  },
});