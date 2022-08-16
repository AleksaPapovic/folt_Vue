import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const app = createApp(App);

app.use(store);
app.use(router);
axios.defaults.baseURL = "https://localhost:5001/api/";


app.mount("#app");
