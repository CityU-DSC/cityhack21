<template>
  <v-col>
    <v-data-table
        :headers="headers"
        :items="referrers"
        @click:row="openDetailProfile"
        class="elevation-1 clickable"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
      </template>
    </v-data-table>
    <ProfileDetail v-model="openProfile" :profileDetail="selectedProfile"/>
  </v-col>
</template>

<script>
import ProfileDetail from "@/PersonalPanel/components/ProfileDetail";

export default {
  name: "ReferrerBoard",
  components: {
    ProfileDetail,
  },
  data(){
    return{
      headers: [
        { text: "Account ID", align: "left", value: "id" },
        { text: "Name", value: "name" },
        { text: "Invitation Number", value: "email" },
      ],
      referrers: [
        {id: 1, name: "Ryan", email: "r@g.com"},
        {id: 2, name: "eerer", email: "r@g.com"},
        {id: 3, name: "4t4yt35", email: "r@g.com"},
      ],
      openProfile: false,
      selectedProfile: null,
    }
  },
  methods: {
    openDetailProfile(profile){
      this.selectedProfile = profile;
      this.openProfile = true;
    },
  },
  mounted() {

  },
}
</script>

<style scoped>

</style>
