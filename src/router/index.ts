import { createRouter, createWebHistory } from "vue-router";
import { debug } from "../utils";
import AboutView from "../views/AboutView.vue";
import CategoryView from "../views/CategoryView.vue";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";

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
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/category/:name",
      name: "category",
      component: CategoryView,
      props: true,
    },
  ],
});
router.beforeEach((to, from, next) => {
  debug.router.route(to, from);
  next();
});

export default router;
