<template>
  <div>
    <div class="my-nav ml-5 v-chip--clickable">
      <v-card>
        <v-navigation-drawer
            permanent
            expand-on-hover
            app
            width="325"
        >
          <v-list>
            <v-list-item class="px-1">
              <v-list-item-avatar>
                <v-img :src="currentUser.avatarUrl" alt="avatar-url" ></v-img>
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{currentUser.nickName}}
                </v-list-item-title>
                <v-list-item-subtitle>{{currentUser.email}}</v-list-item-subtitle>
                <v-list-item-subtitle>
                  <v-breadcrumbs :items="items"/>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider class="mt-5 mb-5"></v-divider>
          <v-list>
            <v-list-item v-for="item in menu" :key="item.id" @click="navigateTo(item.page);">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "navDrawer",
  props: {
    pathName: String,
  },
  computed: {
    // eslint-disable-next-line no-mixed-spaces-and-tabs
    ...mapGetters('auth', ['currentUser']),
    ...mapGetters('menu', ['drawer']),
  },
  data() {
    return {
      items: [
        {
          text: 'Landing Page',
          href: '/',
        },
        {
          text: 'Log Out',
          href: '/logout',
        }
      ],
      menu: [
        {id: 1, title: "Home Page", icon: 'mdi-home', page: '/personal'},
        {id: 2, title: "Profile Page", icon: 'mdi-account', page: '/personal/profile'},
        {id: 3, title: "AWS Educate Verification", icon: 'mdi-aws', page: '/personal/verification'},
        // {id: 4, title: "Group", icon: 'mdi-account-group'},
        // {id: 5, title: "File", icon: 'mdi-upload'},
      ],
    };
  },
  methods: {
    ...mapMutations('menu', ['setDrawer']),
    navigateTo(page){
      this.$emit("direct", page);
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: #ff9900;
}

.v-list {
  flex-direction: column;
  align-items: start;
  list-style-type: none;

  .v-list-item {
    font-size: larger;
    color: #000000;
    text-decoration: none;
    text-transform: uppercase;
    transition: 0.5s;

    &::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      min-height: 3px;
      background: #ff9900;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s;
    }

    &:hover {
      color: #ff9900;
    }

    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
}

.navCityHacktitle {
  text-align: center;

  h2 {
    margin-bottom: 0;
  }

  margin-top: 20px;
}

</style>
