import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import NewsFeed from "@/pages/NewsFeed.vue";
import { userLoggedIn } from "@/helpers/authorization/index.js";

async function isAuthenticaded() {
  const result = await userLoggedIn();
  if (result === false) {
    return "/";
  }
}

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
