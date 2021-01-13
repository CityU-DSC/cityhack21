<template>
  <v-card
      v-if="projectDetail"
      class="mx-auto my-12"
      max-width="520"
  >
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" height="100px">
      <v-row class="mb-5">
        <v-spacer/>
        <v-col align="right">
          <a :href="projectDetail.repositoryUrl" target="_blank">
            <v-btn
                color="#2b3137"
                :disabled="!projectDetail.repositoryUrl"
                class="ma-2 white--text"
            >
              Repository
              <v-icon right>
                mdi-github
              </v-icon>
            </v-btn>
          </a>
          <a :href="projectDetail.pdfUrl" target="_blank">
            <v-btn
                color="blue-grey"
                class="ma-2 white--text"
            >
              Presentation
              <v-icon right>
                mdi-cloud-download
              </v-icon>
            </v-btn>
          </a>
        </v-col>
      </v-row>
    </v-parallax>
    <v-row style="position: relative; top: -30px;">
      <v-col cols="3" class="ml-3">
        <v-btn color="warning" rounded elevation="24" @click="this.$emit('vote')">
          Vote
          <v-icon color="red" large>mdi-heart</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="1" class="ml-5">
        <v-btn elevation="24" icon>
          <v-icon large>mdi-share</v-icon>
        </v-btn>
      </v-col>
      <v-spacer/>
      <v-col style="position: relative; top: -20px;">
        <v-avatar size="80">
          <img
              style="border: 3px solid white;"
              :src="projectDetail.logoUrl"
              alt="logo"
          >
        </v-avatar>
      </v-col>
    </v-row>
    <v-row class="pa-4" style="position: relative; top: -40px;">
      <v-card-title>{{ projectDetail.name }}</v-card-title>
      <v-card-text>
        <h4 style="color: #ff9900; font-weight: bold;">Description</h4>
        <div>{{ projectDetail.description }}</div>
        <h4 class="mt-5" style="color: #ff9900; font-weight: bold;">Motivation</h4>
        <div> {{ projectDetail.motivation }}</div>
      </v-card-text>
      <v-card-text class="mt-5" style="padding-bottom: 0;">
        <h4 style="color: #ff9900; font-weight: bold;">Technologies</h4>
        <v-sheet elevation="2">
          <v-chip-group>
            <v-chip
                color="#a64942"
                v-for="tech in projectDetail.tech"
                :key="tech"
            >
              {{ tech }}
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-card-text>

    </v-row>
    <v-row class="pa-3">
      <v-col cols="5">
        <v-card-subtitle>{{ projectDetail.team.name }}</v-card-subtitle>
      </v-col>
      <v-col>
        <v-divider class="mt-5"></v-divider>
      </v-col>
      <v-card-text style="padding-bottom: 0;">
        <v-row style="position: relative; top: -40px;">
          <v-col class="mt-2">
            <v-chip>{{ projectDetail.team.topic }}</v-chip>
          </v-col>
          <v-spacer/>
<!--          <v-col align="right">-->
<!--            <v-avatar-->
<!--                class="mr-2"-->
<!--                v-for="member in projectDetail.team.members"-->
<!--                :key="member._id"-->
<!--                @click="openDetailProfile(member)"-->
<!--                size="40"-->
<!--            >-->
<!--              <img-->
<!--                  :src="member.avatarUrl"-->
<!--                  alt="member.name"-->
<!--              >-->
<!--            </v-avatar>-->
<!--          </v-col>-->
        </v-row>
      </v-card-text>
    </v-row>
    <ProfileDetail v-model="openProfile" :profileDetail="selectedProfile"/>
  </v-card>
</template>

<script>
import ProfileDetail from "@/PersonalPanel/components/ProfileDetail";

export default {
  name: "ProjectDetail",
  props: {
    projectDetail: Object,
  },
  components: {ProfileDetail},
  data() {
    return {
      openProfile: false,
      selectedProfile: null,
    }
  },
  methods: {
    openDetailProfile(profile) {
      this.selectedProfile = profile;
      this.openProfile = true;
    },
  },
  mounted() {
  }
}
</script>

<style scoped>

</style>
