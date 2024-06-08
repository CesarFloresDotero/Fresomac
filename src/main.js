import "devextreme/dist/css/dx.fluent.saas.light.compact.css";
import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@mdi/font/css/materialdesignicons.css";
import { aliases, md } from "vuetify/iconsets/md";
import { mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "../src/router/index";
import Toast, { toastInjectionKey } from "vue-toastification";
import "vue-toastification/dist/index.css";


const axiosInstance = axios.create({
  baseURL: "https://144.126.138.183/",
});

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance;

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "md",
    aliases,
    sets: {
      md,
      mdi,
    },
  },
});

app
  .use(vuetify)
  .use(router)
  .use(Toast, {
    transition: "Vue-Toastification__fade",
    maxToasts: 20,
    newestOnTop: true,
  })
  .mount("#app");
