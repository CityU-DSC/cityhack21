<template>
  <div>
    <nav-drawer @direct="directTo"/>
  </div>
<div>
    <v-tab-item>
          <v-card flat>
            <v-card-text>
              <h2 class="mb-5">What is Hackathon</h2>
              <p>
                The word “hackathon” is a portmanteau of “hacking marathon”.
              </p>
              <p>
                A hackathon is a design sprint-like event which involves parties with software development background such as computer programmers, graphic designers, interface designers, project managers, and others who collaborate intensively on software projects. The goal of the hackathon is to create functioning software or hardware before the end of the event.
              </p>
            </v-card-text>
          </v-card>
    </v-tab-item>
</div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";

export default {
  name: "AWSVerification",
  components: {
    navDrawer,
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    }
  }
}
</script>

<style scoped>

</style>
