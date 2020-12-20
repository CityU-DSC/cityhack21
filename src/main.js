import Vue from "vue";
import App from "./App.vue";

import Vuex from "vuex";
import router from "./routes";

import store from "./store";
import Carousel3d from "vue-carousel-3d";
import vuetify from "./plugins/vuetify";

import VueFullPage from "vue-fullpage.js";
import dayjs from "dayjs";

import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';


// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
// Vue.use(VuetifyGoogleAutocomplete, {
//   apiKey: 'AIzaSyBcXjtpzqcHsrNJRSbJXIDRsS2wjf9bx08',
// });

import { firestorePlugin } from 'vuefire';

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

Vue.use(firestorePlugin);

Vue.use(VueTelInputVuetify, {
  vuetify,
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
