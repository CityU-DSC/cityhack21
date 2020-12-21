<template>
  <div class="container">
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Personal Information
        <small>Pleas fill in your personal information.</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-form ref="basicForm" lazy-validation>
          <v-container>
            <v-row>
              <v-col>
                <v-row>
                  <v-text-field
                      label="First Name"
                      v-model="submission.firstName"
                      :rules="[rules.required, rules.nameRules]"
                      class="mx-2"
                      counter
                      prepend-inner-icon="mdi-alien"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      label="Surname"
                      v-model="submission.lastName"
                      :rules="[rules.required, rules.nameRules]"
                      prepend-inner-icon="mdi-alien-outline"
                      counter
                      class="mx-2"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      label="Nickname"
                      :rules="[rules.numAndAlpha, rules.nameRules]"
                      v-model="submission.nickName"
                      class="mx-2"
                      counter
                      prepend-inner-icon="mdi-alpha-n-box-outline"
                      outlined
                  ></v-text-field>
                </v-row>
                <v-row class="mt-5 mb-5">
                  <v-autocomplete
                      label="University"
                      v-model="submission.university"
                      :items="universities"
                      :rules="[rules.required]"
                      class="mx-2"
                      outlined
                  ></v-autocomplete>
                  <v-autocomplete
                      label="Major/Programme"
                      v-model="submission.majorProgram"
                      :items="majors"
                      :rules="[rules.required]"
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
                    class="mt-5 mb-5 d-none d-md-block"
                    prepend-icon="mdi-school-outline"
                    step="1"
                    ticks="always"
                    tick-size="5"
                ></v-slider>
                <v-autocomplete
                    v-else
                    label="Academic Year"
                    v-model="submission.year"
                    :items="years"
                    outlined
                ></v-autocomplete>
                <v-row class="mt-5 mb-5">
                  <vue-tel-input-vuetify
                      label="Phone Number"
                      :rules="[rules.required]"
                      v-model="submission.number"
                      type="number"
                      class="mx-2 mr-5"
                      blur
                      prepend-icon="mdi-cellphone"
                  ></vue-tel-input-vuetify>
                  <v-text-field
                      label="CityU SID (if applicable)"
                      v-model="submission.sid"
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
                      label="School Email Address"
                      :rules="[rules.required, rules.blank, rules.emailRules]"
                      v-model="submission.schoolEmail"
                      class="mx-2 mr-5"
                      prepend-icon="mdi-email"
                      single-line
                  ></v-text-field>
                  <v-text-field
                      label="Confirm School Email Address"
                      :rules="[rules.required, validation.schoolEmail]"
                      class="mx-2 ml-5"
                      prepend-icon="mdi-email-check-outline"
                      single-line
                  ></v-text-field>
                </v-row>
                <v-row class="mt-5 mb-5">
                  <v-text-field
                      label="Personal Email Address"
                      :rules="[rules.required, rules.blank, rules.emailRules]"
                      v-model="submission.personalEmail"
                      class="mx-2 mr-5"
                      prepend-icon="mdi-at"
                      single-line
                  ></v-text-field>
                  <v-text-field
                      label="Confirm Personal Email Address"
                      :rules="[rules.required, validation.personalEmail]"
                      class="mx-2 ml-5"
                      prepend-icon="mdi-email-check"
                      single-line
                  ></v-text-field>
                </v-row>
                <!--                <v-radio-group-->
                <!--                    label="Have you joined a team?"-->
                <!--                    v-model="submission.joinedTeam"-->
                <!--                    row-->
                <!--                    :rules="[rules.required]"-->
                <!--                >-->
                <!--                  <v-radio-->
                <!--                      class="ml-5"-->
                <!--                      label="Yes"-->
                <!--                      value="true"-->
                <!--                  ></v-radio>-->
                <!--                  <v-radio-->
                <!--                      label="No"-->
                <!--                      value="false"-->
                <!--                  ></v-radio>-->
                <!--                </v-radio-group>-->
                <!--                <vuetify-google-autocomplete-->
                <!--                    ref="submission.address"-->
                <!--                    id="map"-->
                <!--                    append-icon="mdi-search"-->
                <!--                    classname="form-control"-->
                <!--                    country="hk"-->
                <!--                    placeholder="Please type your address"-->
                <!--                    v-on:placechanged="getAddressData"-->
                <!--                >-->
                <!--                </vuetify-google-autocomplete>-->
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-btn color="primary" style="margin-right: 2rem;" @click="doneBasicForm">
          Continue
        </v-btn>
        <v-btn color="warning" @click="resetBasicInfoForm"> Reset Form</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        Account Setting
        <small>Please set up your password for entering CityHack21 personal panel</small>
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-form ref="accountForm" lazy-validation>
          <v-container>
            <v-row>

              <v-avatar size="80" color="#121212" class="mr-5 mx-2">
                <img
                    :src="accountDetails.avatarUrl"
                    alt="Personal Avatar"
                >
              </v-avatar>
              <v-file-input
                  :rules="[rules.avatarSize, rules.required]"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Profile Avatar"
                  class="mx-2 mt-2"
                  v-model="avatarImg"
                  @change="avatarImgtoUrl"
              ></v-file-input>
