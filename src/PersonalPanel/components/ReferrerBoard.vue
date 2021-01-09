<template>
  <v-col>
    <v-data-table
        :headers="headers"
        :items="referrers"
        @click:row="openDetailProfile"
        class="elevation-1 clickable"
        :pagination.sync="pagination"
    >
      <template v-slot:items="props">
        <td>{{ props.items.id }}</td>
        <td>{{ props.item.accountId }}</td>
        <td class="text-xs-right">{{ props.item.referrerCount }}</td>
      </template>
    </v-data-table>
    <ProfileDetail v-model="openProfile" :profileDetail="selectedProfile"/>
  </v-col>
</template>

<script>
import ProfileDetail from "@/PersonalPanel/components/ProfileDetail";
import {mapActions} from 'vuex';

export default {
  name: "ReferrerBoard",
  components: {
    ProfileDetail,
  },
  data() {
    return {
      pagination: {
        page: 1,
      },
      headers: [
        {text: "Ranking", value: 'id'},
        {text: "Account ID", align: "left", value: "accountId"},
        {text: "Referrer Count", value: "referrerCount"},
      ],
      referrers: [],
      openProfile: false,
      selectedProfile: null,
    }
  },
  watch: {
    referrers(newVal) {
      this.referrers = newVal
    }
  },
  methods: {
    ...mapActions('users', ['listReferrers']),
    openDetailProfile(profile) {
      this.selectedProfile = profile;
      this.openProfile = true;
    },
  },
  async mounted() {
    await this.listReferrers().then(res => this.referrers = res.referrers);
    await this.referrers.map((item, idx) => item.id = idx + 1);
  },
}
</script>

<style scoped>

</style>
