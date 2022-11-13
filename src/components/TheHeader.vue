<template>
  <div class="bg-black h-[86px] pl-[70px] pr-[70px] items-center flex">
    <p class="text-[#DDCCAA] font-medium text-base uppercase">Movie quotes</p>
    <div class="ml-auto">
      <button class="text-white ml-4 p-2 pl-6 pr-6">
        Eng <button-arrow class="inline ml-[10px]" />
      </button>
      <button
        @click="$emit('toggleSignUp')"
        class="text-white ml-4 p-2 pl-6 pr-6 bg-[#E31221] rounded-lg"
      >
        Sign Up
      </button>
      <button
        @click="$emit('toggleLogIn')"
        class="text-white ml-4 p-2 pl-6 pr-6 border rounded-lg"
      >
        Log In
      </button>
    </div>
  </div>
</template>
<script setup>
import ButtonArrow from "@/components/icons/ButtonArrow.vue";
// import { ref } from "vue";

// const SignUpModal = ref(false);

// function SignUpModalToggle() {
//   SignUpModal.value = !SignUpModal.value;
// }
</script>
