<template>
  <div>
    <nav-drawer @direct="directTo"/>
    <!-- Add the countdown timer here. -->
    <clock/>
  </div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import clock from "@/PersonalPanel/components/Timer";

export default {
  name: "home",
  components: {
    navDrawer,
    clock
  },
  methods: {
    directTo(page){
      this.$router.push(page);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
