<template>
  <div>
    <nav-drawer @direct="directTo"/>
  </div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";

export default {
  name: "AWSVerification",
  components: {
    navDrawer,
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
