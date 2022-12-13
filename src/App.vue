<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useAuthStore } from "@/stores/auth";
import { watch } from "vue";
import EchoInstance from "@/config/pusher/pusher.js";

const authStore = useAuthStore();
const user = useUserStore();
watch(
  () => authStore.authenticated,
  (value) => {
    if (value === true) {
      user.fetchUser();
    }
  }
);


watch(
  () => user.userId,
  (value) => {
    if (value) {
      EchoInstance.private(`NotifyUser.${user.userId}`).listen(
        "NotifyUser",
        (e) => {
          console.log("here");
          console.log(e);
        }
      );
    }
  }
);
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
