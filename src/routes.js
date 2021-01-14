import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "./views/home";
import Overview from "./views/overView";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import Admin from "./views/admin";

import PersonalPanel from "./PersonalPanel/home";
import PersonalProfile from "./PersonalPanel/profile";
import AWSVerification from "./PersonalPanel/AWSVerification";
import TeamUp from "@/PersonalPanel/TeamUp";
import TimeSlot from "@/PersonalPanel/TimeSlot";
import Submission from "@/PersonalPanel/Submission";
import Projects from "@/PersonalPanel/Projects";

Vue.use(VueRouter);

const routes = [
    {path: "/", component: LandingPage, name: "landing"},
    {path: "/overview", component: Overview, name: "overview"},
    {path: "/login", component: Login, name: "login"},
    {path: "/register", component: Register, name: "register"},
    {path: "/admin", component: Admin, name: "admin", meta: {requiresAuth: true}},
    {path: "/personal", component: PersonalPanel, name: "personal"},
    {path: "/personal/profile", component: PersonalProfile, name: "personal_profile"},
    {path: "/personal/verification", component: AWSVerification, name: "personal_verification"},
    {path: "/personal/team", component: TeamUp, name: "personal_team"},
    {path: "/personal/timeSlot", component: TimeSlot, name: "personal_time"},
    {path: "/personal/submission", component: Submission, name: "personal_submission"},
    {path: "/personal/projects", component: Projects, name: "personal_projects"},
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
            next({path: "/"});
        }
    } else {
        next();
    }
});

export default router;
