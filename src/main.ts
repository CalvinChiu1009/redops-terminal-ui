import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import "./style.css";
import App from "./App.vue";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale, // X 軸 (時間/類別)
  LinearScale, // Y 軸 (數值)
  ArcElement, // 圓餅圖/甜甜圈圖
);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
