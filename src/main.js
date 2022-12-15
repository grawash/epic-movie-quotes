import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "@/i18n/index.js";
import App from "./App.vue";
import router from "./router";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import "@/assets/tailwind.css";
import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";

const app = createApp(App);
app.component("infinite-loading", InfiniteLoading);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