<!--              <v-btn class="mt-4 mx-5">-->
<!--                <v-icon class="mr-2">-->
<!--                  mdi-cloud-upload-->
<!--                </v-icon>-->
<!--                Auto Generate Avatar-->
<!--              </v-btn>-->
            </v-row>
            <v-text-field
                label="Account ID"
                v-model="accountDetails.accountId"
                :rules="[rules.required]"
                hint="It should be a unique Account ID"
                class="mx-2 mt-5"
                clearable
                prepend-inner-icon="mdi-account-circle"
                outlined
            >
<!--              <template v-slot:progress>-->
<!--                <v-progress-linear-->
<!--                    :value="progress"-->
<!--                    absolute-->
<!--                    height="7"-->
<!--                ></v-progress-linear>-->
<!--              </template>-->
            </v-text-field>
            <v-row class="mt-2">
              <v-text-field
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min, rules.password, rules.blank]"
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  hint="At least 8 characters"
                  v-model="accountDetails.password"
                  class="input-group--focused mx-5"
                  prepend-inner-icon="mdi-form-textbox-password"
                  outlined
                  @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                  :append-icon="showVerifiedPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min, validation.confirmPassword]"
                  :type="showVerifiedPassword ? 'text' : 'password'"
                  label="Confirm Password"
                  hint="At least 8 characters"
                  v-model="accountDetails.verifiedPassword"
                  class="input-group--focused mx-5"
                  prepend-inner-icon="mdi-form-textbox-password"
                  outlined
                  @click:append="showVerifiedPassword = !showVerifiedPassword"
              ></v-text-field>
            </v-row>

          </v-container>
        </v-form>
        <v-btn color="primary" class="mr-3" @click="registerNewUser()">
          Send Verify Email
        </v-btn>
        <v-btn @click="e6 = 1" class="mr-3"> Previous </v-btn>
        <v-btn color="warning" @click="resetAccountForm"> Reset Form</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Email Verification
        <small>The Verification code has been sent to your school email</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-text-field
            label="Verification Code"
            v-model="verificationCode"
            :rules="[rules.required]"
            class="mx-2"
            counter
            prepend-inner-icon="mdi-key"
            outlined
        ></v-text-field>
        <v-btn color="primary" style="margin-right: 2rem;" @click="verifyCode()">
          Continue
        </v-btn>
        <v-btn color="warning" @click="resendVerification({email: submission.schoolEmail})"> Re-send Email</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 4" step="4">
        AWS Educate Account?
        <small>Through AWS Educate, students and educators have access to content and programs developed to skill up for cloud careers in growing fields. AWS Educate also connects companies hiring for cloud skills to qualified student job seekers with the AWS Educate Job Board.</small>
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-form ref="AWSForm" lazy-validation>
          <v-radio-group
              label="Have you finished all the credits of AWS Educate?"
              v-model="AWSPreference.needAWSExtraCredit"
              row
          >
            <v-radio
                class="ml-5"
                label="Yes"
                value="true"
            ></v-radio>
            <v-radio
                label="No"
                value="false"
            ></v-radio>
          </v-radio-group>
          <v-radio-group
              label="Do you have AWS Educate Account?"
              v-model="AWSPreference.hasAWSAccount"
              row
          >
            <v-radio
                class="ml-5"
                label="Yes"
                value="true"
            ></v-radio>
            <v-radio
                label="No"
                value="false"
            ></v-radio>
          </v-radio-group>
        </v-form>
        <v-btn
            color="primary"
            class="mt-5"
            @click="finishAllSteps"
        >Submit
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import swal from "sweetalert";
import Swal from 'sweetalert2';
import {mapActions} from "vuex";

