import Vue from "vue";
import App from "./App.vue";

import Vuex from "vuex";
import router from "./routes";

import store from "./store";
import Carousel3d from "vue-carousel-3d";
import vuetify from "./plugins/vuetify";

// import { ModalPlugin, ButtonPlugin, NavbarPlugin } from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";
import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true
import VueFullPage from "vue-fullpage.js";

Vue.use(VueFullPage);

// Vue.use(ModalPlugin);
// Vue.use(ButtonPlugin);
// Vue.use(NavbarPlugin);

Vue.config.productionTip = false;
Vue.use(Carousel3d);
Vue.use(Vuex);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
