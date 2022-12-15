<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "@/stores/user.js";
import { useAuthStore } from "@/stores/auth";
import { watch } from "vue";
import EchoInstance from "@/config/pusher/pusher.js";
import axios from "@/config/axios/index.js";

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
          console.log(e.notification.sender_id);
          if (e.notification.sender_id !== user.userId) {
            axios
              .get(`notifications`, { params: { user_id: user.userId } })
              .then(({ data }) => {
                user.notifications = data;
                user.newNotifications = true;
              })
              .catch((error) => {
                console.log(error.response.data);
              });
          }
        }
      );
      EchoInstance.private(`NotificationsRead.${user.userId}`).listen(
        "NotifyNotificationsRead",
        (e) => {
          console.log(e);
          axios
            .get(`notifications`, { params: { user_id: user.userId } })
            .then(({ data }) => {
              user.notifications = data;
              user.newNotifications = true;
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        }
      );
    }
    axios
      .get(`notifications`, { params: { user_id: user.userId } })
      .then(({ data }) => {
        user.notifications = data;
        console.log(user.notifications);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
);
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
