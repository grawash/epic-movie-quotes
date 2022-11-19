import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useUserStore = defineStore("user", () => {
  const name = ref("");
  // const email = ref("");
  function fetchUser() {
    axios
      .get("user")
      .then((response) => {
        console.log(response);
        name.value = response.data.name;
        // email.value = response.data.email;
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return { name, fetchUser };
});
