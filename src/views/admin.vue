<template>
  <v-container>
    <admin-nav-bar/>
  </v-container>
</template>

<script>
import adminNavBar from "@/components/Admin/adminNavBar";
export default {
  name: "admin",
  components: {
    adminNavBar
  },
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'title', content: 'about'},
      { name: 'description', content: 'CityHack is CityU’s largest Hackathon event. We aim to break away from conventional education and provide students with a unique opportunity to create a “hack” through a collaborative effort.'}
    ]
  },
}
</script>

<style scoped>

</style>
