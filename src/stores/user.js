import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useUserStore = defineStore("user", () => {
  const name = ref("");
  const mailDomain = ref("");
  const email = ref("");
  const notifications = ref([]);
  const notificationWindow = ref(false);
  const userId = ref(null);
  const google_authenticated = ref(false);
  async function fetchUser() {
    axios
      .get("user")
      .then(({ data }) => {
        name.value = data.user.name;
        email.value = data.user.email;
        userId.value = data.user.id;
        google_authenticated.value = data.user.google_authenticated;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return {
    name,
    notifications,
    notificationWindow,
    userId,
    mailDomain,
    email,
    google_authenticated,
    fetchUser,
  };
});
