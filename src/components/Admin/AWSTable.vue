<template>
  <v-container>
    <v-data-table
        :headers="headers"
        :items="vuexGetAllAWSVerifications"
        class="elevation-1"
    >
      <template v-slot:[`item.imageUrl`]="{ item }">
        <v-img @click="imageWidth === 600? imageWidth = 200 : imageWidth = 600" :width="imageWidth" :src="item.imageUrl"/>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-menu left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              {{ item.status }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
                v-for="(s, i) in statuses"
                :key="i"
                link
                @click="changeStatus(item, s)"
            >
              <v-list-item-title>
                {{ s }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from "sweetalert2";

export default {
  name: "AWSTable",
  computed: {
    ...mapGetters('aws_verify', ['vuexGetAllAWSVerifications']),
  },
  data() {
    return {
      headers: [
        {text: 'User Email', align: 'left', value: 'userId.schoolEmail'},
        {text: 'ID', value: '_id'},
        {text: 'Status', value: 'status'},
        {text: 'Image', value: 'imageUrl'},
        {text: 'Admin', value: 'admin.accountId'},
      ],
      imageWidth: 200,

      statuses: [
          'pending',
          'success',
          'reject',
      ],
    }
  },
  methods: {
    ...mapActions('aws_verify', ['getAllAWSVerification', 'updateAWSVerificationStatus']),
    changeStatus(item, newStatus) {
      console.log(item, newStatus);
      Swal.fire({
        title: 'Change Status?',
        text: `This will Change this AWS status to ${newStatus}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Change it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const params = {'awsId': item._id, 'status': newStatus};
          this.updateAWSVerificationStatus(params).then(() => {
            Swal.fire(
                'Success',
                'AWS status has been changed',
                'success'
            );
            this.getAllAWSVerification();
          }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            })
          });
        }
      });
    },
  },
  async mounted() {
    await this.getAllAWSVerification().catch(console.error);
  },
}
</script>

<style scoped>

</style>
