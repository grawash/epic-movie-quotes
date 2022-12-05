import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useUserStore = defineStore("user", () => {
  const name = ref("");
  const mailDomain = ref("");
  const email = ref("");
  const google_authenticated = ref(false);

  // const email = ref("");
  function fetchUser() {
    axios
      .get("user")
      .then(({ data }) => {
        console.log(data);
        name.value = data.user.name;
        email.value = data.user.email;
        google_authenticated.value = data.user.google_authenticated;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return { name, mailDomain, email, google_authenticated, fetchUser };
});
