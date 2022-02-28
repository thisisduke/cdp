
import App from "./App.vue";
import router from "./router";
import Antd from "ant-design-vue";

import { createApp } from "vue";
import { store } from "./store/index";

import '@/utils/permission'
import "ant-design-vue/dist/antd.css";


createApp(App)
  .use(store)
  .use(Antd)
  .use(router)
  .mount("#app");
