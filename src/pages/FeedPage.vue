<template>
  <the-header page="newsFeed" @LogOut="logOut"></the-header>
  <div
    class="grid bg-defaultTheme text-white min-h-screen grid-cols-12 gap-[20px] pt-[32px] pl-[70px] pr-[70px]"
  >
    <div class="col-start-1 col-end-3 flex flex-col">
      <div class="flex items-center gap-6">
        <div class="basis-0 grow">
          <div
            class="w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-500"
          >
            <img
              src="src/components/icons/image 1.jpg"
              alt="smth"
              class="h-full w-full"
            />
          </div>
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
        <a href="" class="basis-0 grow-[3]">List of movies</a>
      </div>
    </div>
    <RouterView />
    <!-- <div class="bg-green-500 col-start-4 col-end-10">aaa</div>
    <div class="bg-black col-start-11 col-end-13">aaa</div> -->
  </div>
</template>
<script setup>
import TheHeader from "@/components/TheHeader.vue";
import HomeIcon from "@/components/icons/HomeIcon.vue";
import MoviesIcon from "@/components/icons/MoviesIcon.vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";
import { useAuthStore } from "@/stores/auth";
import { RouterView } from "vue-router";

const authStore = useAuthStore();

const router = useRouter();

const user = computed(() => {
  return useUserStore();
});
const logOut = async () => {
  try {
    await axios.get("/logout");
    authStore.authenticated = false;
  } catch (err) {
    console.log(err);
  } finally {
    router.push("/");
  }
};
</script>
