<template>
  <div
    class="fixed flex w-screen h-screen items-center z-30 bg-neutral-900 bg-opacity-60 backdrop-blur-sm"
    @click="$emit('closeModals')"
  >
    <div
      class="ml-auto mr-auto w-[30%] text-white bg-[#222030] rounded-xl flex flex-col pl-[120px] pr-[120px] pt-[53px] pb-[53px]"
      @click.stop=""
    >
      <mail-sent-icon class="self-center" />
      <p class="text-[32px] font-medium text-center mt-5">Thank you</p>
      <p class="text-base font-normal text-center mt-8">
        Please check your email and follow the instructions to activate your
        account.
      </p>
      <button class="bg-[#E31221] rounded mt-10 h-[38px]">
        Go to my email
      </button>
    </div>
  </div>
</template>

<script setup>
import MailSentIcon from "@/components/icons/MailSentIcon.vue";
</script>
