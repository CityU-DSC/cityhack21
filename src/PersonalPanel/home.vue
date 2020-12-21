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
import { mapActions } from "vuex";

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
    ...mapActions("auth", ["init"]),
    directTo(page){
      this.$router.push(page);
    }
  },
  async mounted() {
    if (!await this.init()) {
      this.$router.push('/');
      return;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
