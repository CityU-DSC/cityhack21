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
      <TeamTable v-else-if="currentTab===1"/>
      <ProjectsList v-else-if="currentTab===2" />
      <AWSTable v-else-if="currentTab===3" />
    </v-tabs-items>
  </v-card>
</template>

<script>
import userTable from "@/components/Admin/userTable";
import TeamTable from "@/components/Admin/TeamTable";
import ProjectsList from "@/components/Admin/ProjectsList";
import AWSTable from "@/components/Admin/AWSTable";

export default {
  name: "adminNavBar",
  components: {
    userTable,
    TeamTable,
    ProjectsList,
    AWSTable,
  },
  data() {
    return {
      tabs: ['Users List', 'Teams List', 'Projects List', 'AWSEducate List'],
      currentTab: 0,
      tab: null,
    }
  }
}
</script>

<style scoped>

</style>
