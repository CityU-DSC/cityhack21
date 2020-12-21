<template>
  <div>
    <nav-drawer @direct="directTo"/>
    <clock/>
    <div style="max-height: 20vh; min-height: 8vh;" />
    <AWSNotVerified/>
    <AWSVerified/>
    <AWSRejected/>
  </div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import clock from "@/PersonalPanel/components/Timer";
import AWSNotVerified from "@/PersonalPanel/components/AWSState/AWSStateNotVerified";
import AWSVerified from "@/PersonalPanel/components/AWSState/AWSStateVerified";
import AWSRejected from "@/PersonalPanel/components/AWSState/AWSStateRejected";

export default {
  name: "home",
  components: {
    navDrawer,
    clock,
    AWSNotVerified,
    AWSVerified,
    AWSRejected,
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
