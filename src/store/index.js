import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import adminList from "./modules/adminList";
import menu from './modules/menu';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    modules: {
        auth,
        adminList,
        menu,
    },
});

export default store;

