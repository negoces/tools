import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/getmcs",
    name: "Getmcs",
    component: () => import("../views/Getmcs.vue"),
  },
  {
    path: "/qrcode",
    name: "QRCode",
    component: () => import("../views/qrcode.vue"),
  },
  {
    path: "/base64",
    name: "Base64",
    component: () => import("../views/base64.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
