import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import Store from './store'
import Carousel3d from 'vue-carousel-3d'
import vuetify from './plugins/vuetify';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false;
Vue.use(Carousel3d);
Vue.use(Vuex);

new Vue({
  Store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
