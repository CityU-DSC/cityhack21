import Vue from "vue";
import App from "./App.vue";

import Vuex from "vuex";
import router from "./routes";

import store from "./store";
import Carousel3d from "vue-carousel-3d";
import vuetify from "./plugins/vuetify";

import VueFullPage from "vue-fullpage.js";
import dayjs from "dayjs";

const dayjsPlugin = {
  install(Vue) {
    Vue.prototype.$dayjs = dayjs
  }
};

Vue.use(dayjsPlugin);

Vue.use(VueFullPage);

Vue.config.productionTip = false;
Vue.use(Carousel3d);
Vue.use(Vuex);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
