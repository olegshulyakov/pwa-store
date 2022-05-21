import { createRouter, createWebHistory } from "vue-router";
import { debug } from "../utils";
import AboutView from "../views/AboutView.vue";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
  ],
});
router.beforeEach((to, from, next) => {
  debug.router.route(to, from);
  next();
});

export default router;
