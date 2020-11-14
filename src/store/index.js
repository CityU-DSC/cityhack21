import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import adminList from "./modules/adminList";

Vue.use(Vuex);

const store = () => new Vuex.Store({
    modules: {
        auth,
        adminList,
    },
});

export default store;

