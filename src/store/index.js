import Vue from 'vue';
import Vuex from 'vuex';
// import user from './modules/user';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    modules: {
        // user,
    },
    getters: {
        isLoggedIn: (state) => state.user.isLoggedIn,
        currentUsername: (state) => state.user.username,
    },
});

export default store;
