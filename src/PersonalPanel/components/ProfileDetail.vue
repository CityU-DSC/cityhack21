<template>
  <v-dialog v-model="show" max-width="500px">
    <v-row justify="space-around">
      <v-card>
        <v-img
            height="200px"
            src="https://firebasestorage.googleapis.com/v0/b/cityhack21-6404b.appspot.com/o/registration_material%2Fdear.jpg?alt=media&token=21d888e4-f980-42f0-8770-4bdca6f0be16"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">

            <v-spacer></v-spacer>

            <v-menu
                bottom
                left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    dark
                    icon
                    v-bind="attrs"
                    v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                    class="v-chip--clickable"
                    v-for="(item, i) in items"
                    :key="i"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                  alt="profileAvatar"
                  :src="currentProfile.avatar"
              >
            </v-avatar>
            <p class="ml-3">
              {{ currentProfile.name }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <v-row>
            <v-col class="font-weight-bold ml-8 mb-2">Email</v-col>
            <v-col>{{currentProfile.email}}</v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row>
            <v-spacer />
            <v-btn color="#ff9900" outlined rounded @click.stop="show=false">Close</v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-dialog>
</template>

<script>
export default {
  name: "ProfileDetail",
  props: {
    value: Boolean,
    profileDetail: Object,
  },
  data() {
    return {
      currentProfile: null,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
  watch: {
    profileDetail(newV) {
      this.currentProfile = newV;
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
    },
  },
}
</script>
