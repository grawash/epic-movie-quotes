<template>
  <div
    class="bg-black h-[86px] pl-[70px] pr-[70px] items-center flex"
    :class="{ gradientHeader: props.page !== 'landing' }"
  >
    <p class="text-[#DDCCAA] font-medium text-base uppercase">Movie quotes</p>
    <div class="ml-auto flex items-center">
      <div v-if="props.page !== 'landing'" class="relative">
        <bell-icon
          @click.stop=""
          @click="user.notificationWindow = true"
          class="cursor-pointer"
        />
        <span
          v-if="filteredNotifications.length > 0"
          class="rounded-full absolute -top-2 left-3 text-center text-white h-6 w-6 bg-[#E33812]"
          >{{ filteredNotifications.length }}</span
        >
        <div
          @click.stop=""
          v-if="user.notificationWindow"
          class="absolute top-12 left-1/2 -translate-x-[60%] bg-black rounded-xl p-8 pt-10 pb-12 w-[700px] border border-[#6C757D80] border-opacity-50 z-50"
        >
          <display-all-notifications class="" />
        </div>
      </div>
      <button class="text-white ml-4 p-2 pl-6 pr-6">
        Eng <button-arrow class="inline ml-[10px]" />
      </button>
      <button
        v-if="props.page === 'landing'"
        @click="$emit('toggleSignUp')"
        class="text-white ml-4 p-2 pl-6 pr-6 bg-[#E31221] rounded-lg"
      >
        Sign Up
      </button>
      <button
        v-if="props.page === 'landing'"
        @click="$emit('toggleLogIn')"
        class="text-white ml-4 p-2 pl-6 pr-6 border rounded-lg"
      >
        Log In
      </button>
      <button
        v-if="props.page === 'newsFeed'"
        @click="logOut"
        class="text-white ml-4 p-2 pl-6 pr-6 border rounded-lg"
      >
        Log Out
      </button>
    </div>
  </div>
</template>
<script setup>
import ButtonArrow from "@/components/icons/ButtonArrow.vue";
const props = defineProps(["page"]);
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";
import BellIcon from "@/components/icons/BellIcon.vue";
import DisplayAllNotifications from "@/components/DisplayAllNotifications.vue";

const authStore = useAuthStore();
const user = useUserStore();
const notificationWindow = ref(false);
const router = useRouter();
// onMounted(() => {
//   window.onclick = closeNotifications;
// });
// onUnmounted(() => {
//   window.onclick = "";
// });
function closeNotifications() {
  notificationWindow.value = false;
}
const filteredNotifications = computed(() => {
  if (user.notifications != 0) {
    let unread = user.notifications.filter((notif) => notif.read_status === 1);
    console.log(unread);
    return unread;
  } else return 0;
});
const logOut = async () => {
  try {
    await axios.post("/logout");
    authStore.authenticated = false;
  } catch (err) {
    console.log(err);
  } finally {
    router.push("/");
  }
};
</script>
<style scoped>
.gradientHeader {
  background: #24222f;
}
</style>
