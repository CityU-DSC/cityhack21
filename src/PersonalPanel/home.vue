<template>
  <v-container>
    <nav-drawer @direct="directTo" />
    <v-row style="margin-top: 10rem"><clock /></v-row>
    <v-row>
      <v-col>
        <v-col>
          <h3 class="mb-5">Notification</h3>
          <AWSStateNotSubmitted v-if="this.verificationStatus === 'not submitted'"/>
          <AWSNotVerified v-else-if="this.verificationStatus === 'pending'" />
          <AWSVerified v-else-if="this.verificationStatus === 'success'" />
          <AWSRejected v-else />
        </v-col>

<!--        <v-col v-for="undo in undoList" :key="undo.id">-->
<!--          <v-alert-->
<!--            v-if="undo.show"-->
<!--            border="right"-->
<!--            colored-border-->
<!--            type="error"-->
<!--            elevation="2"-->
<!--          >-->
<!--            {{ undo.name }}-->
<!--          </v-alert>-->
<!--        </v-col>-->
      </v-col>
      
      <v-col class="ml-5">
        <h3 class="mb-5">Referrer Board</h3>
        <ReferrerBoard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

import navDrawer from "@/PersonalPanel/components/navDrawer";
import clock from "@/PersonalPanel/components/Timer";
import guide from "@/PersonalPanel/components/awsVerifyGuide";
import AWSNotVerified from "@/PersonalPanel/components/AWSState/AWSStateNotVerified";
import AWSVerified from "@/PersonalPanel/components/AWSState/AWSStateVerified";
import AWSRejected from "@/PersonalPanel/components/AWSState/AWSStateRejected";
import AWSStateNotSubmitted from "@/PersonalPanel/components/AWSState/AWSStateNotSubmitted";
import { mapGetters } from "vuex";
import ReferrerBoard from "@/PersonalPanel/components/ReferrerBoard";

export default {
  name: "home",
  components: {
    navDrawer,
    clock,
    AWSNotVerified,
    AWSVerified,
    AWSRejected,
    AWSStateNotSubmitted,
    ReferrerBoard,
  },
  data() {
    return {
      undoList: [
        { name: "Upload AWS Educate Image", show: true },
        { name: "Update Profile Page", show: true },
        { name: "Attend Discord Grpoup", show: false },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("aws_verify", ["verificationStatus"]),
    timeline() {
      return this.events.slice().reverse();
    },
  },
  methods: {
    ...mapActions("auth", ["init"]),
    ...mapActions("aws_verify", ["isAWSVerified"]),

    directTo(page) {
      this.$router.push(page);
    },
  },
  async mounted() {
    if (!(await this.init())) {
      this.$router.push("/");
      return;
    }
    await this.isAWSVerified();
  },
};
</script>

<style lang="scss" scoped>
</style>
