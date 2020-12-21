<template>
  <div class="v-chip--clickable" @click="toAWSVerifiedPage">
    <v-alert
        transition="scale-transition"
        outlined
        type="warning"
        id="alertAWSNotVerified"
    >
      AWS Educate Account has not yet been Verified
    </v-alert>
  </div>

</template>

<script>
export default {
  name: "AWSNotVerified",
  methods: {
    toAWSVerifiedPage() {
      this.$router.push({name: "personal_verification"})
    }
  }
}
</script>
<style lang="scss" scoped>
#alertAWSNotVerified {
  text-align: center;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}

</style>
