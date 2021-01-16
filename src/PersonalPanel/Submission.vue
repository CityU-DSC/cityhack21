<template>
  <v-container>
    <nav-drawer @direct="directTo"/>
    <v-row>
      <v-col>
        <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="420"
        >
          <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
          </template>

          <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg" height="200px">
            <pdf :src="pdfTempUrl" style="height: 200px; object-fit: contain;"/>
            <v-row class="mb-5">
              <v-spacer/>
              <v-col align="right">
                <a :href="projectDetail.repositoryUrl" target="_blank">
                  <v-btn
                      color="#2b3137"
                      :disabled="!projectDetail.repositoryUrl"
                      class="ma-2 white--text"
                  >
                    Repository
                    <v-icon right>
                      mdi-github
                    </v-icon>
                  </v-btn>
                </a>
                <v-btn
                    color="blue-grey"
                    class="ma-2 white--text"
                    :disabled="!pdfTempUrl"
                >
                  Presentation
                  <v-icon right>
                    mdi-cloud-download
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-parallax>
          <v-row style="position: relative; top: -30px;">
            <v-col cols="1" class="ml-3">
              <v-btn elevation="24" icon>
                <v-icon color="red" large>mdi-heart</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1" class="ml-5">
              <v-btn elevation="24" icon>
                <v-icon large>mdi-share</v-icon>
              </v-btn>
            </v-col>
            <v-spacer/>
            <v-col style="position: relative; top: -20px;">
              <v-avatar size="80">
                <img
                    style="border: 3px solid white;"
                    :src="logoImg.url"
                    alt="logo"
                >
              </v-avatar>
            </v-col>
          </v-row>
          <v-row class="pa-4" style="position: relative; top: -40px;">
            <v-card-title>{{ projectDetail.name }}</v-card-title>
            <v-card-text>
              <h4 style="color: #ff9900; font-weight: bold;">Description</h4>
              <div>{{ projectDetail.description }}</div>
              <h4 class="mt-5" style="color: #ff9900; font-weight: bold;">Motivation</h4>
              <div> {{ projectDetail.motivation }}</div>
            </v-card-text>
            <v-card-text class="mt-5" style="padding-bottom: 0;">
              <h4 style="color: #ff9900; font-weight: bold;">Technologies</h4>
              <v-sheet elevation="2">
                <v-chip-group>
                  <v-chip
                      color="#a64942"
                      v-for="tech in projectDetail.tech"
                      :key="tech"
                  >
                    {{ tech }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-card-text>

          </v-row>
          <v-row class="pa-3" v-if="currentTeam">
            <v-col cols="5">
              <v-card-subtitle>{{ currentTeam.name }}</v-card-subtitle>
            </v-col>
            <v-col>
              <v-divider class="mt-5"></v-divider>
            </v-col>
            <v-card-text style="padding-bottom: 0;">
              <v-row style="position: relative; top: -40px;">
                <v-col class="mt-2">
                  <v-chip>{{ currentTeam.topic }}</v-chip>
                </v-col>
                <v-spacer/>
                <v-col align="right">
                  <v-avatar
                      class="mr-2"
                      v-for="member in currentTeam.members"
                      :key="member._id"
                      @click="openDetailProfile(member)"
                      size="40"
                  >
                    <img
                        :src="member.avatarUrl"
                        alt="member.name"
                    >
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>

      <!--      form-->
      <v-col>
        <v-card
            class="mx-auto my-12 pa-3"
        >
          <v-form
              ref="form"
              lazy-validation
          >
            <small style="color: #ff9900;">Please Upload Your Logo Image</small>
            <v-file-input
                :rules="[rules.logoSize]"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="upload your logo"
                prepend-icon="mdi-camera"
                :loading="uploadingLogo"
                @change="logoImgtoUrl"
            ></v-file-input>
            <small style="color: #ff9900;">Please Upload Presentation file with pdf format</small>
            <v-file-input
                show-size
                accept=".pdf"
                placeholder="only pdf is accepted"
                prepend-icon="mdi-paperclip"
                @change="uploadPdfToFireBase"
                :loading="uploading"
                required
                class="mb-3"
            >
              <template v-slot:selection="{ text }">
                <v-chip
                    small
                    label
                    color="primary"
                >
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
            <v-text-field
                v-model="projectDetail.name"
                :counter="10"
                :rules="rules.projectName"
                label="Project Name"
                required
            ></v-text-field>

            <v-text-field
                v-model="projectDetail.repositoryUrl"
                type="url"
                :rules="rules.url"
                label="Repository Url"
                placeholder="ex: https://github..."
                required
            ></v-text-field>

            <v-textarea
                filled
                label="Description"
                color="amber"
                counter
                :rules="rules.textArea"
                clearable
                v-model="projectDetail.description"
            ></v-textarea>
            <v-textarea
                filled
                label="Motivation"
                counter
                :rules="rules.textArea"
                clearable
                background-color="amber"
                v-model="projectDetail.motivation"
            ></v-textarea>

            <v-select
                v-model="projectDetail.tech"
                :items="techSelection"
                multiple
                chips
                :rules="rules.techs"
                label="Tech Used"
                required
            ></v-select>
            <v-card-actions>
              <v-row>
                <v-spacer/>
                <v-btn
                    color="#ff9900"
                    class="mr-4"
                    :disabled="uploading || uploadingLogo"
                    @click="submit"
                    :loading="submitting"
                >
                  Submit Project
                </v-btn>

                <v-btn
                    color="#a64942"
                    class="mr-4"
                    @click="reset"
                >
                  Reset
                </v-btn>
              </v-row>
            </v-card-actions>

          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <ProfileDetail v-model="openProfile" :profileDetail="selectedProfile"/>
  </v-container>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import pdf from 'vue-pdf';
import {db, storage} from "@/config/firebaseConfig";
import Swal from "sweetalert2";
import {mapGetters, mapActions} from "vuex";
import ProfileDetail from "@/PersonalPanel/components/ProfileDetail";

export default {
  name: "Submission",
  components: {
    navDrawer,
    pdf,
    ProfileDetail,
  },
  watch: {
    uploadPdf(n) {
      this.uploadPdf = n;
    },
  },
  data() {
    return {
      //profile
      openProfile: false,
      selectedProfile: null,

      currentTeam: null,
      currentProject: null,

      // card
      loading: false,
      selection: 1,

      // pdf
      uploadPdf: {name: "", file: null, url: ""},
      uploadValue: null,
      pdfTempUrl: null,
      uploading: false,

      // logo
      logoImg: {
        name: "logo",
        file: null,
        url: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Flogo_w%20(1).png?alt=media&token=cb078b46-349e-4a0c-b228-11b262a9fe8b"
      },
      uploadingLogo: false,

      // form
      projectDetail: {
        name: '',
        pdfUrl: '',
        logoUrl: '',
        repositoryUrl: '',
        description: '',
        motivation: '',
        tech: [],
      },
      submitting: false,

      rules: {
        logoSize: (value) => !value || value.size <= 3500000 || 'Avatar size should be less than 3 MB!',
        projectName: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 12) || 'Name must be less than 12 characters',
        ],
        url: [
          v => !!v || 'Repository Url is required',
          v =>
              /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(v)
              || 'Url should be valid'
        ],
        textArea: [
          v => v.length <= 100 || 'Maximum 300 characters',
          v => v.length >= 50 || 'Too short buddy, at least 50 characters',
        ],
        techs: [
          v => !!v || 'Please select at least one',
          v => v.length <= 3 || 'Too greedy'
        ]
      },
      techSelection: [
        'Software',
        'Hardware',
        'Atlas 200 DK',
        'AWS Sagemaker',
        'AWS',
        'Google',
        'Azure',
        'Elastic Search',
        "Big Data",
        "Machine Learning",
        "Deep Learning",
        'IOT',
        'Security',
        'Web',
        'Internet',
        'Docker',
        'K8s',
        'Cloud',
        'BlockChain',
        'Science',
        'Data Analysis',
        'Python',
        'PHP',
        'JS',
        'Vue',
        'React',
        'Angular',
        'GraphQL',
        'Database',
        'Ubuntu',
        'System',
        'Image Recognition',
        'Image Visualization',
        'OOP',
        'Software Testing'
      ],
    }
  },
  computed: {
    ...mapGetters("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("teams", ['myTeam']),
    ...mapActions('project', ['myProject', 'createProject', "editProject"]),
    directTo(page) {
      this.$router.push(page);
    },
    openDetailProfile(profile) {
      this.selectedProfile = profile;
      this.openProfile = true;
    },
    // card
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    // pdf
    async uploadPdfToFireBase(f) {
      if (f) {
        this.uploading = true;
        // read file
        const file = f;
        this.uploadPdf.name = f.name;

        const fr = new FileReader();
        await fr.readAsDataURL(file);
        await fr.addEventListener("load", () => {
          this.uploadPdf.url = fr.result;
          this.pdfTempUrl = fr.result;
          this.uploadPdf.file = file;
        });
      } else {
        if (storage.ref().child(`presentation/${this.uploadPdf.name}`)) {
          await storage.ref().child(`presentation/${this.uploadPdf.name}`).delete().then(() => {
            Swal.fire(
                'Success',
                'Delete Presentation File on DB',
                'success'
            );
          }).catch(console.error);
        }
        this.uploadPdf = {name: "", file: null, url: ""};
        this.pdfTempUrl = null;
        this.projectDetail.pdfUrl = "";
      }
      this.uploading = false;
    },
    async upToFireBase(){
      //upload pdf
      const storageRef = storage.ref().child(`presentation/${this.uploadPdf.name}`);
      await storageRef.put(this.uploadPdf.file).then(async snapshot => {
        await snapshot.ref.getDownloadURL().then(async url => {
          try {
            await db.collection('presentation').add({
              name: this.uploadPdf.name,
              url: url,
              timestamp: Date.now(),
            }).then(() => {
              this.uploadPdf.url = url;
              this.projectDetail.pdfUrl = url;
            }).catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              });
            });
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
      // upload logo image
      let mountRef = storage.ref().child(`logo/${this.logoImg.name}`);
      await mountRef.put(this.logoImg.file).then(async snapshot => {
        await snapshot.ref.getDownloadURL().then(async url => {
          this.projectDetail.logoUrl = url;
          const bucketName = "cityhack21-6404b.appspot.com";
          const filePath = this.logoImg.name;
          try {
            await db.collection("logoImg").add({
              url,
              downloadUrl:
                  `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/avatar` +
                  "%2F" +
                  `${encodeURIComponent(filePath)}?alt=media`,
              timestamp: Date.now()
            }).then(() => {
              this.projectDetail.logoUrl = url;
            });
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
    },
    // from
    async submit() {
      this.submitting = true;
      if (this.$refs.form.validate() && this.logoImg.url && this.uploadPdf.url) {
        await this.upToFireBase();
        if (this.currentProject) {
          await this.editProject(this.projectDetail).then(res => {
            this.currentProject = res;
            Swal.fire(
                'Success',
                'Successfully Edit Project',
                'success'
            );
          }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            });
          });
        } else {
          await this.createProject(this.projectDetail).then(res => {
            this.currentProject = res;
            Swal.fire(
                'Success',
                'Successfully Upload Project, please go to projects page to check',
                'success'
            ).then((result) => {
              if (result.isConfirmed) {
                this.$router.push({name: "personal_projects"});
              }
            })
          }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            });
          })
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Finish all the form input',
        });
      }
      this.submitting = false;
    },
    reset() {
      this.$refs.form.reset()
    },
    async logoImgtoUrl(e) {
      const logo = e;
      if (logo) {
        this.uploadingLogo = true;
        this.logoImg.name = logo.name;
        if (this.logoImg.name.lastIndexOf(".") <= 0) {
          this.uploading = false;
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(logo);
        await fr.addEventListener("load", () => {
          this.logoImg.url = fr.result;
          this.logoImg.file = logo;
        });
        this.projectDetail.logoUrl = this.logoImg.url;
      } else {
        if (storage.ref().child(`logoImg/${this.logoImg.name}`)) {
          await storage.ref().child(`logoImg/${this.logoImg.name}`).delete().then(() => {
            Swal.fire(
                'Success',
                'Delete Logo Image on DB',
                'success'
            );
          }).catch(console.error);
        }
        this.logoImg = {
          name: null,
          url: "https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Flogo_w%20(1).png?alt=media&token=cb078b46-349e-4a0c-b228-11b262a9fe8b",
          file: null
        };
        this.projectDetail.logoUrl = this.logoImg.url;
      }
      this.uploadingLogo = false;
    },
  },
  async mounted() {
    await this.myTeam().then(res => this.currentTeam = res).catch(err => console.error(err));
    await this.myProject().then(res => {
      this.currentProject = res;
      for (let key in this.projectDetail) {
        this.projectDetail[key] = this.currentProject[key];
      }
      this.logoImg.url = this.projectDetail.logoUrl;
      this.uploadPdf.url = this.projectDetail.pdfUrl;
    }).catch(err => console.error(err));
  },
}
</script>

<style scoped>
.v-application .ma-2 {
  margin: 2px !important;
}
</style>
