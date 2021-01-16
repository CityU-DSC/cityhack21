<template>
  <v-container>
    <v-app-bar
    >

      <v-spacer></v-spacer>
      <v-autocomplete
          v-model="selectCategory"
          :items="categories"
          flat
          style="width: 1rem;"
          hide-no-data
          hide-details
          label="Search Category"
          solo-inverted
      ></v-autocomplete>
    </v-app-bar>
    <v-data-table
        :headers="headers"
        :items="filteredProjects"
        class="mt-5"
    >
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
      <template v-slot:[`item.pdfUrl`]="{ item }">
        <a :href="item.pdfUrl" target="_blank">
          <v-btn>Download PDF</v-btn>
        </a>
      </template>
      <template v-slot:[`item.repositoryUrl`]="{ item }">
        <a :href="item.repositoryUrl" target="_blank">
          <v-btn>To Repository</v-btn>
        </a>
      </template>
      <template v-slot:[`item.logoUrl`]="{ item }">
        <v-avatar><img :src="item.logoUrl"/></v-avatar>
      </template>
      <template v-slot:items="props">
        <td class="text-xs-right"> {{ formatDateTime(props.item.created_at) }}</td>
        <td class="text-xs-right"> {{ formatDateTime(props.item.updated_at) }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import dayjs from 'dayjs';
import Swal from "sweetalert2";
// import Swal from 'sweetalert2';

export default {
  name: "ProjectsList",
  data() {
    return {
      headers: [
        {text: 'Project ID', align: 'left', value: '_id'},
        {text: 'Name', value: 'name'},
        {text: 'Status', value: 'status'},
        {text: 'Team', value: 'team.name'},
        {text: 'Votes', value: 'votes'},
        {text: 'PDF', value: 'pdfUrl'},
        {text: 'Repository', value: 'repositoryUrl'},
        {text: 'logo', value: 'logoUrl'},
        {text: 'Created At', value: 'created_at'},
        {text: 'Updated At', value: 'updated_at'},
      ],

      allProjects: [],
      filteredProjects: [],
      statuses: [
        'champion',
        '1st',
        '2nd',
        'final',
        'bestTeam',
        'honorable',
        'all',
      ],

      categories: [
        'All Projects',
        'Winning Projects',
        'Final Round Projects',
        'Honorable mention & Best Team Award',
        'Huawei Atlas Projects',
        'AWS SageMaker Projects',
      ],
      selectCategory: null,
    }
  },
  watch: {
    selectCategory(v) {
      switch (v) {
        case 'Winning Projects':
          this.filteredProjects = this.allProjects.filter(pro => pro.status === 'champion' || pro.status === '1st' || pro.status === '2nd');
          break;
        case 'Final Round Projects':
          this.filteredProjects = this.allProjects.filter(pro => pro.status === 'final');
          break;
        case 'Honorable mention & Best Team Award':
          this.filteredProjects = this.allProjects.filter(pro => pro.status === 'bestTeam' || pro.status === 'honorable');
          break;
        case 'Huawei Atlas Projects':
          this.filteredProjects = this.allProjects.filter(pro => pro.team.topic === 'Atlas');
          break;
        case 'AWS SageMaker Projects':
          this.filteredProjects = this.allProjects.filter(pro => pro.team.topic === 'SageMaker');
          break;
        default:
          this.filteredProjects = this.allProjects;
          break;
      }
      this.drawer = true;
    },
  },
  methods: {
    ...mapActions('project', ['listAllProjects', 'setProjectStatus']),
    formatDateTime(time) {
      return dayjs(time).format("YYYY-MM-DD");
    },

    changeStatus(item, newStatus) {
      console.log(item, newStatus);
      Swal.fire({
        title: 'Change Status?',
        text: `This will Change this project status to ${newStatus}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Change it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const params = {'projectId': item._id, 'status': newStatus};
          this.setProjectStatus(params).then(() => {
            Swal.fire(
                'Success',
                'Projects status has been changed',
                'success'
            );
            this.listAllProjects().then(res => this.allProjects = res).catch(console.error);
          }).catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: err.message,
            })
          });
        }
      });
    }
  },
  async mounted() {
    await this.listAllProjects().then(res => {this.allProjects = res; this.filteredProjects = res;}).catch(console.error);
  },
}
</script>

<style scoped>

</style>
