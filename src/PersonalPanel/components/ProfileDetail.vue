<template>
  <v-dialog v-model="show" max-width="500px">
    <v-row justify="space-around">
      <v-card>
        <v-img
          height="200px"
          src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Fdear.jpg?alt=media&token=21d888e4-f980-42f0-8770-4bdca6f0be16"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-spacer></v-spacer>

            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  class="v-chip--clickable"
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img alt="profileAvatar" :src="currentProfile.avatarUrl" />
            </v-avatar>
            <p class="ml-3">
              {{ currentProfile.name }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
            <h3 style="color: #ff9900;" class="ma-4">Personal Information</h3>
          <v-row class="mb-3">
            <span class="font-weight-bold ml-8 mr-3">AccountId:</span>
            <span>{{ currentProfile.accountId }}</span>
            <span class="font-weight-bold ml-8 mr-3">Email:</span>
            <span>{{ currentProfile.email }}</span>
          </v-row>
          <v-row class="mb-3">
            <span class="font-weight-bold ml-8 mr-3">Nick Name:</span>
            <span>{{ currentProfile.nickName }}</span>
            <span class="font-weight-bold ml-8 mr-3">First Name:</span>
            <span>{{ currentProfile.firstName }}</span>
          </v-row>
          <v-divider class="mx-4" />
          <h3 style="color: #ff9900;" class="ma-4">School Information</h3>
          <v-row>
            <div class="font-weight-bold ml-8 mr-3">School:</div>
            <div>{{ currentProfile.university }}</div>
          </v-row>
          <v-row>
            <div class="font-weight-bold ml-8 mr-3">SchoolEmail:</div>
            <div>{{ currentProfile.schoolEmail }}</div>
          </v-row>
          <v-row>
            <div class="font-weight-bold ml-8 mr-3">Major:</div>
            <div>{{ currentProfile.majorProgram }}</div>
          </v-row>
          <v-row class="mb-3">
            <div class="font-weight-bold ml-8 mr-3">Year:</div>
            <div>{{ currentProfile.year }}</div>
          </v-row>
          <v-divider class="mx-4" />
        </v-card-text>
        <v-card-text>
          <v-chip class="ml-4" color="green" outlined>
            <v-icon left> mdi-account-check-outline </v-icon>
            Email Verified
          </v-chip>
          <v-chip class="ml-4" color="#ff9900" outlined>
            <v-icon left> mdi-aws </v-icon>
            AWS Educate
          </v-chip>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-spacer />
            <v-btn color="#a64942" class="ma-2" @click.stop="show = false">Close</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-dialog>
</template>

<script>
export default {
  name: "ProfileDetail",
  props: {
    value: Boolean,
    profileDetail: Object,
  },
  data() {
    return {
      currentProfile: null,
      items: [{ title: "Click Me" }, { title: "Click Me" }],
    };
  },
  watch: {
    profileDetail(newV) {
      this.currentProfile = newV;
    },
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
