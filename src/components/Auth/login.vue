<template>
  <div class="container">
    <v-form>
      <v-container class="mt-5" style="width: 600px;">

            <v-text-field
                v-model="login.email"
                :rules="emailRules"
                label="PERSONAL E-mail"
                required
                outlined
            ></v-text-field>
            <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="login.password"
                label="Password"
                required
                outlined
            ></v-text-field>
        <v-row>
          <p>Dont have an account?</p>
          <v-spacer />
          <v-btn class="ml-5">
            <router-link to="/register">click here</router-link>
          </v-btn>
          <v-btn @click="loginUser" class="ml-5">
            Sign in
          </v-btn>
        </v-row>
        <v-layout v-if="reverify">
          <v-btn class="ml-5" @click="resendVerification({ email: login.email })">
            Send verification email again
          </v-btn>
          <v-text-field
              label="Verification Code"
              v-model="verificationCode"
              class="mx-2"
              counter
              prepend-inner-icon="mdi-key"
              outlined
          ></v-text-field>
          <v-btn color="primary" style="margin-right: 2rem;" @click="verifyCode()">
            Continue
          </v-btn>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import swal from "sweetalert";

export default {
  name: 'login',
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      reverify: false,
      verificationCode: "",
      showPassword: false,
    };
  },
  computed: {...mapGetters('adminList', ['adminList'])},
  methods: {
    ...mapActions('auth', ['loginByEmailPassword', 'resendVerification', 'verifyUser']),
    async loginUser() {
      await this.loginByEmailPassword(this.login).then(res => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          swal("Success", "Login Successful", "success");
          this.adminList.includes(res.user.email) ? this.$router.push("/admin") : this.$router.push("/");
        }
      }).catch(err => {
        if (err.reverify) {
          this.reverify = true;
          swal("Error", "Email registered but not verified. Please reverify", "error");
          console.log(err);
        } else {
          swal("Error", "Login Failed", "error");
          throw Error(err);
        }
      })
    },
    async verifyCode() {
      try {
        const { token } = await this.verifyUser({ verificationCode: this.verificationCode.split(' ').join(''), email: this.login.email });

        if (token) {
          localStorage.setItem("jwt", token);
          swal("Success", "Registration Was successful", "success");
        } else {
          swal("Error", "Something Went Wrong", "error");
        }
      } catch (err) {
        console.log(err);
        if (err.err && err.message) {
          swal("Error", err.message, "error");
        } else {
          swal("Error", "Something Went Wrong", "error");
        }

      }
    }
  }
};
</script>
