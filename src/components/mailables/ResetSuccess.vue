<template>
  <div
    class="fixed flex w-screen h-screen items-center z-30 bg-neutral-900 bg-opacity-60 backdrop-blur-sm"
  >
    <div
      class="ml-auto mr-auto w-[30%] text-white bg-[#222030] rounded-xl flex flex-col pl-[120px] pr-[120px] pt-[53px] pb-[53px]"
      @click.stop=""
    >
      <successful-action class="self-center" />
      <p class="text-[32px] font-medium text-center mt-5">Success!</p>
      <p class="text-base font-normal text-center mt-8">
        Your Email changed successfully
      </p>
      <button class="bg-[#E31221] rounded mt-10 h-[38px]" @click="GoToNewsFeed">
        Go to my news feed
      </button>
    </div>
  </div>
</template>

<script setup>
import SuccessfulAction from "@/components/icons/SuccessfulAction.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();

function GoToNewsFeed() {
  authStore.authenticated = true;
  router.push({ name: "news-feed" });
}
</script>
