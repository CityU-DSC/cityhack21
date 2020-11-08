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
            Name
          </th>
          <th class="text-left">
            Calories
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
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
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