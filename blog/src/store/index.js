import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginUser: {},
        loading: false
    },
    mutations: {
        setLoginUser(state, payload) {
            state.loginUser = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        }
    },
    actions: {
        changeLoginUser({ commit }, payload) {
            commit('setLoginUser', payload);
        },
        changeLoading({ commit }, payload) {
            commit('setLoading', payload);
        }
    },
})