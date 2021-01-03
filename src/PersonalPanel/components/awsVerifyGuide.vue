<template>
  <div id="guide">
          <v-content>
          <v-container grid-list-xs>
            <v-layout align-center justify-center>
              <v-flex xs10 >
                <v-card 
                elevation="16"
                shaped>
                <v-card-title primary-title>
                    Guide to Uploading AWS Educate Image
                  </v-card-title>
                  <v-card-title primary-title>
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
                  <v-card-title primary-title>
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
                      rounded
                      href="https://www.awseducate.com/student/s/profile"
                    >
                      AWSEducate Profile Page
                    </v-btn>
                  </v-card-text>
                  <v-card-title primary-title>
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
                    src="../../assets/image/aws_verification_guide/guideImg.png"
                  ></v-img>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
      </v-content>
  </div>
</template>

<script>

export default {
  name: "guide",
  methods:{
    goToAWSVerificationPage(){
      this.$router.push("/personal/verification");
    },
    goToAWSPersonalPage(){
      this.$router.push("https://www.awseducate.com/student/s/profile");
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

