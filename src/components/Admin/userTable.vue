<template>
  <v-container>
    <v-btn @click="searchUsers">Search Users</v-btn>
    <v-data-table
        :headers="headers"
        :items="filteredUsers"
        class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-right"> {{ formatDateTime(props.item.created_at) }}</td>
        <td class="text-xs-right"> {{ formatDateTime(props.item.updated_at) }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions} from 'vuex';
import dayjs from 'dayjs';
export default {
  name: "userTable",
  data() {
    return {
      headers: [
        { text: 'User ID', align: 'left', value: '_id'},
        {text: 'Name', value: 'name'},
        {text: 'Email', value: 'email'},
        {text: 'Created At', value: 'created_at'},
        {text: 'Updated At', value: 'updated_at'},
      ],
      filteredUsers: [],
    }
  },
  methods: {
    ...mapActions('users', ['listAllUsers']),
    searchUsers(){
      this.listAllUsers().then(res => this.filteredUsers = res);
    },
    formatDateTime(time){
      console.log(time)
      return dayjs(time).format("YYYY-MM-DD");
    },
  },
}
</script>

<style scoped>

</style>
