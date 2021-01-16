<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>Rules and Criteria</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="isOverView" v-bind="attrs" v-on="on" icon @click.stop="lastPage"><v-icon>mdi-chevron-double-up</v-icon></v-btn>
        </template>
        <span>Last Page</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-if="isOverView" v-bind="attrs" v-on="on" icon @click.stop="nextPage"><v-icon>mdi-chevron-double-down</v-icon></v-btn>
        </template>
        <span>Next Page</span>
      </v-tooltip>
    </v-toolbar>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Judging Criteria
          </th>
          <th class="text-left">
            Description
          </th>
          <th class="text-left">
            Percentage
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in rules"
            :key="item.name"
        >
          <td>{{ item.name }}</td>
          <td width="70%">{{item.description}}</td>
          <td width="10%" class="text-xs-right">{{ item.percentage }}</td>
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
    value: Boolean,
    isOverView: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      rules: [
        {
          name: 'Technical complexity',
          percentage: "35%",
          description: "The technical skills and concepts applied. To measure how well the participants understand the technical skills and concepts based on the demo.",
        },
        {
          name: 'Originality & creativity',
          percentage: "20%",
          description: "The project demonstrates insight into the problem that inspired a creative and original solution.",
        },
        {
          name: 'Content Completeness',
          percentage: "15%",
          description: "How thorough the solution can you come up with and on what standards can the problem be solved.",
        },
        {
          name: 'Practicality & Usefulness',
          percentage: "15%",
          description: "Does your product serve a purpose? Justify if the presented solutions can be implemented in a practical sense. ",
        },
        {
          name: 'Pitching Skills',
          percentage: "10%",
          description: "The project should be presented well, in a professional and to the point manner, covering all of the above aspects in the specific time frame",
        },
        {
          name: 'UI, UX Design',
          percentage: "5%",
          description: "There should be a reason for the application to look the way it does (e.g., why are the buttons placed as they are?) Does the application look appealing to the user? Is the application user-friendly?",
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
    nextPage() {
      this.$emit('next');
    },
    lastPage() {
      this.$emit('last');
    }
  }
}
</script>

<style scoped>

</style>
