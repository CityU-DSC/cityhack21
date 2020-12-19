<template>
  <div>
    <nav-drawer @direct="directTo" :current="pathName"/>
  </div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";

export default {
  name: "personal_profile",
  components: {
    navDrawer,
  },
  data(){
    return {
      pathName: "Profile Page",
    }
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    }
  }
}
</script>

<style scoped>

</style>
