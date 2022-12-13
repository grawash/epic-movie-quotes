<template>
  <div class="text-white flex flex flex-col max-h-[600px]">
    <div class="flex items-center mb-6">
      <p class="text-3xl font-medium mr-auto">Notifications</p>
      <button class="text-xl underline ml-auto">Mark as all read</button>
    </div>
    <div v-if="user.notifications" class="overflow-scroll flex flex-col gap-4">
      <div
        v-for="notification in user.notifications"
        class="border border-[#6C757D80] p-5 pl-6 pr-6 flex items-center border-opacity-50"
      >
        <profile-picture />
        <div class="flex flex-col items-start ml-6 text-xl">
          <p>{{ notification.sender.name }}</p>
          <p v-if="notification.action === 'comment'">
            Commented to your movie quote
          </p>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-neutral-400">
      you don't have new notifications
    </p>
  </div>
</template>
<script setup>
import { useUserStore } from "@/stores/user";
import ProfilePicture from "@/components/ProfilePicture.vue";
const user = useUserStore();
</script>
