<template>
  <v-app>
    <v-overlay
        :opacity="1"
        :value="overlay"
    >
<!--      <v-progress-circular indeterminate size="64">-->
<!--        Loading...-->
<!--        <img :src="CityHackLogo" width="50px" class="rotate">-->
<!--      </v-progress-circular>-->
      <PreLoader />
    </v-overlay>
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
import CityHackLogo from "./assets/logo/logo_w.png";
import PreLoader from "./views/preLoader";

export default {
  name: 'App',
  data() {
    return {
      showDialog: true,
      overlay: true,
      CityHackLogo,
    }
  },
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'cityhack21', titleTemplate: '%s | City Hack 2021'},
      { name: 'description', content: 'CityHack is CityU’s largest Hackathon event. We aim to break away from conventional education and provide students with a unique opportunity to create a “hack” through a collaborative effort.'}
    ]
  },
  components: {
    NavBar,
    PromotionMaterial,
    PreLoader,
  },
  async mounted() {
    this.overlay = true;
    try {
      const res = await fetch('https://cityhack21.com');
      if(res) {
        this.overlay = false
      }
    } catch (error) {
      console.error(error);
      this.overlay = false
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
.rotate {
  animation: rotation 3s infinite linear;
  margin-left: 20px;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

* {
  font-family: "Space Mono", serif;
}

#data-app {
  background-color: black;
  color: white;
}

.v-window__next {
  right: 0;
}
</style>
