<template>
  <div
    class="bg-black h-[86px] pl-[70px] pr-[70px] items-center flex"
    :class="{ gradientHeader: props.page !== 'landing' }"
  >
    <p class="text-[#DDCCAA] font-medium text-base uppercase">Movie quotes</p>
    <div class="ml-auto">
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
// import { ref } from "vue";

// const SignUpModal = ref(false);

// function SignUpModalToggle() {
//   SignUpModal.value = !SignUpModal.value;
// }
import { useRouter } from "vue-router";
import axios from "@/config/axios/index.js";
import { useAuthStore } from "@/stores/auth";


const authStore = useAuthStore();

const router = useRouter();

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
