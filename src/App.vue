<template>
  <v-card>
    <v-layout>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar color="indigo" prominent density="compact">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>Fresomac</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="search"></v-btn>

        <v-btn variant="text" icon="account_circle"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" location="left" temporary>
        <v-list nav>
          <v-list-subheader>Menu Principal</v-list-subheader>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.route"
            :value="item"
            color="blue"
            rounded="xl"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title
              v-text="item.text"
              class="text-subtitle-2"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-container fluid>
        <v-main style="height: 95vh; width: 100%">
          <router-view></router-view>
        </v-main>
      </v-container>
    </v-layout>
  </v-card>
</template>
<script>
import { ref } from "vue";

export default {
  name: "App",

  data() {
    return {
      items: [
        {
          text: "Personal",
          icon: "person",
          route : "/personal"
        },
        {
          text: "Asistencia",
          icon: "date_range",
          route : "/asistencia"
        },
        {
          text: "Vacaciones",
          icon: "beach_access",
          route : "/vacaciones"
        },
        {
          text: "Contratos",
          icon: "document_scanner",
          route : "/contrato"
        },
        {
          text: "Capacitaciones",
          icon: "reduce_capacity",
          route : "/capacitaciones"
        },
        {
          text: "Induccion",
          icon: "wc",
          route : "/induccion"
        },
        {
          text: "Legajos",
          icon: "batch_prediction",
          route: "/",
        },
        {
          text: "Memorandum",
          icon: "article",
          route: "/",
        },
        {
          text: "Conformidades",
          icon: "picture_as_pdf",
          route: "/",
        },
        {
          text: "Reclt. Selección",
          icon: "face",
          route: "/",
        },
        {
          text: "SCTR",
          icon: "admin_panel_settings",
          route: "/",
        },
        {
          text: "Accidentes",
          icon: "personal_injury",
          route: "/",
        },
      ],
      drawer: false,
      group: null,
    };
  },

  watch: {
    drawer(newValue, oldValue) {
      console.log(`Drawer changed from ${oldValue} to ${newValue}`);
    },
  },
};
</script>
