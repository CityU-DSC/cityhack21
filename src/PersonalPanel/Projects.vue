<template>
  <v-container>
    <nav-drawer @direct="directTo"/>
  </v-container>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";

export default {
  name: "Projects",
  components: {navDrawer},
  methods: {
    directTo(page) {
      this.$router.push(page);
    },
  },
}
</script>

<style scoped>

</style>
