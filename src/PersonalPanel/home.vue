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

        <v-col v-for="undo in undoList" :key="undo.id">
          <v-alert
            v-if="undo.show"
            border="right"
            colored-border
            type="error"
            elevation="2"
          >
            {{ undo.name }}
          </v-alert>
        </v-col>

        <guide v-if="this.verificationStatus === 'not submitted'" />
      </v-col>
      
      <v-col class="ml-5">
        <v-container style="max-width: 600px">
          <h3 class="mb-5 ml-5">Schedule</h3>
          <v-timeline dense clipped>
            <v-timeline-item
              fill-dot
              class="white--text mb-12"
              color="orange"
              large
            >
              <template v-slot:icon>
                <v-icon>mdi-calendar-clock</v-icon>
              </template>
              <v-text-field
                v-model="input"
                hide-details
                flat
                label="Leave a comment..."
                solo
                @keydown.enter="comment"
              >
                <template v-slot:append>
                  <v-btn class="mx-0" depressed @click="comment"> Post </v-btn>
                </template>
              </v-text-field>
            </v-timeline-item>

            <v-slide-x-transition group>
              <v-timeline-item
                v-for="event in timeline"
                :key="event.id"
                class="mb-4"
                color="pink"
                small
              >
                <v-row justify="space-between">
                  <v-col cols="7" v-text="event.text"></v-col>
                  <v-col
                    class="text-right"
                    cols="5"
                    v-text="event.time"
                  ></v-col>
                </v-row>
              </v-timeline-item>
            </v-slide-x-transition>

            <v-timeline-item class="mb-6" hide-dot>
              <span>TODAY</span>
            </v-timeline-item>

            <v-timeline-item
              class="mb-4"
              color="grey"
              icon-color="grey lighten-2"
              small
            >
              <v-row justify="space-between">
                <v-col cols="7"> This order was archived. </v-col>
                <v-col class="text-right" cols="5"> 15:26 EDT </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-container>
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

export default {
  name: "home",
  components: {
    navDrawer,
    clock,
    AWSNotVerified,
    AWSVerified,
    AWSRejected,
    AWSStateNotSubmitted,
    guide
  },
  data() {
    return {
      events: [],
      input: null,
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
    comment() {
      const time = new Date().toTimeString();
      this.events.push({
        id: this.nonce++,
        text: this.input,
        time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents) => {
          return ` ${contents
            .split(" ")
            .map((v) => v.charAt(0))
            .join("")}`;
        }),
      });

      this.input = null;
    },
  },
  async mounted() {
    if (!(await this.init())) {
      this.$router.push("/");
      return;
    }
    console.log(this.currentUser);
    await this.isAWSVerified();
  },
};
</script>

<style lang="scss" scoped>
</style>
