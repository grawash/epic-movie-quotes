<template>
  <the-header page="newsFeed"> </the-header>
  <div
    v-if="profileUpdateNotification"
    class="w-[400px] h-[130px] bg-[#BADBCC] absolute rounded-lg top-[110px] right-32 z-50"
  >
    <div class="flex items-center h-6 m-4 mb-[19px] gap-2">
      <check-mark-icon class="grow-0 scale-125" />
      <p class="text-[#0F5132] grow">A simple alert—check it out!</p>
      <cross-icon
        class="grow-0 hover:cursor-pointer"
        @click="profileUpdateNotification = false"
      />
    </div>
    <p class="text-center">{{ profileNotificationMessage }}</p>
  </div>
  <div
    class="grid bg-defaultTheme text-white min-h-screen grid-cols-12 gap-[20px] pt-[32px] pl-[70px] pr-[70px]"
  >
    <div class="col-start-1 col-end-3 row-span-full flex flex-col">
      <div class="flex items-center gap-6">
        <div class="basis-0 grow">
          <profile-picture />
        </div>
        <div class="basis-0 grow-[3]">
          <p class="font-normal text-2xl leading-[36px]">{{ user.name }}</p>
          <router-link
            :to="{ name: 'profile' }"
            class="text-[#CED4DA] text-base font-normal"
            >Edit your profile</router-link
          >
        </div>
      </div>
      <div class="flex gap-6 pt-10 items-center">
        <home-icon class="basis-0 grow" />
        <router-link :to="{ name: 'news-feed' }" class="basis-0 grow-[3]"
          >News feed</router-link
        >
      </div>
      <div class="flex gap-6 pt-10 items-center">
        <movies-icon class="basis-0 grow" />
        <router-link :to="{ name: 'movies-list' }" class="basis-0 grow-[3]"
          >List of movies</router-link
        >
      </div>
    </div>
    <RouterView @profileNotice="(message) => profileNoticeUpdate(message)" />
    <!-- <div class="bg-green-500 col-start-4 col-end-10">aaa</div>
    <div class="bg-black col-start-11 col-end-13">aaa</div> -->
  </div>
</template>
<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import MoviesIcon from "@/components/icons/MoviesIcon.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import CheckMarkIcon from "@/components/icons/CheckMarkIcon.vue";
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user.js";

const profileUpdateNotification = ref(false);
const profileNotificationMessage = ref("");

function profileNoticeUpdate(message) {
  profileUpdateNotification.value = true;
  profileNotificationMessage.value = message;
}
const user = useUserStore();
// const user = computed(() => {
//   return useUserStore();
// });

</script>
