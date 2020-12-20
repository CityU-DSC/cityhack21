<template>
  <div>
    <nav-drawer @direct="directTo" :current="pathName" />
    <div class="content">
      <div class="row">
        <div class="col-md-4 pl-12 ml-12">
          <div class="row">
            <card type="user">
              <p class="card-text">
              </p>
              <div class="author">
                <div>
                  <img class="avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="...">
                  <h5 class="title">{{model.nickname}}</h5>
                </div>
                <p class="description">
                  {{model.teamname}} (Team 0{{teamid}})
                </p>
                <p class="description">
                  {{model.university}}
                </p>
                <p class="description">
                  {{model.email}}
                </p>
              </div>
              <!-- <p></p>
              <p class="card-description">
                {{model.about}}
              </p> -->
            </card>
          </div>
        </div>
        <div class="col-md-8 pl-12 ml-12">
          <div class="row">
            <card>
              <h5 slot="header" class="title">Edit Profile</h5>
              <div class="row">
                <div class="col-md-4">
                  <label for="teamname" >Team Name: </label>
                  <input
                    id="teamname"
                    placeholder="Team"
                    v-model="model.teamname"
                  >
                </div>
                <div class="col-md-4">
                  <label for="nickname"> Nickname: </label>
                  <input
                    id="nickname"
                    placeholder="Nickname"
                    v-model="model.nickname"
                  >
                </div>
                <div class="col-md-4">
                  <label for="email"> Email: </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    v-model="model.email"
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <label for="university" >University: </label>
                  <input
                    id="university"
                    placeholder="University"
                    v-model="model.university"
                  >
                </div>
                <div class="col-md-8">
                  <!-- <label for="about">About Me: </label>
                  <textarea
                    id="about"
                    class="form-control"
                    placeholder="Here can be your description"
                    v-model="model.about"
                  >
                  </textarea>
                  <input
                    id="about"
                    placeholder="About"
                    v-model="model.about"
                  > -->
                </div>
              </div>
              <button @click="save">Save</button>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";

export default {
  name: "personal_profile",
  props: {
      // model: {
      //   type: Object,
      //   default: () => {
      //     return {};
      //   }
      // }
  },
  components: {
    navDrawer,
  },
  data() {
    return {
      pathName: "Profile Page",
      model: {
          teamname: 'teamname',
          nickname: 'name',
          email: 'address@email.com',
          university: 'university',
          about: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
        },
        // user: {
        //   fullName: 'Mike Andrew',
        //   title: 'Ceo/Co-Founder',
        //   description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        // }
    };
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },
  },
};
</script>

<style scoped>
/* .content {
  padding-left: 70px;
} */
input {
  color: #fff;
}
</style>
