<template>
  <div class="container">
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Personal Information
        <small>Pleas fill in your personal information.</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col>
                <v-row>
                  <v-text-field
                      label="First Name"
                      v-model="submission.firstName"
                      :rules="[rules.required]"
                      class="mx-2"
                      prepend-inner-icon="mdi-alien"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      label="Surname"
                      v-model="submission.lastName"
                      :rules="[rules.required]"
                      prepend-inner-icon="mdi-alien-outline"
                      class="mx-2"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      label="Nickname"
                      v-model="submission.nickName"
                      class="mx-2"
                      prepend-inner-icon="mdi-alpha-n-box-outline"
                      outlined
                  ></v-text-field>
                </v-row>
                <v-row class="mt-5 mb-5">
                  <v-select
                      label="University"
                      v-model="submission.university"
                      :items="universities"
                      :rules="[rules.required]"
                      class="mx-2"
                      outlined
                  ></v-select>
                  <v-text-field
                    label="Major/Programme"
                    v-model="submission.majorProgram"
                    class="mx-2"
                    outlined
                  ></v-text-field>
                </v-row>
                <v-slider
                    label="Academic Year"
                    v-model="submission.year"
                    :tick-labels="years"
                    :max="years.length - 1"
                    class="mt-5 mb-5"
                    prepend-icon="mdi-school-outline"
                    step="1"
                    ticks="always"
                    tick-size="5"
                ></v-slider>
                <v-row class="mt-5 mb-5">
                  <vue-tel-input-vuetify
                      label="Phone Number"
                      :rules="[rules.required, rules.numeric, rules.length]"
                      v-model="submission.number"
                      type="number"
                      class="mx-2 mr-5"
                      blur
                      prepend-icon="mdi-cellphone"
                  ></vue-tel-input-vuetify>
                  <v-text-field
                      label="CityU SID (if applicable)"
                      v-mode="submission.eid"
                      :rules="[rules.numeric, rules.length]"
                      class="ml-5 mx-2"
                      prepend-inner-icon="mdi-card"
                      single-line
                  ></v-text-field>
                </v-row>
                <v-row class="mt-5 mb-5">
                  <v-text-field
                      label="School Email Address"
                      :rules="[rules.required]"
                      v-model="submission.schoolAddress"
                      class="mx-2 mr-5"
                      prepend-icon="mdi-email"
                      single-line
                  ></v-text-field>
                  <v-text-field
                      label="Confirm School Email Address"
                      :rules="[rules.required, validation.schoolAddress]"
                      class="mx-2 ml-5"
                      prepend-icon="mdi-email-check-outline"
                      single-line
                  ></v-text-field>
                </v-row>
                <v-row class="mt-5 mb-5">
                  <v-text-field
                      label="Personal Email Address"
                      :rules="[rules.required]"
                      v-model="submission.personalAddress"
                      class="mx-2 mr-5"
                      prepend-icon="mdi-at"
                      suffix="@gmail.com"
                      single-line
                  ></v-text-field>
                  <v-text-field
                      label="Confirm Personal Email Address"
                      :rules="[rules.required, validation.personalAddress]"
                      class="mx-2 ml-5"
                      prepend-icon="mdi-email-check"
                      suffix="@gmail.com"
                      single-line
                  ></v-text-field>
                </v-row>
<!--                <v-radio-group-->
<!--                    label="Have you joined a team?"-->
<!--                    v-model="submission.joinedTeam"-->
<!--                    row-->
<!--                    :rules="[rules.required]"-->
<!--                >-->
<!--                  <v-radio-->
<!--                      class="ml-5"-->
<!--                      label="Yes"-->
<!--                      value="true"-->
<!--                  ></v-radio>-->
<!--                  <v-radio-->
<!--                      label="No"-->
<!--                      value="false"-->
<!--                  ></v-radio>-->
<!--                </v-radio-group>-->
<!--                <vuetify-google-autocomplete-->
<!--                    ref="submission.address"-->
<!--                    id="map"-->
<!--                    append-icon="mdi-search"-->
<!--                    classname="form-control"-->
<!--                    country="hk"-->
<!--                    placeholder="Please type your address"-->
<!--                    v-on:placechanged="getAddressData"-->
<!--                >-->
<!--                </vuetify-google-autocomplete>-->
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-btn color="primary" style="margin-right: 2rem" @click="e6 = 2">
          Continue
        </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        Email Verification
        <small>The Verification code has been sent to your personal email</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-btn color="primary" style="margin-right: 2rem" @click="e6 = 3">
          Continue
        </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Account Setting
        <small>Please set up your password for entering CityHack21 personal panel, AccountId is same as your NickName</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-btn color="primary" style="margin-right: 2rem;" @click="e6 = 1">
          Continue
        </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <div class="row">
        <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1"></div>
      </div>

      <v-btn
        color="primary"
        style="margin-right: 2rem; margin-left: 5rem"
        @click="registerNewUser"
        >Submit</v-btn
      >
      <v-btn text @click="reset">Reset</v-btn>
    </v-stepper>

    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1"></div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import { mapActions } from "vuex";

export default {
  name: "register",
  components: {
  },
  data() {
    return {
      submission: {
        firstName: "",
        lastName: "",
        nickName: "",
        university: "",
        eid: "",
        year: "",
        majorProgram: "",
        number: "",
        schoolAddress: "",
        personalAddress: "",
        joinedTeam: "",
        address: "",
      },
      universities: [
        "City University of Hong Kong",
        "Hong Kong Baptist University",
        "The Chinese University of Hong Kong",
        "The Hong Kong Polytechnic University",
        "The Hong Kong University of Science and Technology",
        "The University of Hong Kong",
      ],
      years: ["Year 1", "Year 2", "Year 3", "Year 4", "> Year 4", "Graduated", "Postgrad"],
      options: ["Yes", "No"],
      rules: {
        required: (value) => !!value || "Required.",
        numeric: (value) => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || "Invalid Student ID.";
        },
        length: (value) =>
          value.length == 0 || value.length == 8 || "Should be 8 characters",
      },
      validation: {
        schoolAddress: (value) =>
          value == this.submission.schoolAddress ||
          "Different from the previous field",
        personalAddress: (value) =>
          value == this.submission.personalAddress ||
          "Different from the previous field",
      },
      e6: 1,
    };
  },

  methods: {
    ...mapActions("auth", ["registerUser"]),
    // getAddressData(addressData) {
    //   this.submission.address = addressData;
    // },
    async registerNewUser() {
      try {
        await this.registerUser(this.register).then((res) => {
          let token = res.token;
          if (token) {
            localStorage.setItem("jwt", token);
            this.$router.push("/login");
            swal("Success", "Registration Was successful", "success");
          } else {
            swal("Error", "Something Went Wrong", "error");
          }
        });
      } catch (err) {
        console.log(err);
        let error = err.response;
        if (error.status && error.status === 409) {
          swal("Error", error.data.message, "error");
        } else {
          swal("Error", error.data.err.message, "error");
        }
      }
    },
    reset() {

    },
  },
  mounted() {
    this.$refs.address.focus();
  },
};
</script>
