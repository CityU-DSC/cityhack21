<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon color="red" x-large>mdi-share-variant</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="(item, i) in items"
            :key="i"
            link
        >
          <v-list-item-title>
            <ShareNetwork
                :network="item.network"
                :url="url"
                :title="title"
                :description="description"
                :quote="quote"
                :hashtags="hashtags"
            >
              <v-icon>{{ item.icon }}</v-icon>
              <span>{{ item.title }}</span>
            </ShareNetwork>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "shareNetworks",
  props: {
    url: String,
    title: String,
    description: String,
    hashtags: String,
    quote: String,
  },
  data() {
    return {
      items: [
        {title: "Twitter", icon: "mdi-twitter", network: "twitter"},
        {title: "Telegram", icon: "mdi-telegram", network: "telegram"},
        {title: "Whatsapp", icon: "mdi-whatsapp", network: "whatsapp"},
        {title: "Email", icon: "mdi-email", network: "email"},
        {title: "LinkedIn", icon: "mdi-linkedin", network: "linkedin"}
      ],
    }
  }
}
</script>

<style>
span {
  color: white;
}
a {
  text-decoration: none !important;
}
</style>
