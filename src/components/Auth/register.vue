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
                  <v-combobox
                      label="University"
                      v-model="submission.university"
                      :items="universities"
                      :rules="[rules.required]"
                      class="mx-2"
                      outlined
                  ></v-combobox>
                  <v-combobox
                      label="Major/Programme"
                      v-model="submission.majorProgram"
                      :items="majors"
                      :rules="[rules.required]"
                      class="mx-2"
                      outlined
                  ></v-combobox>
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
                <v-combobox
                    v-else
                    label="Academic Year"
                    v-model="submission.year"
                    :items="years"
                    outlined
                ></v-combobox>
                <v-row class="mt-5 mb-5">
                  <v-text-field
                      label="Phone Number (for WhatsApp)"
                      :rules="[rules.required]"
                      v-model="submission.number"
                      type="text"
                      class="mx-2 mr-5"
                      blur
                      prepend-icon="mdi-cellphone"
                  ></v-text-field>
                  <v-text-field
                      label="CityU SID (if applicable)"
                      v-model="submission.sid"
                      :rules="[rules.numeric, rules.counter]"
                      class="ml-5 mx-2"
                      counter
                      maxlength="8"
                      prepend-icon="mdi-card"
                      outlined
                  ></v-text-field>
                </v-row>
                <v-row class="mt-5 mb-5">
                  <v-text-field
                      label="School Email Address"
                      :rules="[rules.required, rules.blank, rules.emailRules]"
                      v-model="submission.schoolEmail"
                      class="mx-2 mr-5"
                      prepend-icon="mdi-email"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      label="Confirm School Email Address"
                      :rules="[rules.required, validation.schoolEmail]"
                      class="mx-2 ml-5"
                      prepend-icon="mdi-email-check-outline"
                      outlined
                  ></v-text-field>
                </v-row>
                <v-row class="mt-5 mb-5">
                  <v-text-field
                      label="Personal Email Address"
                      :rules="[rules.required, rules.blank, rules.emailRules]"
                      v-model="submission.personalEmail"
                      class="mx-2 mr-5"
                      prepend-icon="mdi-at"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      label="Confirm Personal Email Address"
                      :rules="[rules.required, validation.personalEmail]"
                      class="mx-2 ml-5"
                      prepend-icon="mdi-email-check"
                      outlined
                  ></v-text-field>
                </v-row>

                <v-row class="mt-5 mb-5">
                  <v-text-field
                      label="Home Address"
                      :rules="[rules.required]"
                      v-model="submission.address"
                      class="mx-2 mr-5"
                      prepend-icon="mdi-at"
                      outlined
                  ></v-text-field>
                </v-row>
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
                    :src="avatarImg.url"
                    alt="Personal Avatar"
                >
              </v-avatar>
              <v-file-input
                  :rules="[rules.avatarSize]"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Profile Avatar"
                  class="mx-2 mt-2"
                  @change="avatarImgtoUrl"
              ></v-file-input>
            </v-row>
            <v-text-field
                label="Account ID"
                v-model="accountDetails.accountId"
                :rules="[rules.required, validation.accountIdUsed]"
                hint="It should be a unique Account ID"
                class="mx-2 mt-5"
                clearable
                prepend-inner-icon="mdi-account-circle"
                outlined
            >
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
        <v-btn :loading="verifying" color="primary" class="mr-3" @click="registerNewUser()">
          Send Verify Email
        </v-btn>
        <v-btn @click="e6 = 1" class="mr-3"> Previous</v-btn>
        <v-btn color="warning" @click="resetAccountForm"> Reset Form</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Email Verification
        <small>The Verification code has been sent to your email</small>
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
        <v-btn color="warning" @click="resendVerification({email: submission.personalEmail})"> Re-send Email</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 4" step="4">
        Referrer and Promotion Code
        <small>The Verification code has been sent to your email</small>
      </v-stepper-step>

      <v-stepper-content step="4">
        <v-row>
          <v-card
              max-width="800"
              class="mx-auto pa-2"
              shaped
          >
            <v-card-title>
              <v-icon
                  left
                  color="#ff9900"
              >
                mdi-gift
              </v-icon>
              <span class="title-3 font-weight-bold">Invite Friends and Get Friendship Rewards</span>
              <v-spacer/>
              <shareNetworks
                  :url="referrerUrl"
                  title="Welcome to CityHack21!"
                  description="CityU Hall 2 IT Team and CityU Google Developer Student Club (DSC) are very glad to announce CityHack 2021 – the hackathon event to be hosted by City University of Hong Kong. This event is open to all students, regardless of your academic background. The event will be a fulfilling experience for individuals hailing from all sorts of backgrounds."
                  hashtags="hackathon, CityHack, cityU"
                  quote="All you need to be part of CityHack is a passionate heart"
              />
            </v-card-title>
            <v-card-text class="">
              <p> Let your friends put referrer account ID in registration form (need to verify AWS Educate account).
                You can view the ranking of top referrers in the personal panel. Top 10 referrers and referrers who
                invite >3 can get special rewards worth 6,000 HKD in total.</p>
              <p class="font-weight-bold subtitle-1">Press the share button and share this message to your friends!</p>
            </v-card-text>
          </v-card>
        </v-row>
        <v-row class="mt-5 mb-5">
          <v-text-field
              label="Referrer Account Id (if applicable)"
              v-model="submission.referrerAccountId"
              class="ml-5 mx-2"
              prepend-icon="mdi-account"
              outlined
          ></v-text-field>
          <v-text-field
              label="Promotion Code (if applicable)"
              v-model="submission.promoCode"
              :rules="[]"
              class="ml-5 mx-2"
              prepend-icon="mdi-card"
              outlined
          ></v-text-field>
        </v-row>
        <v-btn color="primary" style="margin-right: 2rem;" @click="saveReferPromoCode()">
          Continue
        </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 5" step="5">
        AWS Educate Account?
        <small>Through AWS Educate, students and educators have access to content and programs developed to skill up for
          cloud careers in growing fields. AWS Educate also connects companies hiring for cloud skills to qualified
          student job seekers with the AWS Educate Job Board.</small>
      </v-stepper-step>
      <v-stepper-content step="5">
        <div>
          <v-card
              class="mb-5"
              tile
          >
            <v-list>
              <v-subheader>Why you need AWS Educate Account?</v-subheader>
              <v-list-item-group
                  v-model="selectedItem"
                  color="primary"
              >
                <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>
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
import Swal from 'sweetalert2';
import {mapActions} from "vuex";
import shareNetworks from "@/components/shareNetworks";
import {db, storage} from "@/config/firebaseConfig";

