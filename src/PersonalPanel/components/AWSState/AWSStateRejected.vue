<template>
  <div class="v-chip--clickable" @click="toAWSVerifiedPage">
    <v-alert
        transition="scale-transition"
        outlined
        type="error"
        id="alertAWSRejected">
      AWS Educate Account verification has been rejected
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "AWSRejected",
  methods: {
    toAWSVerifiedPage() {
      this.$router.push({name: "personal_verification"})
    }
  }
}
</script>
<style lang="scss" scoped>
#alertAWSRejected {
  text-align: center;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}

</style>
