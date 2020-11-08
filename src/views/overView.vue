<template>
  <v-row>
    <v-col class="mt-2 pl-5" cols="12" sm="1" lg="2">
      <scrollactive class="my-nav" active-class="active">
        <ul>
          <li><a href="#aboutUs" class="scrollactive-item">About CityHack</a></li>
          <li><a href="#rulesAndCriteria" class="scrollactive-item">Rules & Judging Criteria</a></li>
          <li><a href="#timeLine" class="scrollactive-item">TimeLine</a></li>
          <li><a href="#prizes" class="scrollactive-item">Prizes</a></li>
          <li><a href="#QandA" class="scrollactive-item">Q&As</a></li>
          <li><a href="#judges" class="scrollactive-item">Judges</a></li>
          <li><a href="#sponsors" class="scrollactive-item">Sponsors</a></li>
        </ul>
      </scrollactive>
    </v-col>
    <v-col cols="12" sm="11" lg="10">
      <div style="padding-bottom: 8rem;" id="aboutUs"><AboutUs /></div>
      <div style="padding-bottom: 8rem;" id="rulesAndCriteria"><RulesAndCriteria /></div>
      <div style="padding-bottom: 8rem;" id="timeLine"> <TimeLine /></div>
      <div style="padding-bottom: 8rem;" id="prizes"><Prizes /></div>
      <div style="padding-bottom: 8rem;" id="QandA"><QandA /></div>
      <div style="padding-bottom: 8rem;" id="judges"><Judges /></div>
      <div style="padding-bottom: 8rem;" id="sponsors"><Sponsors /></div>
    </v-col>
  </v-row>
</template>

<script>
import AboutUs from "../components/landingPage/aboutUs";
import TimeLine from "../components/landingPage/timeLine";
import Judges from "../components/landingPage/judges";
import Prizes from "../components/landingPage/prizes";
import RulesAndCriteria from "../components/landingPage/rulesAndCriteria";
import Sponsors from "../components/landingPage/sponsors";
import QandA from "../components/landingPage/QandA";

export default {
  name: "overView",
  components: {
    AboutUs,
    TimeLine,
    Judges,
    Prizes,
    RulesAndCriteria,
    Sponsors,
    QandA,
  },
  methods: {
    // onItemChanged(event, currentItem, lastActiveItem){
    //   console.log(event, currentItem, lastActiveItem);
    // }
  },
}
</script>

<style lang="scss" scoped>
.active {
  color: #e74d08;
}
ul {
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: start;
  list-style-type: none;

  li {
    padding: 6px 0;

    a {
      position: relative;
      display: block;
      font-size: larger;
      padding: 4px 0;
      font-family: Lato, sans-serif;
      color: #000000;
      text-decoration: none;
      text-transform: uppercase;
      transition: 0.5s;

      &::after {
        position: absolute;
        content: "";
        top: 100%;
        left: 0;
        width: 100%;
        height: 3px;
        background: #e74d08;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s;
      }

      &:hover {
        color: #e74d08;
      }

      &:hover::after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
}

</style>