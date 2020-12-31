<template>
  <div>
    <nav-drawer @direct="directTo"/>
    <clock/>
    <div style="max-height: 20vh; min-height: 8vh;" />
    <AWSStateNotSubmitted v-if="this.verificationStatus === 'not submitted'" />
    <AWSNotVerified v-else-if="this.verificationStatus === 'pending'"/>
    <AWSVerified v-else-if="this.verificationStatus === 'success'"/>
    <AWSRejected v-else/>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import navDrawer from "@/PersonalPanel/components/navDrawer";
import clock from "@/PersonalPanel/components/Timer";
import AWSNotVerified from "@/PersonalPanel/components/AWSState/AWSStateNotVerified";
import AWSVerified from "@/PersonalPanel/components/AWSState/AWSStateVerified";
import AWSRejected from "@/PersonalPanel/components/AWSState/AWSStateRejected";
import AWSStateNotSubmitted from "@/PersonalPanel/components/AWSState/AWSStateNotSubmitted";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    navDrawer,
    clock,
    AWSNotVerified,
    AWSVerified,
    AWSRejected,
    AWSStateNotSubmitted
  },
  computed: {
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('aws_verify', ['verificationStatus'])
  },
  methods: {
    ...mapActions("auth", ["init"]),
    ...mapActions('aws_verify', ['isAWSVerified']),

    directTo(page){
      this.$router.push(page);
    }
  },
  async mounted() {
    if (!await this.init()) {
      this.$router.push('/');
      return;
    }
    console.log(this.currentUser)
    await this.isAWSVerified();
  }
}
</script>

<style lang="scss" scoped>

</style>
