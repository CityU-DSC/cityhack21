<template>
  <v-container>
    <v-toolbar
        flat
    >
      <v-toolbar-title>CityHack 2021 Rules and Criteria</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Judging Criteria
          </th>
          <th class="text-left">
            Percentage
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in desserts"
            :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  name: "rulesAndCriteria",
  props: {
    value: Boolean
  },
  data() {
    return {
      desserts: [
        {
          name: 'Originality and creativity',
          calories: "30%",
        },
        {
          name: 'Content / topic',
          calories: "20%",
        },
        {
          name: 'Practicality ',
          calories: "20%",
        },
        {
          name: 'Design and aesthetics',
          calories: "15%",
        },
        {
          name: 'Technical complexity',
          calories: "15%",
        },
      ],
    }
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>

</style>