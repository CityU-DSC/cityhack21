<template>
  <div>
    <nav-drawer @direct="directTo" :current="pathName"/>
    <v-col>
      <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
      >
        <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
        >
          <v-sheet
              :color="colors[i]"
              height="100%"
          >
            <v-row
                class="fill-height"
                align="center"
                justify="center"
            >
              <div class="display-3">
                {{ slide }}
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-col>
    <v-col>
      <v-parallax
          v-for="img in awsImgs"
          :key="img._id"
          :src="img.imageUrl"
          height="200"
      >
        <v-alert
            width="200"
            transition="scale-transition"
            dense
            id="awsStatus"
            type="warning"
        >
          {{ img.status }}
        </v-alert>

      </v-parallax>
    </v-col>
    <div class="mt-5">
      <!--    <v-col>-->
      <!--      <h5>Example</h5>-->
      <!--      <img src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2FScreenshot%202020-12-21%20194322.jpg?alt=media&token=a141b908-2a1c-4762-9d24-e61df1e36d14"-->
      <!--           style="max-height: 250px; min-height: 50px;" alt="exampleAWS">-->
      <!--    </v-col>-->
      <v-row justify="space-around">
        <v-card width="400">
          <v-img
              height="200px"
              :src="submissionDetail.imageUrl? submissionDetail.imageUrl : awsImgs.length>0? awsImgs[0].imageUrl : null"
          >
          </v-img>

          <v-card-text v-if="submissionDetail.imageUrl">
            <div class="font-weight-bold ml-8 mb-2">
              Status: Upload Completed
            </div>
          </v-card-text>

        </v-card>
      </v-row>
    </div>
    <div id="uploader">
      <v-app id="inspire">
        <v-main>
          <v-container fluid>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                <img :src="imageUrl" height="150" v-if="imageUrl">
                <v-file-input
                    label="Select Image"
                    accept="image/*"
                    ref="image"
                    @change="onFilePicked"
                >
                </v-file-input>
                <v-btn :loading="uploading" color="primary" @click="upload">Upload</v-btn>
              </v-flex>
            </v-layout>

            <br>

            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4>
                <div v-for="i in imgUrls" :key="i">
                  <br>
                  <img :src="i.downloadUrl" height="150">
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-main>
      </v-app>
    </div>
    <guide v-model="showAWSGuide" />
  </div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import {db, storage} from "../config/firebaseConfig.js"
import Swal from "sweetalert2"
import guide from "@/PersonalPanel/components/awsVerifyGuide";

import {mapActions} from "vuex";

export default {
  name: "AWSVerification",
  components: {
    navDrawer,
    guide,
  },
  data() {
    return {
      showAWSGuide: false,

      awsImgs: [],

      pathName: "AWSVerification Page",
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      //image_src: require("imageUrl"),
      imgUrls: [],
      uploading: false,
      submissionDetail: {
        imageUrl: null,
      },
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'Multiple Gifts From AWS Educate',
        'Unique AWS Souvenirs',
        'Free 100USD Credits',
        'Using SageMaker in CityHack',
      ],
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    ...mapActions('aws_verify', ['awsVerify', 'getAWSVerifications']),
    directTo(page) {
      this.$router.push(page);
    },
    getImages: function () {
      db.collection("images")
          .get()
          .then(snap => {
            const array = [];
            snap.forEach(doc => {
              array.push(doc.data());
            });
            this.imgUrls = array;
          });

      this.imageName = "";
      this.imageFile = "";
      this.imageUrl = "";
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const file = e;
      if (file !== undefined) {
        this.imageName = file.name;
        if (this.imageName.lastIndexOf(".") <= 0) {
          return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
          //console.log("imageUrl");
          this.imageFile = file; // this is an image file that can be sent to server...
          //this.getImages();
        });
      } else {
        this.imageName = "";
        this.imageFile = "";
        this.imageUrl = "";
      }
    },
    upload: function () {
      this.uploading = true;
      let mountainsRef = storage.ref().child(`images/${this.imageName}`);
      if (this.imageName === "") {
        Swal.fire({
          icon: 'error',
          title: 'No image is selected yet',
          text: 'Please select an image first',
        });
        this.uploading = false;
        return;
      }
      mountainsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imageUrl = downloadURL;
          const bucketName = "cityhack21-6404b.appspot.com";
          const filePath = this.imageName;
          try {
            db.collection("VerificationImages").add({
              downloadURL,
              downloadUrl:
                  `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/images` +
                  "%2F" +
                  `${encodeURIComponent(filePath)}?alt=media`,
              timestamp: Date.now()
            }).then(() => {
                  Swal.fire(
                      'Success',
                      'Image has been uploaded, pending for verification',
                      'success'
                  );
                  this.submissionDetail.imageUrl = downloadURL;
                  this.awsVerifyUrl();
                }
            );
            this.getImages();

          } catch (err) {
            console.error(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            });
          }

        });
      });
      this.uploading = false;
    },
    async awsVerifyUrl() {
      try {
        await this.awsVerify({imageUrl: this.submissionDetail.imageUrl})
            .then(res => {
              console.log("awsVerification: ", res);
            })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
        console.error(err);
      }
    }
  },
  async mounted() {
    this.showAWSGuide = true;
    await this.getAWSVerifications().then(res => this.awsImgs = res);
  }
}
</script>
<style lang="scss" scoped>
#uploader {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#awsStatus {
  text-align: center;
  position: relative;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}
</style>
