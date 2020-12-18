<template>
  <v-app>
    <v-dialog v-model="showDialog" max-width='500px' close>
      <v-card>
        <div class="d-block text-center">
          <PromotionMaterial/>
        </div>
      </v-card>
    </v-dialog>
    <NavBar/>
    <router-view/>
  </v-app>
</template>

<script>
import NavBar from './views/navBar.vue';
import PromotionMaterial from './components/promotion/promotion.vue';

export default {
  name: 'App',
  data(){
    return {
      showDialog: true
    }
  },
  components: {
    NavBar,
    PromotionMaterial
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

* {
  font-family: "Space Mono", serif;
}

.v-window__next {
  right: 0;
}
</style>
