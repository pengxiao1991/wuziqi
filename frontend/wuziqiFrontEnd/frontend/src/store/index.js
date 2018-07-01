import Vuex from 'vuex'
import Vue from 'vue';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        access_token: ''
    },
    mutations: {
       
        updateAccessToken(state, payload) {
            state.access_token = payload;
        },
       
    },
    getters: {
      
        getAccessToken: state => {
            return state.access_token;
        }
      
    }
});

