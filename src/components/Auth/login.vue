<template>
  <div class="container">
    <v-form v-model="valid">
      <v-container>
        <v-layout>
          <v-flex xs12 md4>
            <v-text-field
                v-model="login.email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md4>
            <v-text-field
                v-model="login.password"
                label="Password"
                required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout class="d-flex flex-row">
          <p>Dont have an account?</p>
          <v-btn class="ml-5">
            <router-link to="/register">click here</router-link>
          </v-btn>
          <v-btn type="submit" class="ml-5">
            Sign in
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
      ]
    };
  },
  computed: {...mapGetters('adminList', ['adminList'])},
  methods: {
    ...mapActions('auth', ['loginByEmailPassword']),
    async loginUser() {
      try {
        await this.loginByEmailPassword(this.login).then(res => {
          localStorage.setItem("jwt", res.token);
          if (res.token) {
            swal("Success", "Login Successful", "success");
            this.adminList.includes(res.user.email) ? this.$router.push("/admin") : this.$router.push("/");
          }
        })
      } catch (err) {
        swal("Error", "Something Went Wrong", "error");
        console.log(err.response);
      }
    }
  }
};
</script>