import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import adminList from "./modules/adminList";
import menu from "./modules/menu";
import util from "./modules/util";
import users from "./modules/users"

Vue.use(Vuex);

const store = () =>
    new Vuex.Store({
        modules: {
            auth,
            adminList,
            menu,
            util,
            users,
        }
    });

export default store;