export default {
  name: "register",
  components: {},
  data() {
    return {
      discordImgUrl: "",
      submission: {
        firstName: "asdasd",
        lastName: "asdasd",
        nickName: "asdasd",
        university: "City University of Hong Kong",
        sid: 54924670,
        year: "Year 1",
        majorProgram: "Architecture",
        number: "67230014",
        schoolEmail: "lowzhao@gmail.com",
        personalEmail: "lowzhao@gmail.com",
      },
      accountDetails: {
        accountId: "asdasdasd",
        password: "asdasdasd",
        avatarUrl: null,
      },
      verificationCode: "",

      AWSPreference: {
        hasAWSAccount: "false",
        needAWSExtraCredit: "false",
      },
      avatarImg: null,
      verifiedPassword: null,
      showPassword: false,
      showVerifiedPassword: false,
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
      options: ["Yes", "No"],
      rules: {
        required: (value) => !!value || "Required.",
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
        schoolEmail: (value) =>
            value == this.submission.schoolEmail ||
            "Different Email Address",
        personalEmail: (value) =>
            value == this.submission.personalEmail ||
            "Are you sure it's the same?",
        confirmPassword: (value) => value === this.accountDetails.password ||
            "Password Mismatch"
      },
      e6: 1,
    };
  },
  computed: {
    progress() {
      return Math.min(100, this.value.length * 10)
    },
  },
  methods: {
    ...mapActions("auth", ["registerUser", "verifyUser", "resendVerification"]),
    // getAddressData(addressData) {
    //   this.submission.address = addressData;
    // },
    async registerNewUser() {
      if (this.$refs.accountForm.validate()) {
        if (this.$vuetify.breakpoint.mdAndUp){
          this.submission.year = this.years[this.year_1];
        }
        await this.registerUser({...this.submission, ...this.accountDetails })
            .then(
                ({ err }) => {
                  // res.err
                  if (err) {
                    swal("Error", "Something Went Wrong", "error");
                  } else {
                    swal("Success", "Registration Was successful", "success");
                  }
                  // let token = res.token;
                  // if (token) {
                  //   localStorage.setItem("jwt", token);
                  //   this.$router.push("/login");
                  //   swal("Success", "Registration Was successful", "success");
                  // } else {
                  //   swal("Error", "Something Went Wrong", "error");
                  // }
                  this.e6 = 3;
                }
            )
            .catch(err => {
              console.log(err);
              if (err.err) {
                swal("Error", err.message, "error");
              } else {
                swal("Error", "Something Went Wrong", "error");
              }
              // let error = err.response;
              // if (error.status && error.status === 409) {
              //   swal("Error", error.data.message, "error");
              // } else {
              //   swal("Error", error.data.err.message, "error");
              // }
            });
      }
    },

    async verifyCode() {
      try {
        const { token } = await this.verifyUser({ verificationCode: this.verificationCode.split(' ').join(''), email: this.submission.schoolEmail });

        if (token) {
          localStorage.setItem("jwt", token);
          swal("Success", "Registration Was successful", "success");
        } else {
          swal("Error", "Something Went Wrong", "error");
        }
        this.e6 = 4;
      } catch (err) {
        console.log(err);
        if (err.err && err.message) {
          swal("Error", err.message, "error");
        } else {
          swal("Error", "Something Went Wrong", "error");
        }

      }
    },
    doneBasicForm(){
      if (this.$refs.basicForm.validate()) {
        this.e6 = 2;
      }
    },
    resetBasicInfoForm(){
      this.$refs.basicForm.reset();
    },
    resetAccountForm(){
      this.$refs.accountForm.reset();
    },
    avatarImgtoUrl() {
      this.accountDetails.avatarUrl = URL.createObjectURL(this.avatarImg);

      const reader = new FileReader();

      reader.addEventListener(
        "load", () => {
          this.accountDetails.avatarUrl = reader.result;
        }
      )
      reader.readAsDataURL(this.avatarImg);

    },
    finishAllSteps() {
      if(this.$refs.AWSForm.validate()){
        if(this.AWSPreference.hasAWSAccount === "true") {
          Swal.fire({
            title: 'Successfully Registered!',
            html: '<ul><li>Please Upload AWS Educate Account Verification to personal email </li>' +
                '<li><a href="https://discord.gg/234VSVWp">Join Discord with us for more information!!</a></li>',
            text: '',
            padding: '3em',
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Fdiscord.png?alt=media&token=1da67a3d-1d8a-4bfa-bf13-95c49cb74544",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            backdrop: `
          rgba(0,0,0,0.4)
          url("https://thumbs.gfycat.com/BouncyWelcomeGrassspider-max-1mb.gif")
          right bottom
          no-repeat
        `,
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({name: "login"});
            }
          })
        } else {
          Swal.fire({
            title: 'Almost Done!!',
            html: '<ul><li> <a href="https://discord.gg/234VSVWp">Join Discord with us for more information!!</a></li>' +
                '<li>We will direct you to AWS Educate with our UNIQUE promo-code</li>',
            text: '',
            padding: '3em',
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Fdiscord.png?alt=media&token=1da67a3d-1d8a-4bfa-bf13-95c49cb74544",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            backdrop: `
          rgba(0,0,0,0.4)
          url("https://thumbs.gfycat.com/BouncyWelcomeGrassspider-max-1mb.gif")
          right top
          no-repeat
        `,
          }).then((result) => {
            if (result.isConfirmed) {
              window.open("https://www.awseducate.com/Registration?promoCode=CityHack2021");
            }
          })
        }
      }
    },
  },
  mounted() {
    // this.$refs.address.focus();
  },
};
</script>
