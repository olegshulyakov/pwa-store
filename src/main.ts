import "@material-design-icons/font";
import { createPinia } from "pinia";
import { PiniaLogger } from "pinia-logger";
import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router";
import { isDevMode } from "./utils/debug";

const pinia = createPinia();
pinia.use(
  PiniaLogger({
    expanded: false,
    disabled: !isDevMode,
  })
);

const app = createApp(App);
app.use(pinia);
app.use(i18n);
app.use(router);

router.isReady().then(() => {
  app.mount("#app");
});
