<template>
  <div
    class="fixed flex w-screen h-screen items-center z-30 bg-neutral-900 bg-opacity-60 backdrop-blur-sm"
    @click="$emit('closeModals')"
  >
    <div
      class="ml-auto mr-auto w-[30%] text-white bg-[#222030] rounded-xl flex flex-col pl-[120px] pr-[120px] pt-[53px] pb-[53px]"
      @click.stop=""
    >
      <mail-sent class="self-center" />
      <p class="text-[32px] font-medium text-center mt-5">Check your email</p>
      <p class="text-base font-normal text-center mt-8">
        We have sent a password recover instructions to your email
      </p>
      <button class="bg-[#E31221] rounded mt-10 h-[38px]">
        Go to my email
      </button>
      <button class="mt-10 h-[38px]" @click="$emit('closeModals')">
        Skip, I’ll confirm later
      </button>
    </div>
  </div>
</template>

<script setup>
import MailSent from "@/components/icons/MailSent.vue";
</script>
