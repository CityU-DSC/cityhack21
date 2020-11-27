import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "./views/home";
import Overview from "./views/overView";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import Admin from "./views/admin";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: LandingPage },
  { path: "/overview", component: Overview, name: "overview" },
  { path: "/overview", component: Overview },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/admin", component: Admin, meta: { requiresAuth: true } }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt")) {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default router;
