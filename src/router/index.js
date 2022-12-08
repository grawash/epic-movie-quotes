/* eslint-disable no-unsafe-finally */
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/pages/LandingPage.vue";
import FeedLayout from "@/pages/FeedLayout.vue";
import NewsFeed from "@/pages/NewsFeed.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import MoviesList from "@/pages/MoviesList.vue";
import MovieDescription from "@/pages/MovieDescription.vue";
import { isAuthenticated } from "@/helpers/authorization/index.js";
import { useAuthStore } from "@/stores/auth";
import axios from "axios";

axios.defaults.withCredentials = true;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: LandingPage,
    },
    {
      path: "/feed",
      name: "feed",
      component: FeedLayout,
      beforeEnter: [isAuthenticated],
      children: [
        {
          path: "/news-feed",
          name: "news-feed",
          component: NewsFeed,
        },
        {
          path: "/profile",
          name: "profile",
          component: ProfilePage,
        },
        {
          path: "/movies-list",
          name: "movies-list",
          component: MoviesList,
        },
        {
          path: "/movie/:movieId",
          name: "movie-description",
          component: MovieDescription,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.authenticated === null) {
    try {
      await axios.get(`${import.meta.env.VITE_API_BASE_URL}user`);
      authStore.authenticated = true;
    } catch (err) {
      authStore.authenticated = false;
    } finally {
      return next();
    }
  }
  return next();
});

export default router;
