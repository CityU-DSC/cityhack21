import Vue from 'vue'
import App from './App.vue'

import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { routes } from './routes'

import Store from './store'
import Carousel3d from 'vue-carousel-3d'
import vuetify from './plugins/vuetify';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueScrollactive from 'vue-scrollactive'


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueScrollactive);

Vue.config.productionTip = false;
Vue.use(Carousel3d);
Vue.use(Vuex);

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  Store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
