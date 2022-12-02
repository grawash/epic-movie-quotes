import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useUserStore = defineStore("user", () => {
  const name = ref("");
  const mailDomain = ref("");
  const email = ref("");
  // const email = ref("");
  function fetchUser() {
    axios
      .get("user")
      .then((response) => {
        console.log(response);
        name.value = response.data.user.name;
        email.value = response.data.user.email;
        // email.value = response.data.email;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return { name, mailDomain, email, fetchUser };
});
