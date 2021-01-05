<template>
  <v-card>
    <v-tabs
        background-color="#ff9900"
        color="white"
        v-model="tab"
        show-arrows
    >
      <v-tabs-slider color="white"></v-tabs-slider>
      <v-tab
          v-for="(tab, index) in tabs"
          :key="index"
          @click="currentTab = index"
      > {{ tab }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <user-table v-if="currentTab===0"/>
    </v-tabs-items>
  </v-card>
</template>

<script>
import userTable from "@/components/Admin/userTable";
export default {
  name: "adminNavBar",
  components: {
    userTable,
  },
  data() {
    return {
      tabs: ['Users List', 'Teams List', 'Logs List'],
      currentTab: 0,
      tab: null,
    }
  }
}
</script>

<style scoped>

</style>
