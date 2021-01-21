import Vue from "vue";
import App from "./App.vue";

import Vuex from "vuex";
import router from "./routes";

import store from "./store";
import Carousel3d from "vue-carousel-3d";
import vuetify from "./plugins/vuetify";

import VueFullPage from "vue-fullpage.js";
import dayjs from "dayjs";
import VueSocialSharing from 'vue-social-sharing'
import VueAnalytics from 'vue-analytics';


// import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';


// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete';
// Vue.use(VuetifyGoogleAutocomplete, {
//   apiKey: '',
// });

import { firestorePlugin } from 'vuefire';

import './registerServiceWorker'

const dayjsPlugin = {
  install(Vue) {
    Vue.prototype.$dayjs = dayjs
  }
};

Vue.use(VueSocialSharing);
Vue.use(dayjsPlugin);
Vue.use(VueFullPage);
Vue.config.productionTip = false;
Vue.use(Carousel3d);
Vue.use(Vuex);
Vue.use(firestorePlugin);

// Vue.use(VueTelInputVuetify, {
//   vuetify,
// });

Vue.use(VueAnalytics, {
  id: 'UA-186817163-1',
  router
});

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
