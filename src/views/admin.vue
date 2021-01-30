<template>
  <v-container>
    <admin-nav-bar/>
  </v-container>
</template>

<script>
import adminNavBar from "@/components/Admin/adminNavBar";
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "admin",
  components: {
    adminNavBar
  },
  computed: {
    ...mapGetters('adminList', ['adminList']),
    ...mapGetters('auth', ['currentUser']),
  },
  methods: {...mapActions("auth", ["init"]),},
  async mounted() {
    if (!(await this.init())) {
      this.$router.push("/");
      return;
    }
    console.log(this.currentUser);
    if( !this.adminList.includes(this.currentUser.email) ){
      this.$router.push({name: "home"})
    }
  }
}
</script>

<style scoped>

</style>
