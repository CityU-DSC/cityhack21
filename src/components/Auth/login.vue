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
    sendReVerifyEmail(inputValue){
      this.forgetPassword({email: inputValue}).catch(()=>console.error());
      this.login.email = inputValue;
      const ipAPI = '//api.ipify.org?format=json';
      return fetch(ipAPI);
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
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showLoaderOnConfirm: true,
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          text: 'Please input your personal email',
          input: 'email',
          inputPlaceholder: 'personal email...',
          inputValidator: value => {if (!value) { return "Empty Field Error";}},
          preConfirm: (inputValue) => {
            return this.sendReVerifyEmail(inputValue).then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response
            }).catch(error => Swal.showValidationMessage(`Request failed: ${error}`))
          }
        },
        {
          text: 'Verification code has sent to your personal email',
          input: 'text',
          inputPlaceholder: 'verification code...',
          inputValidator: value => {if (!value) { return "Empty Field Error";}},
        },
        {
          title: 'Verification success!',
          text: 'Please Input your new password',
          input: 'text',
          inputPlaceholder: 'new password',
          inputValidator: value => {
            if (!value) { return "Empty Field Error";}
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
            if(!pattern.test(value)) {return "At least one capital letter, and a number.";}
          },

        },
      ]).then((result) => {
        if (result.value) {
          console.log(result.value);
          const params = {
            verificationCode: (result.value[1]).split(' ').join(''),
            email: this.login.email,
            password: result.value[2],
          };
          this.verifyUser(params).then(()=> {
            Swal.fire(
                'Don\'t forget again Orz',
                'Password has been reset!!',
                'success',
            );
          });
        }
      })
    }
  }
};
</script>
