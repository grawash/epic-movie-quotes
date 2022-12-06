import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useUserStore = defineStore("user", () => {
  const name = ref("");
  const mailDomain = ref("");
  const email = ref("");
  const google_authenticated = ref(false);
  function fetchUser() {
    axios
      .get("user")
      .then((response) => {
        console.log(response);
        name.value = response.data.user.name;
        email.value = response.data.user.email;
        google_authenticated.value = response.data.user.google_authenticated;
        console.log(name.value);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return { name, mailDomain, email, google_authenticated, fetchUser };
});
