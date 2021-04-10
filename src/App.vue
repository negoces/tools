<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      class="deep-purple accent-4"
      dark
    >
      <v-list nav dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              NEGOCES's Tools
            </v-list-item-title>
            <v-list-item-subtitle> tools.negoces.top </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item-group v-model="group">
          <v-list-item
            :to="{ path: '/' }"
            @click="
              {
                title = '首页';
              }
            "
          >
            <v-list-item-title> 首页 </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="{ path: '/getmcs' }"
            @click="
              {
                title = 'Get MCS';
              }
            "
          >
            <v-list-item-title> Get MCS </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="{ path: '/qrcode' }"
            @click="
              {
                title = 'QRCode';
              }
            "
          >
            <v-list-item-title> QR Code </v-list-item-title>
          </v-list-item>

          <v-list-item
            :to="{ path: '/base64' }"
            @click="
              {
                title = 'Base64';
              }
            "
          >
            <v-list-item-title> Base64 </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view style="margin-top: 48px"></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    title: "Tools",
    //
  }),
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap");
html,
body {
  font-family: "Noto Sans", sans-serif;
}
</style>
