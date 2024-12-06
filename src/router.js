import {createRouter, createWebHistory} from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import UserAPI from "@/api/UserAPI";
import store from "./store/auth";
// lazy-loaded

const Home = () => import("./components/Home.vue")
const AddAdmin = () => import("./components/owner/AddAdmin.vue")
const AddClient = () => import("./components/admin/AddClient")
const AddTrainer = () => import("./components/admin/AddTrainer")
const ScheduleCreation = () => import("./components/admin/ScheduleCreation.vue")
const SetUserSubscription = () => import("@/components/admin/SetUserSubscription");
const Schedule = () => import("@/components/trainer/Schedule");
const ScheduleRegistration = () => import("@/components/client/ScheduleRegistration");
const Profile = () => import("@/components/client/Profile");

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/register",
        component: Register,
    },
    {
        path: "/owner",
        name: "owner",
        // lazy-loaded
        component: AddAdmin,
    },

    /* admin pages */
    {
        path: "/admin/client",
        name: "client",
        // lazy-loaded
        component: AddClient,
    },
    {
        path: "/admin/trainer",
        name: "admin",
        // lazy-loaded
        component: AddTrainer,
    },
    {
        path: "/admin/users",
        name: "SetUserSubscription",
        // lazy-loaded
        component: SetUserSubscription,
    },
    {
        path: "/admin/schedule",
        name: "ScheduleCreation",
        // lazy-loaded
        component: ScheduleCreation,
    },
    /* trainer pages */
    {
        path: "/trainer/schedule",
        name: "Schedule",
        // lazy-loaded
        component: Schedule,
    },
    /* user pages */
    {
        path: "/schedule",
        name: "ScheduleRegistration",
        // lazy-loaded
        component: ScheduleRegistration,
    },
    {
        path: "/profile",
        name: "Profile",
        // lazy-loaded
        component: Profile,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/'];
    const authPages = ['/login', '/register'];
    const authRequired = !publicPages.concat(authPages).includes(to.path);
    const jwtToken = localStorage.getItem('jwtToken');
    const oneMinute = 60 * 1000;

    store.state.auth.user = undefined;
    store.state.showFooter = !authPages.includes(to.path);

    if (!jwtToken || (jwtToken && Date.now() + oneMinute > jwtToken.expirationDate)) {
        if (authRequired) {
            next('/login');
        } else {
            next();
        }
    } else {
        UserAPI.getUser().then(result => {
                /* can be handled other non 200 statuses */
                if (result.status === 401) {
                    if (authRequired) {
                        next('/');
                    } else {
                        next();
                    }
                } else {
                    store.state.auth.user = result.data;

                    if (authPages.includes(to.path)) {
                        next('/');
                    } else {
                        next();
                    }
                }
            },
            error => {
                next('/login');
            })
    }
});

export default router;