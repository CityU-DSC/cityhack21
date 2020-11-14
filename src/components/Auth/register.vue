<template>
  <div class="container">
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
      register: {
        name: "",
        email: "",
        password: ""
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