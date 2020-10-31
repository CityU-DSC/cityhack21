import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

import Store from './store'
import Carousel3d from 'vue-carousel-3d'

Vue.config.productionTip = false;
Vue.use(Carousel3d, Vuex);

new Vue({
  Store,
  render: h => h(App)
}).$mount('#app');
