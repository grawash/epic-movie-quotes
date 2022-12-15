<template>
  <div class="text-white flex flex flex-col max-h-[600px]">
    <div class="flex items-center mb-6">
      <p class="text-3xl font-medium mr-auto">
        {{ $t("notifications.notifications") }}
      </p>
      <button class="text-xl underline ml-auto" @click="markNotificationsRead">
        {{ $t("notifications.mark_read") }}
      </button>
    </div>
    <div v-if="user.notifications" class="overflow-scroll flex flex-col gap-4">
      <div
        v-for="notification in user.notifications"
        class="border border-[#6C757D80] p-5 pl-6 pr-6 flex items-center border-opacity-50"
      >
        <profile-picture
          v-if="notification.read_status === 1"
          class="border border-green-400 shrink-0"
        />
        <profile-picture v-else class="shrink-0" />
        <div class="flex flex-col w-full items-start ml-6 text-xl">
          <p>{{ notification.sender.name }}</p>
          <div class="flex items-center w-full">
            <p v-if="notification.action === 'comment'">
              {{ $t("notifications.comment_notification") }}
            </p>
            <p v-else>{{ $t("notifications.react_notification") }}</p>
            <p
              v-if="notification.read_status === 1"
              class="text-[#198754] ml-auto"
            >
              {{ $t("notifications.new") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-neutral-400">
      {{ $t("notifications.no_notifications") }}
    </p>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/user";
import ProfilePicture from "@/components/ProfilePicture.vue";
import axios from "@/config/axios/index.js";

const user = useUserStore();

function markNotificationsRead() {
  const formData = new FormData();
  formData.append("user_id", user.userId);
  formData.append("_method", "PATCH");
  axios
    .post(`notifications`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
</script>
