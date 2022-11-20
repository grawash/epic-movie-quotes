<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();
if (user.name === "") {
  user.fetchUser();
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
