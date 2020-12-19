<template>
  <div class="container">
    <v-stepper v-model="e6" vertical>
      <v-stepper-step
          :complete="e6 > 1"
          step="1"
      >
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
        ></v-card>
        <v-btn
            color="primary"
            @click="e6 = 2"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-step
          :complete="e6 > 2"
          step="2"
      >
        Configure analytics for this app
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
        ></v-card>
        <v-btn
            color="primary"
            @click="e6 = 3"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-step
          :complete="e6 > 3"
          step="3"
      >
        Select an ad format and name ad unit
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
        ></v-card>
        <v-btn
            color="primary"
            @click="e6 = 4"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">
        View setup instructions
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
        ></v-card>
        <v-btn
            color="primary"
            @click="e6 = 1"
        >
          Continue
        </v-btn>
        <v-btn text>
          Cancel
        </v-btn>
      </v-stepper-content>
    </v-stepper>
    <div class="row">
      <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
        <form
            class="text-center border border-primary p-5"
            style="margin-top:70px;height:auto;padding-top:100px !important;"
            @submit.prevent="registerNewUser"
        >
          <input
              type="text"
              id="name"
              class="form-control mb-5"
              placeholder="Name"
              v-model="register.name"
              required
          />
          <input
              type="email"
              id="email"
              class="form-control mb-5"
              placeholder="Email"
              v-model="register.email"
              required
          />
          <!-- Password -->
          <input
              type="password"
              id="password"
              class="form-control mb-5"
              placeholder="Password"
              v-model="register.password"
          />
          <p> Already have an account?<router-link to="/login">click here</router-link>
            <button class="btn btn-primary btn-block w-75 my-4" type="submit">
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert";
import {mapActions} from 'vuex';

export default {
  name: 'register',
  data() {
    return {
      e6: 1,
      register: {
        name: "",
        email: "",
        password: "",
      }
    };
  },
  methods: {
    ...mapActions('auth', ['registerUser']),
    async registerNewUser() {
      try {
        await this.registerUser(this.register).then(res => {
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
    }
  }
};
</script>
