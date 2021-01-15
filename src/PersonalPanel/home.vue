<template>
  <v-container>
    <nav-drawer @direct="directTo"/>
    <v-row style="margin-top: 10rem">
      <clock/>
    </v-row>
    <v-row>
      <v-col>
        <v-col>
          <h3 class="mb-5">Notification</h3>
          <AWSStateNotSubmitted v-if="this.verificationStatus === 'not submitted'"/>
          <AWSNotVerified v-else-if="this.verificationStatus === 'pending'"/>
          <AWSVerified v-else-if="this.verificationStatus === 'success'"/>
          <AWSRejected v-else/>
        </v-col>
      </v-col>

      <v-col class="ml-5">
        <h3 class="mb-5">Referrer Board</h3>
        <ReferrerBoard/>
      </v-col>
    </v-row>
    <v-row class="ml-4">
      <v-col class="mt-5">
        <h3 class="mb-5">Rules & Terms</h3>
        <v-list>
          <v-list-group
              v-for="item in items"
              :key="item.title"
              v-model="item.active"
              :prepend-icon="item.action"
              no-action
              color="#ff9900"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
                v-for="child in item.items"
                :key="child.title"
            >
              <v-list-item-icon>
                <v-icon color="#778899">mdi-ruler</v-icon>
              </v-list-item-icon>
              <v-list-item-content style="color: #a9a9a9;" v-html="child.title">
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
    <guide v-model="showAWSGuide" v-if="this.verificationStatus === 'not submitted'"/>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";

import navDrawer from "@/PersonalPanel/components/navDrawer";
import clock from "@/PersonalPanel/components/Timer";
import guide from "@/PersonalPanel/components/awsVerifyGuide";
import AWSNotVerified from "@/PersonalPanel/components/AWSState/AWSStateNotVerified";
import AWSVerified from "@/PersonalPanel/components/AWSState/AWSStateVerified";
import AWSRejected from "@/PersonalPanel/components/AWSState/AWSStateRejected";
import AWSStateNotSubmitted from "@/PersonalPanel/components/AWSState/AWSStateNotSubmitted";
import {mapGetters} from "vuex";
import ReferrerBoard from "@/PersonalPanel/components/ReferrerBoard";

export default {
  name: "home",
  components: {
    navDrawer,
    clock,
    AWSNotVerified,
    AWSVerified,
    AWSRejected,
    AWSStateNotSubmitted,
    ReferrerBoard,
    guide
  },
  data() {
    return {
      undoList: [
        {name: "Upload AWS Educate Image", show: true},
        {name: "Update Profile Page", show: true},
        {name: "Attend Discord Grpoup", show: false},
      ],
      showAWSGuide: false,
      items: [
        {
          action: 'mdi-account-group',
          active: true,
          items: [
            {title: 'Every student (Bachelor’s Degree Year 1 - 5, Master’s Degree, PhD Degree, Fresh Graduate, Alumni)  from all universities are welcomed.'},
            {title: 'It is a competition tailored for Hong Kong University students (including locals and non-locals). However, participants from other oversea universities are allowed as well. But please note that the participants from other oversea universities may not be eligible to receive the souvenirs and prizes.'},
            {title: 'A team should be composed of  3 - 5 members, over half of the HK university students (local or non-local) is required.'},
            {title: 'Teams with non-CityU students are not allowed to use Huawei Atlas 200 DK, since the provided physical room is located in CityU and open to CityU students only.'},
            {title: 'The team-up session will be conducted on the personal panel of the website by 28th Jan. Please create a team with more than 2 members or join any public group by the end of 28th Jan. We are not responsible for finding a team for any participant.'},
            {title: 'Every team needs to prepare their own equipment such as laptops, mobile phones, and chargers. For teams that are using Atlas 200 DK, we’ll only provide the boards and USB drives (if needed).'},
          ],
          title: 'Participants & Teams',
        },
        {
          action: 'mdi-projector',
          items: [
            {title: 'Although the theme will be announced on 18th Jan, participants should only start working on the project on 30th Jan.'},
            {title: 'Projects must be submitted before the given deadline. Once the deadline is over, any modification and resubmission are not allowed.'},
            {title: 'If the projects are lost, submitted for the delay, or delivered incorrectly, the organizer, implementing partner, and co-organizer will not bear any responsibility.'},
            {title: 'Projects must not have any obscenity, violence, pornography, jealousy, bad consciousness, insulting elements, or any controversial or inappropriate content. The organizer reserves the right to cancel the qualifications without further notice to the participants.'},
            {title: 'Participants must ensure that the work is original and has not been published, the code will be verified by a programming code checker. It is strictly forbidden to steal or use other people\'s works. Projects may not infringe on the intellectual property or privacy of others. If there is any violation, it will be canceled or eligible for the award. If there is any violation of the law, the organizer, implementing partner, and co-organizer will not bear any relevant legal responsibilities.'},
            {title: 'Projects must be responsible for obtaining legal authorization if they refer to other people\'s works as materials, such as music, images, videos, or video clips. If necessary, the organizer/co-organizer may require the entrant to provide written authorization of legal authorization.'},
            {title: 'The results of the competition are determined by the competition jury. Participants and others are not allowed to object to the results and awards.'},
            {title: 'If the project is found to be in violation after the award, the organizer reserves the right to cancel the project of the offender and withdraw the prizes/souvenirs.'},
          ],
          title: 'Competition & Project Submission Rules',
        },
        {
          action: 'mdi-cellphone-link',
          items: [
            {title: 'Participants must register and form a team of at least 3 members first, then confirm that they’ll use Atlas 200 DK in the competition'},
            {title: 'Participants must be physically in HK (as we will require you to return the board right after the competition ends)'},
            {title: 'There must be at least one CityU student in the team. Only CityU students can borrow the Atlas'},
            {title: 'Only ONE session will be opened for borrowing the Atlas in CityU Student Residence'},
            {title: 'The borrowing session will be soon announced after the registration period ends.'},
          ],
          title: 'Atlas 200 DK Borrowing Rules',
        },
        {
          action: 'mdi-ruler-square-compass',
          items: [
            {title: 'Organizers, implementing partners, and co-organizers have the right to use, publish, or display the entrant\'s information (including their name, school name, and photos) for promotional purposes.'},
            {title: 'Winners must agree to accept any form of interview or promotional event arranged by the organizer, implementing partner, and co-organizer without charge.'},
            {title: 'The organizer reserves the right to change and amend the terms and conditions of the competition and has the final decision on the outcome of the competition. No one can object.'},
            {title: 'If there are too many participants, the organizer has the right to close the registration and make a preliminary selection.'},
          ],
          title: 'Others',
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
    ...mapGetters("aws_verify", ["verificationStatus"]),
    timeline() {
      return this.events.slice().reverse();
    },
  },
  methods: {
    ...mapActions("auth", ["init"]),
    ...mapActions("aws_verify", ["isAWSVerified"]),

    directTo(page) {
      this.$router.push(page);
    },
  },
  async mounted() {
    if (!(await this.init())) {
      this.$router.push("/");
      return;
    }
    await this.isAWSVerified();
    this.showAWSGuide = true;
  },
};
</script>

<style lang="scss" scoped>
span {
  color: #ff9900;
  font-weight: bold;
}
</style>
