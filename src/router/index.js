import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import NewsFeed from "@/pages/NewsFeed.vue";
import { isAuthenticaded } from "@/helpers/authorization/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPage,
    },
    {
      path: "/news-feed",
      name: "news-feed",
      component: NewsFeed,
      beforeEnter: [isAuthenticaded],
    },
  ],
});

export default router;
