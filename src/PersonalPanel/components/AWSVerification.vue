<template>
<div>
  <nav-drawer @direct="directTo" :current="pathName"/>

  <br>

  <div>
    <v-row justify="space-around">
      <v-card width="400">
        <v-img
          height="200px"
          :src="submissionDetail.imageUrl"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>
        </v-img>

        <v-card-text v-if="submissionDetail.imageUrl">
          <div class="font-weight-bold ml-8 mb-2">
            Status: Upload Completed
          </div>
        </v-card-text>

        <v-card-text v-else>
          <div class="font-weight-bold ml-8 mb-2">
            Status: Upload incomplete
          </div>
        </v-card-text>

      </v-card>
    </v-row>
  </div>
  <div id="uploader">
    <v-app id="inspire">
      <v-content>
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
              <v-btn color="primary" @click="upload">Upload</v-btn>
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
      </v-content>
    </v-app>
  </div>
</div>
</template>

<script>
import navDrawer from "@/PersonalPanel/components/navDrawer";
import firebase from 'firebase'
import { db } from "../../config/firebaseConfig.js"
import swal from "sweetalert"

export default {
  name: "AWSVerification",
  components: {
    navDrawer,
  },
  data() {
    return {
      pathName: "AWSVerification Page",
      dialog: false,
      imageName: "",
      imageUrl: "",
      imageFile: "",
      //image_src: require("imageUrl"),
      imgUrls: [],
      submissionDetail: {
        imageUrl: null,
      }
    };
  },
  created() {
    this.getImages();
  },
  methods: {
    directTo(page) {
      this.$router.push(page);
    },
    getImages: function() {
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
      console.log(">>>>>>", e);
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
      console.log(">>>>> imageName: ", this.imageName);
      console.log(">>>>> imageFile: ", this.imageFile);
      console.log(">>>>> imageUrl: ", this.imageUrl);
    },
    
    upload: function() {
      // ストレージオブジェクト作成
      var storageRef = firebase.storage().ref();
      // ファイルのパスを設定
      var mountainsRef = storageRef.child(`images/${this.imageName}`);
      // ファイルを適用してファイルアップロード開始
      if(this.imageName==""){
        swal("Error", "No image selected yet", "error");
        return;
      }
      mountainsRef.put(this.imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imageUrl = downloadURL;
          const bucketName = "cityhack21-6404b.appspot.com";
          const filePath = this.imageName;
          try{
            db.collection("VerificationImages").add({
              downloadURL,
              downloadUrl:
                `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/images` +
                "%2F" +
                `${encodeURIComponent(filePath)}?alt=media`,
              timestamp: Date.now()
            }).then(()=>{
                swal("Success", "Verification Image Was successful", "success");
                this.submissionDetail.imageUrl=downloadURL;
                console.log(">>>submissionDetail: imageUrl",this.submissionDetail.imageUrl);
              }
            );
            this.getImages();

          }
          catch(err){
            console.error(err);
            swal("Error", "Something Went Wrong", "error");
          }
          
        });
      });
      //this.getImages();
    }
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
</style>
