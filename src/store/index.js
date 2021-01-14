import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import adminList from "./modules/adminList";
import menu from "./modules/menu";
import util from "./modules/util";
import users from "./modules/users";
import aws_verify from "./modules/aws_verify"
import teams from "./modules/teams";
import project from "./modules/project";

Vue.use(Vuex);

const store = () =>
    new Vuex.Store({
        modules: {
            auth,
            adminList,
            menu,
            util,
            users,
            aws_verify,
            teams,
            project,
        }
    });

export default store;
