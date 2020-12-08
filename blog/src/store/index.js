import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginUser:{}
    },
    mutations: {
        setLoginUser(state, payload){
            state.loginUser = payload;
        }
    },
    actions: {
        changeLoginUser({commit},payload){
            commit('setLoginUser',payload);
        }
    },
})