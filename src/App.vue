<template>
  <div id="app">
    <b-modal ref="my-modal" hide-footer title="Using Component Methods">
        <div class="d-block text-center">
          <PromotionMaterial/>
        <h3>This is the promotional material</h3>
      </div>
      <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </b-modal>
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './views/navBar.vue';
import PromotionMaterial from './components/promotion/promotion.vue';

export default {
  name: 'App',
  methods: {
      showModal() {
        this.$refs['my-modal'].show()
      },
      hideModal() {
        this.$refs['my-modal'].hide()
      }
    },
    mounted() {
      this.showModal();
  },
  components: {
    NavBar,
    PromotionMaterial
  }
}
</script>

<style>
#app {
  font-family: Bahnschrift,serif;
}
</style>
