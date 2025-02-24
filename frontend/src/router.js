import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue";
import HomePage from "./pages/HomePage.vue";
import MyImages from "./pages/MyImages.vue";
import LoginPage from "./pages/LoginPage.vue";
import SignUpPage from "./pages/SignUpPage.vue";
import { useUserStore } from "./store/user";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "home", component: HomePage },
      { path: "images", name: "my-images", component: MyImages },
    ],
    beforeEnter: async (to, from, next) => {
      const userStore = useUserStore();

      await userStore.fetchUser();
      next();
    },
  },

  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
