import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/auth";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/style.css"

createApp(App)
    .use(router)
    .use(store)
    .mount("#app");