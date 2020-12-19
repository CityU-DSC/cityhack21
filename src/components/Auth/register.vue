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
                <v-text-field
                  label="First Name"
                  v-model="submission.firstName"
                  :rules="[rules.required]"
                  shaped
                  filled
                ></v-text-field>
                <v-text-field
                  label="Surname"
                  v-model="submission.lastName"
                  :rules="[rules.required]"
                  shaped
                  filled
                ></v-text-field>
                <v-text-field
                  label="Nickname"
                  v-model="submission.nickName"
                  shaped
                  filled
                ></v-text-field>
                <v-select
                  label="University"
                  v-model="submission.university"
                  :items="universities"
                  :rules="[rules.required]"
                  shaped
                  filled
                ></v-select>
                <v-text-field
                  label="Your 8-digit CityU Student ID (if applicable)"
                  v-mode="submission.eid"
                  :rules="[rules.numeric, rules.length]"
                  shaped
                  filled
                ></v-text-field>
                <v-select label="Academic Year" :items="years" shaped filled>
                </v-select>
                <v-text-field
                  label="Major/Programme"
                  v-model="submission.majorProgram"
                  shaped
                  filled
                ></v-text-field>
                <v-text-field
                  label="Phone Number"
                  :rules="[rules.required]"
                  v-model="submission.number"
                  shaped
                  filled
                ></v-text-field>
                <v-text-field
                  label="School Email Address"
                  :rules="[rules.required]"
                  v-model="submission.schoolAddress"
                  shaped
                  filled
                ></v-text-field>
                <v-text-field
                  label="Confirm School Email Address"
                  :rules="[rules.required, validation.schoolAddress]"
                  shaped
                  filled
                ></v-text-field>
                <v-text-field
                  label="Personal Email Address"
                  :rules="[rules.required]"
                  v-model="submission.personalAddress"
                  shaped
                  filled
                ></v-text-field>
                <v-text-field
                  label="Confirm Personal Email Address"
                  :rules="[rules.required, validation.personalAddress]"
                  shaped
                  filled
                ></v-text-field>
                <v-select
                  label="Have you joined a team?"
                  :items="options"
                  :rules="[rules.required]"
                  v-model="submission.joinedTeam"
                  shaped
                  filled
                ></v-select>
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
        Team Information
        <small>Please write down your team information here</small>
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-btn color="primary" style="margin-right: 2rem" @click="e6 = 3">
          Continue
        </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Team Information (Preference)
        <small
          >Since you have not joined a team, please choose your ideal positions
          in the team which best fits your knowledge and skills!
        </small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-btn color="primary" style="margin-right: 2rem" @click="e6 = 1">
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
        @click="submit"
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
      },
      universities: [
        "City University of Hong Kong",
        "Hong Kong Baptist University",
        "The Chinese University of Hong Kong",
        "The Hong Kong Polytechnic University",
        "The Hong Kong University of Science and Technology",
        "The University of Hong Kong",
      ],
      years: ["Year 1", "Year 2", "Year 3", "Year 4"],
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
  },
};
</script>
