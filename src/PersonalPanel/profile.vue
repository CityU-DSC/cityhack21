<template>
  <div>
    <nav-drawer @direct="directTo" :current="pathName"/>
    <v-card class="mx-auto" max-width="80%" tile>
      <v-img height="100%" src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2F1.jpg?alt=media&token=183fac76-6f53-4ca6-88f1-7bf080067780"></v-img>
      <v-col>
        <v-avatar size="100" style="position:absolute; top: 30rem;">
          <v-img :src="accountDetails.avatarUrl"></v-img>
        </v-avatar>
      </v-col>
      <div class="px-4 mx-2">
        <v-simple-table
            fixed-header
        >
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">KEY</th>
              <th class="text-left">VALUE</th>
            </tr>
            </thead>
            <tbody>
            <tr
                v-for="(item, key) in userInfo"
                :key="key"
            >
              <td>{{ key }}</td>
              <td>{{ item }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <v-col>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              @click="show = !show"
              color="warning"
              class="ma-2 white--text"
          >
            EDIT
            <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-file-input
                :rules="[rules.avatarSize]"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Change Profile Avatar"
                prepend-icon="mdi-camera"
                label="Profile Avatar"
                class="mx-2 mt-2"
                v-model="avatarImg"
                @change="avatarImgtoUrl"
            ></v-file-input>
            <v-col>
              <v-row>
                <v-text-field
                    label="First Name"
                    v-model="userInfo.firstName"
                    :rules="[rules.nameRules]"
                    class="mx-2"
                    counter
                    prepend-inner-icon="mdi-alien"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Surname"
                    v-model="userInfo.lastName"
                    :rules="[ rules.nameRules]"
                    prepend-inner-icon="mdi-alien-outline"
                    counter
                    class="mx-2"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Nickname"
                    :rules="[rules.numAndAlpha, rules.nameRules]"
                    v-model="userInfo.nickName"
                    class="mx-2"
                    counter
                    prepend-inner-icon="mdi-alpha-n-box-outline"
                    outlined
                ></v-text-field>
              </v-row>
              <v-row class="mt-5 mb-5">
                <v-autocomplete
                    label="University"
                    v-model="userInfo.university"
                    :items="universities"
                    class="mx-2"
                    outlined
                ></v-autocomplete>
                <v-autocomplete
                    label="Major/Programme"
                    v-model="userInfo.majorProgram"
                    :items="majors"
                    class="mx-2"
                    outlined
                ></v-autocomplete>
              </v-row>
              <v-slider
                  v-if="$vuetify.breakpoint.mdAndUp"
                  label="Academic Year"
                  v-model="year_1"
                  :tick-labels="years"
                  :max="years.length - 1"
                  class="mt-5 mb-5"
                  prepend-icon="mdi-school-outline"
                  step="1"
                  ticks="always"
                  tick-size="5"
              ></v-slider>
              <v-autocomplete
                  v-else
                  label="Academic Year"
                  v-model="userInfo.academicYear"
                  :items="years"
                  outlined
              ></v-autocomplete>
              <v-row class="mt-5 mb-5">
                <v-text-field
                    label="Phone Number"
                    v-model="userInfo.phoneNumber"
                    type="number"
                    class="mx-2 mr-5"
                    blur
                    prepend-icon="mdi-cellphone"
                ></v-text-field>
                <v-text-field
                    label="CityU SID (if applicable)"
                    v-model="userInfo.sid"
                    :rules="[rules.numeric, rules.counter]"
                    class="ml-5 mx-2"
                    counter
                    maxlength="8"
                    prepend-inner-icon="mdi-card"
                    single-line
                ></v-text-field>
              </v-row>
              <v-row class="mt-5 mb-5">
                <v-text-field
                    label="Personal Email Address"
                    :rules="[ rules.blank, rules.emailRules]"
                    v-model="userInfo.personalEmail"
                    class="mx-2 mr-5"
                    prepend-icon="mdi-at"
                    single-line
                ></v-text-field>
                <v-text-field
                    label="Confirm Personal Email Address"
                    :rules="[ validation.personalEmail]"
                    class="mx-2 ml-5"
                    prepend-icon="mdi-email-check"
                    single-line
                ></v-text-field>
              </v-row>
              <v-row class="mt-5 mb-5">
                <v-text-field
                    label="Home Address"
                    :rules="[rules.blank]"
                    v-model="userInfo.address"
                    class="mx-2 ml-5"
                    prepend-icon="mdi-email-check"
                    single-line
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col>
              <v-textarea
                  outlined
                  name="input-7-4"
                  label="About"
                  v-model="userInfo.about"
              ></v-textarea>
            </v-col>
            <v-row>
              <v-spacer></v-spacer>
              <v-btn
                  class="ma-2 white--text"
                  @click="alterProfile"
              >
                Submit
                <v-icon>mdi-cloud-upload</v-icon>
              </v-btn>
            </v-row>
          </div>
        </v-expand-transition>
      </v-col>
      <v-divider class="mx-4"></v-divider>
    </v-card>
  </div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import { mapActions, mapGetters } from 'vuex';
import Swal from "sweetalert2";

export default {
  name: "personal_profile",
  props: {
  },
  computed:{
    ...mapGetters('auth', ['currentUser'])
  },
  components: {
    navDrawer,
  },
  data() {
    return {
      show: false,
      pathName: "Profile Page",
      userInfo: {
        about: '',
        teamName: '',
        nickName: '',
        firstName: '',
        lastName: '',
        personalEmail: '',
        schoolEmail: '',
        university: "City University of Hong Kong",
        sid: 0,
        majorProgram: "",
        academicYear: "",
        phoneNumber: "",
        avatarUrl: "",
        address: "",
      },
      discordImgUrl: "",
      accountDetails: {
        accountId: "",
        password: "",
        avatarUrl: null,
      },
      avatarImg: null,
      year_1: 0,
      universities: [
        "City University of Hong Kong",
        "Hong Kong Baptist University",
        "Chinese University of Hong Kong",
        "Hong Kong Polytechnic University",
        "Hong Kong University of Science and Technology",
        "University of Hong Kong",
        "Others"
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
      years: ["Year 1", "Year 2", "Year 3", "Year 4", "> Year 4", "Graduated", "Postgrad"],
      rules: {
        blank: v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
        numeric: (value) => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || "Only Number.";
        },
        password: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
          return (
              pattern.test(value) ||
              "At least one capital letter, and a number."
          );
        },
        nameRules: value => !value || value.length <= 15 || "Maximum 12 characters",
        numAndAlpha: value => {
          const pattern = /^[A-Za-z0-9]+$/;
          return pattern.test(value) || "Only Alphabet";
        },
        emailRules: value => {
          const pattern = /.+@.+\..+/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
        min: v => !v || v.length >= 8 || 'Min 8 characters',
        counter: v => !v || v.length === 8 || "Should be 8 numbers",
        avatarSize: (value) => !value || value.size <= 1000000 || 'Avatar size should be less than 1 MB!',
      },
      validation: {
        personalEmail: (value) =>
            value == this.userInfo.personalEmail ||
            "Different Personal Email from the previous field",
        confirmPassword: (value) => value === this.accountDetails.password ||
            "Password Mismatch"
      },
    };
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },
    avatarImgtoUrl() {
      this.accountDetails.avatarUrl = URL.createObjectURL(this.avatarImg);

      const reader = new FileReader();

      reader.addEventListener(
        "load", () => {
          this.accountDetails.avatarUrl = reader.result;
        }
      );
      reader.readAsDataURL(this.avatarImg);
    },
    alterProfile(){
      this.userInfo.avatarUrl = this.accountDetails.avatarUrl;
      if (this.$vuetify.breakpoint.mdAndUp){
        this.userInfo.academicYear = this.years[this.year_1];
      }
      this.updateMe(this.userInfo).then(
        res => {
          Swal.fire(
              'Success',
              'Update Profile Successfully',
              'success'
          );
          this.show=false;
          console.log(res);
        }
      ).catch(
        err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Profile did not updated successfully!',
          });
        }
      );
    },
    ...mapActions("auth", ["init", "updateMe"]),

  },
  async mounted(){
    if (!await this.init()) {
      this.$router.push('/');
      return;
    }
    this.currentUser.personalEmail = this.currentUser.email;
    this.currentUser.academicYear = this.currentUser.year;
    this.currentUser.phoneNumber = this.currentUser.number;

    for (let key in this.userInfo){
      this.userInfo[key] = this.currentUser[key];
    }

    for (let key in this.accountDetails){
      this.accountDetails[key] = this.currentUser[key];
    }
  }
};
</script>

<style scoped>
</style>
