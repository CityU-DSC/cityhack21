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
          <router-link to="/register" style='text-decoration: none;'>Dont have an account?</router-link>
          <v-spacer/>
          <v-btn @click="loginUser" class="ml-5">
            Sign in
          </v-btn>
        </v-row>
        <v-row v-if='!reverify'>
          <a @click='forgetPasswordPopUp'>Forget password?</a>
          <!-- <a @click='forgetPassword({ email: forgetPassword.email, schoolEmail: forgetPassword.schoolEmail })'>Forget password?</a> -->
        </v-row>
        <div v-if="reverify">
          <v-row>
          <v-btn class="ml-5" @click="resendVerification({ email: login.email })">
            Send verification email again
          </v-btn>
          </v-row>
          <v-row>
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
          </v-row>
        </div>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex';
import Swal from "sweetalert2";

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
      newPassword: "",
      newPasswordConfirm: "",
    };
  },
  computed: {...mapGetters('adminList', ['adminList'])},
  methods: {
    ...mapActions('auth', ['loginByEmailPassword', 'resendVerification', 'verifyUser', 'forgetPassword']),
    async loginUser() {
      await this.loginByEmailPassword(this.login).then(res => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          Swal.fire(
              'Success',
              'Login Successful',
              'success'
          );
          this.adminList.includes(res.user.email) ? this.$router.push("/admin") : this.$router.push("/");
        }
      }).catch(err => {
        if (err.reverify) {
          this.reverify = true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email registered but not verified. Please reverify',
          });
          console.log(err);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Login Failed',
          });
          throw Error(err);
        }
      })
    },
    async verifyCode() {
      try {
        const requestBody = {
          verificationCode: this.verificationCode.split(' ').join('').toUpperCase(),
          email: this.login.email
        }
        if (this.newPassword){
          requestBody.password = this.newPassword;
        }

        const {token} = await this.verifyUser(requestBody);

        if (token) {
          localStorage.setItem("jwt", token);
          Swal.fire(
              'Success',
              'Registration Was successful',
              'success'
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    },
    forgetPasswordPopUp(){
      // Swal.fire({
      //   title: 'Forget password?',
      //   input: 'email',
      //   inputPlaceholder: 'email',
      //   showCancelButton: true,
      // }).then(
      //   console.log
      // )
      Swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Question 1',
          text: 'Chaining swal2 modals is easy',
          input: 'email',
          inputPlaceholder: 'email',
        },
        {
          input: 'text',
          inputPlaceholder: '',
          preConfirm: input=>{
            console.log(input)
            // throw 'Error'
            return false;
          }
        },
        'Question 3'
      ]).then((result) => {
        if (result.value) {
          const answers = JSON.stringify(result.value)
          Swal.fire({
            title: 'All done!',
            html: `
              Your answers:
              <pre><code>${answers}</code></pre>
            `,
            confirmButtonText: 'Lovely!'
          })
        }
      })
    }
  }
};
</script>