export default {
  name: "register",
  components: {shareNetworks,},
  data() {
    return {
      selectedItem: 1,
      items: [
        {text: 'To Use SageMaker in CityHack21', icon: 'mdi-clock'},
        {text: 'Receive $100 USD and Free AWS Services', icon: 'mdi-aws'},
        {text: 'Only ones who Registered can receive Souvenirs from AWS', icon: 'mdi-gift'},
      ],
      referrerUrl: null,
      discordImgUrl: "",
      submission: {
        firstName: "",
        lastName: "",
        nickName: "",
        university: "City University of Hong Kong",
        sid: undefined,
        year: "Year 1",
        majorProgram: undefined,
        number: "",
        schoolEmail: "",
        personalEmail: "",
        referrerAccountId: "",
        promoCode: "",
        address: ""
      },
      accountDetails: {
        accountId: "",
        password: "",
        avatarUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Flogo_w%20(1).png?alt=media&token=cb078b46-349e-4a0c-b228-11b262a9fe8b",
      },
      isAccountIdUsed: false,
      verificationCode: "",

      AWSPreference: {
        hasAWSAccount: "false",
        needAWSExtraCredit: "false",
      },
      avatarImg: {name: null, url: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Flogo_w%20(1).png?alt=media&token=cb078b46-349e-4a0c-b228-11b262a9fe8b", file: null},
      verifiedPassword: null,
      showPassword: false,
      showVerifiedPassword: false,
      year_1: 0,
      verifying: false,

      universities: [
        "City University of Hong Kong",
        "Hong Kong Baptist University",
        "Chinese University of Hong Kong",
        "Hong Kong Polytechnic University",
        "Hong Kong University of Science and Technology",
        "University of Hong Kong",
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
        "Data Science",
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
        avatarSize: (value) => !value || value.size <= 3500000 || 'Avatar size should be less than 3 MB!',
      },
      validation: {
        schoolEmail: (value) =>
            value == this.submission.schoolEmail ||
            "Different Email Address",
        personalEmail: (value) =>
            value == this.submission.personalEmail ||
            "Are you sure it's the same?",
        confirmPassword: (value) => value === this.accountDetails.password ||
            "Password Mismatch",
        accountIdUsed: () => !this.isAccountIdUsed ||
            "Account ID is already in used"
      },
      e6: 1,
    };
  },
  watch: {
    'accountDetails.accountId': function (newVal) {
      this.checkIsIdUsed(newVal);
      this.accountDetails.accountId = newVal;
    }
  },
  computed: {
    progress() {
      return Math.min(100, this.value.length * 10)
    },
  },
  methods: {
    ...mapActions("auth", ["registerUser", "verifyUser", "resendVerification", "updateMe", "accountIdUsed"]),
    async checkIsIdUsed(id) {
      await this.accountIdUsed(id).then(res => this.isAccountIdUsed = res.accountIdUsed);
    },
    async registerNewUser() {
      this.verifying = true;
      if (this.$refs.accountForm.validate()) {
        if (this.$vuetify.breakpoint.mdAndUp) {
          this.submission.year = this.years[this.year_1];
        }
        let mountRef = storage.ref().child(`avatar/${this.avatarImg.name}`);
        mountRef.put(this.avatarImg.file).then(snapshot => {
          snapshot.ref.getDownloadURL().then(url => {
            this.accountDetails.avatarUrl = url;
            const bucketName = "cityhack21-6404b.appspot.com";
            const filePath = this.avatarImg.name;
            try {
              db.collection("avatarImg").add({
                url,
                downloadUrl:
                    `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/avatar` +
                    "%2F" +
                    `${encodeURIComponent(filePath)}?alt=media`,
                timestamp: Date.now()
              }).then(() => this.accountDetails.avatarUrl = url);
            } catch (err) {
              console.error(err);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.message,
              });
            }
          })
        });
        await this.registerUser({...this.submission, ...this.accountDetails})
            .then(
                ({err}) => {
                  if (err) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: err,
                    })
                  } else {
                    Swal.fire(
                        'Success',
                        'Please Input the verification code send to your email (maybe in spamQQ)',
                        'success'
                    );
                  }
                  this.e6 = 3;
                }
            )
            .catch(err => {
              console.log(err);
              if (err.emailUsed) {
                Swal.fire({
                  icon: 'error',
                  title: 'Email is already in used',
                  text: 'do you want to reset the password?',
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.$router.push({name: 'login'});
                  }
                })
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Opps...',
                  text: err.message,
                  showConfirmButton: false,
                })
              }

            });
        this.verifying = false;
      } else {
        this.verifying = false;
      }
    },

    async verifyCode() {
      try {
        this.verificationCode = this.verificationCode.toUpperCase();
        const {token} = await this.verifyUser({
          verificationCode: this.verificationCode.split(' ').join(''),
          email: this.submission.personalEmail
        });

        if (token) {
          this.$ga.set('userId', JSON.parse(atob(token.split('.')[1]))._id);
          localStorage.setItem("jwt", token);
          Swal.fire(
              'Success',
              'Email has been verified!',
              'success'
          );
          this.referrerUrl = `https://cityhack21.com/register?referrer=${this.accountDetails.accountId}`
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
        this.e6 = 4;
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        })
      }
    },
    doneBasicForm() {
      if (this.$refs.basicForm.validate()) {
        this.e6 = 2;
      }
    },
    resetBasicInfoForm() {
      this.$refs.basicForm.reset();
    },
    resetAccountForm() {
      this.$refs.accountForm.reset();
    },
    avatarImgtoUrl(e) {
      const avatar = e;
      if (avatar) {
        this.avatarImg.name = avatar.name;
        if (this.avatarImg.name.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(avatar);
        fr.addEventListener("load", () => {
          this.avatarImg.url = fr.result;
          this.avatarImg.file = avatar;
        });
        this.accountDetails.avatarUrl = this.avatarImg.url;
      } else {
        this.avatarImg = {name: null, url: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Flogo_w%20(1).png?alt=media&token=cb078b46-349e-4a0c-b228-11b262a9fe8b", file: null};
      }
    },
    saveReferPromoCode() {
      this.updateMe({
        referrerAccountId: this.submission.referrerAccountId,
        promoCode: this.submission.promoCode
      }).then(
          res => {
            console.log(res);
            this.e6 = 5;
          }
      ).catch(
          err => {
            console.log(err);
          }
      )
    },
    async finishAllSteps() {
      await this.updateMe({
        awsEducateReason: this.selectedItem,
        needAWSExtraCredit: this.AWSPreference.needAWSExtraCredit,
        hasAWSAccount: this.AWSPreference.hasAWSAccount,
      }).then(
          res => {
            console.log(res);
          }
      ).catch(
          err => {
            console.log(err)
          }
      );
      if (this.$refs.AWSForm.validate()) {
        if (this.AWSPreference.hasAWSAccount === "true") {
          Swal.fire({
            title: 'Successfully Registered!',
            html: '<ul><li>Please Upload AWS Educate Account Verification to personal email </li>' +
                '<li>Join Discord with us for more information!!</li>' +
                '</ul>',
            text: '',
            padding: '3em',
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Fdd.png?alt=media&token=5e654e17-c40e-4032-b901-7c73fdbacc73",
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
            html: '<ul><li>Join Discord with us for more information!!</li>' +
                '<li>We will direct you to AWS Educate with our UNIQUE promo-code</li>' +
                '</ul>',
            text: '',
            padding: '3em',
            imageUrl: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Fdd.png?alt=media&token=5e654e17-c40e-4032-b901-7c73fdbacc73",
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
              this.$router.push({name: 'login'});
            }
          })
        }
      }
    },
  },
  mounted() {
    // this.$refs.address.focus();
    //~/register?referrer=xxxx&promoCode=yyy
    this.submission.referrerAccountId = this.$route.query.referrer;
    this.submission.promoCode = this.$route.query.promoCode;
  },
};
</script>
