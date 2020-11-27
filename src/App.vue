<template>
  <v-app>
    <v-dialog v-model="showDialog" max-width='500px' close>
      <v-card>
        <div class="d-block text-center">
          <PromotionMaterial/>
        </div>
        <!-- <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close</b-button> -->
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
  // methods: {
  //   showModal() {
  //     this.$refs['my-modal'].show()
  //   },
  //   hideModal() {
  //     this.$refs['my-modal'].hide()
  //   }
  // },
  // mounted() {
  //   this.showModal();
  // },
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

a:hover {
  color: #ebad00;
  text-decoration: none;
}

.v-window__next {
  right: 0;
}
</style>
