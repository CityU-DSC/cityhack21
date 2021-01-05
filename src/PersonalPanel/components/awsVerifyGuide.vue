<template>
  <v-dialog class="mx-auto" v-model="show" max-width="600px">
    <v-card>
      <v-card-title class="font-weight-bold">
        Guide to Uploading AWS Educate Image
      </v-card-title>
      <v-card-title class="subtitle-1">
        Step 1: Register an AWS Educate account
      </v-card-title>
      <v-card-text>
        <v-btn
            elevation="5"
            outlined
            raised
            small
            rounded
            href="https://www.awseducate.com/registration"
        >
          Registration Website
        </v-btn>
      </v-card-text>
      <v-card-title class="subtitle-1">
        Step 2: Make a screenshot of the AWS Educate profile page
      </v-card-title>
      <v-card-text>
        Please find a reference screenshot in the appendix
        <br>
        <v-btn
            elevation="5"
            outlined
            raised
            small
            class="mt-2"
            rounded
            href="https://www.awseducate.com/student/s/profile"
        >
          AWSEducate Profile Page
        </v-btn>
      </v-card-text>
      <v-card-title class="subtitle-1">
        Step 3: Upload Screenshot on ? page
      </v-card-title>
      <v-card-text>
        <v-btn
            elevation="5"
            outlined
            raised
            small
            rounded
            @click="goToAWSVerificationPage"
        >
          Screenshot Upload Page
        </v-btn>
      </v-card-text>
      <v-card-title primary-title>
        Appendix
      </v-card-title>
      <v-card-text>
        A reference of a screenshot to be uploaded
      </v-card-text>
      <v-img
          contain
          width="700px"
          src="../../assets/image/aws_verification_guide/guideImg.png"
      ></v-img>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="#ff9900" @click.stop="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "guide",
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    goToAWSVerificationPage() {
      this.$router.push("/personal/verification");
    },
    goToAWSPersonalPage() {
      this.$router.push("https://www.awseducate.com/student/s/profile");
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

