import Vue from 'vue';
import Vuex from 'vuex';
// import user from './modules/user';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    modules: {
        // user,
    },
    state: {
        drawerOpen: false,
    },
    getters: {
        isLoggedIn: (state) => state.user.isLoggedIn,
        currentUsername: (state) => state.user.username,
        drawer: (state) => state.drawerOpen,
    },
    mutations: {
        toogleDrawer: (state) => { state.drawerOpen = !state.drawerOpen }
    }
});

export default store;
