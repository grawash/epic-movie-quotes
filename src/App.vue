<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useAuthStore } from "@/stores/auth";
import { watch } from "vue";

const authStore = useAuthStore();
const user = useUserStore();
watch(
  () => authStore.authenticated,
  (value) => {
    if (value) {
      user.fetchUser();
    }
  }
);
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
