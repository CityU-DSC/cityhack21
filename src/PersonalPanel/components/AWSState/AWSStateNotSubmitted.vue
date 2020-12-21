<template>
  <div class="v-chip--clickable" @click="toAWSVerifiedPage">
    <v-alert
        transition="scale-transition"
        dense
        type="warning"
        id="AWSStateNotSubmitted"
    >
      AWS Educate Verification hasn't been Uploaded
    </v-alert>
  </div>

</template>

<script>
export default {
  name: "AWSStateNotSubmitted",
  methods: {
    toAWSVerifiedPage() {
      this.$router.push({name: "personal_verification"})
    }
  }
}
</script>
<style lang="scss" scoped>
#AWSStateNotSubmitted {
  text-align: center;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}

</style>
