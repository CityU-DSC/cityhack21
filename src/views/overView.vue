<template>
  <div>
    <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
    <div class="my-nav ml-5 v-chip--clickable">
      <v-card>
        <v-navigation-drawer
            :value="drawer"
            :permanent="$vuetify.breakpoint.lgAndUp"
            :expand-on-hover="$vuetify.breakpoint.lgAndUp"
            app
            @input="setDrawer"
            width="325"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title navCityHacktitle"> City Hack 2021 </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="mt-5 mb-5"></v-divider>
          <v-list>
            <v-list-item v-for="item in menu" :key="item.id" @click="navigateTo(item.id);">
              <v-list-item-icon><v-icon>{{item.icon}}</v-icon></v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </div>
    <full-page :options="options" id="fullpage" ref="fullpage">
      <div id="aboutUs" class="section">
        <AboutUs :isOverView="true" @next="nextPage" @last="lastPage"/>
      </div>
      <div id="rulesAndCriteria" class="section">
        <RulesAndCriteria :isOverView="true" @next="nextPage" @last="lastPage"/>
      </div>
      <div id="timeLine" class="section">
        <TimeLine :isOverView="true" @next="nextPage" @last="lastPage"/>
      </div>
      <!--			<div id="prizes" class="section">-->
      <!--				<Prizes :isOverView="true" @next="nextPage" @last=lastPage/>-->
      <!--			</div>-->
      <div id="QandA" class="section">
        <QandA :isOverView="true" @next="nextPage" @last="lastPage"/>
      </div>
      <!--			<div id="judges" class="section">-->
      <!--				<Judges :isOverView="true" @next="nextPage" @last=lastPage/>-->
      <!--			</div>-->
      <div id="sponsors" class="section fp-auto-height-responsive">
        <Sponsors :isOverView="true" @next="nextPage" @last="lastPage"/>
      </div>
    </full-page>
  </div>
</template>

<script>
import AboutUs from '../components/landingPage/aboutUs';
import TimeLine from '../components/landingPage/timeLine';
// import Judges from '../components/landingPage/judges';
// import Prizes from '../components/landingPage/prizes';
import RulesAndCriteria from '../components/landingPage/rulesAndCriteria';
import Sponsors from '../components/landingPage/sponsors';
import QandA from '../components/landingPage/QandA';
import {mapGetters, mapMutations} from 'vuex';
import "../../node_modules/timeline-vuejs/dist/timeline-vuejs.css";

export default {
  name: 'overView',
  components: {
    AboutUs,
    TimeLine,
    // Judges,
    // Prizes,
    RulesAndCriteria,
    Sponsors,
    QandA,
  },
  computed: {
    // eslint-disable-next-line no-mixed-spaces-and-tabs
    ...mapGetters('menu', ['drawer']),
  },
  data() {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HEERE',
        menu: '#menu',
        autoScrolling: true,
        fitToSection: true,
      },
      menu: [
        {id: 1, title: "About CityHack", icon: 'mdi-information'},
        {id: 2, title: "Rules & Judging Criteria", icon: 'mdi-gavel'},
        {id: 3, title: "Timeline", icon: 'mdi-chart-timeline-variant-shimmer'},
        {id: 4, title: "Q&As", icon: 'mdi-frequently-asked-questions'},
        {id: 5, title: "Sponsors", icon: 'mdi-account-group-outline'},
      ],
    };
  },
  methods: {
    ...mapMutations('menu', ['setDrawer']),
    nextPage(){
      this.$refs.fullpage.api.moveSectionDown();
    },
    lastPage() {
      this.$refs.fullpage.api.moveSectionUp();
    },
    navigateTo(e){
      this.$refs.fullpage.api.moveTo(e);
      this.setDrawer(false);
    },
  },
};
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
