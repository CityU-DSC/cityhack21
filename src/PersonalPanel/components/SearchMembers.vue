<template>
  <div>
    <v-card flat>
      <v-card-text> Search Members</v-card-text>
      <v-col>
        <v-form ref="membersSearch">
          <v-row class="mx-1">
            <v-text-field
              v-model="searchMemberName"
              label="Name"
              class="mr-3"
              clearable
            ></v-text-field>
            <v-text-field
              v-model="searchMemberAccountId"
              label="AccountId"
              class="mr-3"
              clearable
            ></v-text-field>
            <v-text-field
              v-model="searchMemberEmail"
              label="Email"
              clearable
            ></v-text-field>
          </v-row>
          <v-row class="mx-1">
            <v-autocomplete
              small-chips
              label="University"
              v-model="searchMemberSchool"
              :items="universities"
              class="mr-2"
              clearable
            ></v-autocomplete>
            <v-autocomplete
              small-chips
              label="Major/Programme"
              v-model="searchMemberProgram"
              :items="majors"
              class="mr-2"
              clearable
            ></v-autocomplete>
            <v-autocomplete
              small-chips
              label="Academic Year"
              v-model="searchMemberYear"
              clearable
              :items="years"
            ></v-autocomplete>
          </v-row>
        </v-form>
        <v-row>
          <v-spacer />
          <v-btn outlined color="#ff9900" class="mr-3" @click="searchUsers"
            >Search</v-btn
          >
          <v-btn
            outlined
            color="#a64942"
            class="mr-3"
            @click="resetMembersSearchFrom"
            >Reset</v-btn
          >
        </v-row>
      </v-col>
      <v-col class="mt-5">
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          @click:row="openDetailProfile"
          class="elevation-1 clickable"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td class="text-xs-right">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.email }}</td>
            <td class="text-xs-right">
              {{ formatDateTime(props.item.created_at) }}
            </td>
            <td class="text-xs-right">
              {{ formatDateTime(props.item.updated_at) }}
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-card>
    <ProfileDetail v-model="openProfile" :profileDetail="selectedProfile"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

import ProfileDetail from "@/PersonalPanel/components/ProfileDetail";

export default {
  name: "searchMembers",
  components: {
      ProfileDetail,
  },
  data() {
    return {
      //search field
      searchMemberName: null,
      searchMemberEmail: null,
      searchMemberSchool: null,
      searchMemberYear: null,
      searchMemberProgram: null,
      searchMemberAccountId: null,

      universities: [
        "City University of Hong Kong",
        "Hong Kong Baptist University",
        "Chinese University of Hong Kong",
        "Hong Kong Polytechnic University",
        "Hong Kong University of Science and Technology",
        "University of Hong Kong",
        "Others",
      ],
      majors: [
        "Architecture",
        "Interior Architecture",
        "Landscape Architecture",
        "Art, General",
        "Art History, Criticism & Conservation",
        "Fine/Studio Arts",
        "Cinema/Film",
        "Dance",
        "Design & Visual Communications, General",
        "Graphic Design",
        "Industrial Design",
        "Interior Design",
        "Music, General",
        "Music, Theory & Composition",
        "Photography",
        "Accounting",
        "Business Administration & Management, General",
        "Hotel/Motel Management",
        "Human Resources Management",
        "International Business Management",
        "Logistics & Materials Management",
        "Marketing Management & Research",
        "Operations Management & Supervision",
        "Purchasing/Procurement/Contracts Management",
        "Travel/Tourism Management",
        "Business/Management Quantitative Methods, General",
        "Finance, General",
        "Insurance & Risk Management",
        "Investments & Securities",
        "Management Information Systems",
        "Sales, Merchandising, & Marketing, General",
        "Tourism & Travel Marketing",
        "Communications, General",
        "Advertising",
        "Digital Communications/Media",
        "Journalism, Broadcast",
        "Computer Networking/Telecommunications",
        "Computer Science & Programming",
        "Data Management Technology",
        "Mathematics, General",
        "Applied Mathematics",
        "Statistics",
        "Counseling & Student Services",
        "Educational Administration",
        "Teacher Education, General",
        "Aerospace/Aeronautical Engineering",
        "Agricultural/Bioengineering",
        "Architectural Engineering",
        "Biomedical Engineering",
        "Chemical Engineering",
        "Civil Engineering",
        "Computer Engineering",
        "Construction Engineering/Management",
        "Electrical, Electronics & Communications Engineering",
        "Environmental Health Engineering",
        "Industrial Engineering",
        "Mechanical Engineering",
        "Nuclear Engineering",
        "Biology, General",
        "Biochemistry & Biophysics",
        "Zoology",
        "Physical Sciences, General",
        "Astronomy",
        "Chemistry",
        "Geological & Earth Sciences",
        "Physics",
        "Law",
        "History",
        "Social Sciences",
        "Sociology",
        "Philosophy",
        "Chiropractic (Pre-Chiropractic)",
        "Dental Hygiene",
        "Dentistry (Pre-Dentistry)",
        "Emergency Medical Technology",
        "Health-Related Professions & Services, General*",
        "Athletic Training",
        "Communication Disorder Services (e.g., Speech Pathology)",
        "Public Health",
        "Health/Medical Technology, General",
        "Medical Laboratory Technology",
        "Medical Radiologic Technology",
        "Nuclear Medicine Technology",
        "Respiratory Therapy Technology",
        "Surgical Technology",
        "Medicine (Pre-Medicine)",
        "Nursing, Practical/Vocational (LPN)",
        "Nursing, Registered (BS/RN)",
        "Optometry (Pre-Optometry)",
        "Osteopathic Medicine",
        "Pharmacy (Pre-Pharmacy)",
        "Physician Assisting",
        "Therapy & Rehabilitation, General",
        "Alcohol/Drug Abuse Counseling",
        "Massage Therapy",
        "Mental Health Counseling",
        "Occupational Therapy",
        "Physical Therapy (Pre-Physical Therapy)",
        "Psychiatric/Mental Health Technician",
        "Rehabilitation Therapy",
        "Vocational Rehabilitation Counseling",
      ],
      years: [
        "Year 1",
        "Year 2",
        "Year 3",
        "Year 4",
        "> Year 4",
        "Graduated",
        "Postgrad",
      ],

      //table
      headers: [
        { text: "Account ID", align: "left", value: "accountId" },
        { text: "Name", value: "nickName" },
        { text: "Email", value: "email" },
        { text: "Major", value: "majorProgram" },
        { text: "School", value: "university" },
        { text: "Created At", value: "created_at" },
      ],
      filteredUsers: [],

      openProfile: false,
      selectedProfile: null,
    };
  },
  methods: {
    ...mapActions("users", ["listAllUsers"]),
    searchUsers() {
      const {
        searchMemberName,
        searchMemberEmail,
        searchMemberAccountId,
        searchMemberSchool,
        searchMemberYear,
        searchMemberProgram,
      } = this;

      const params = {
        ...(searchMemberName && { nickName: searchMemberName }),
        ...(searchMemberAccountId && { accountId: searchMemberAccountId }),
        ...(searchMemberSchool && { university: searchMemberSchool }),
        ...(searchMemberYear && { year: searchMemberYear }),
        ...(searchMemberEmail && { email: searchMemberEmail }),
        ...(searchMemberProgram && { majorProgram: searchMemberProgram }),
      };

      this.listAllUsers(params).then((res) => (this.filteredUsers = res));
    },
    openDetailProfile(profile){
        this.selectedProfile = profile;
        this.openProfile = true;
    },
    formatDateTime(time) {
      return dayjs(time).format("YYYY-MM-DD");
    },
    resetMembersSearchFrom() {
      Object.assign(
        this.$data.filteredUsers,
        this.$options.data().filteredUsers
      );
      this.$refs.membersSearch.reset();
    },
  },
};
</script>

<style scoped>
</style>
