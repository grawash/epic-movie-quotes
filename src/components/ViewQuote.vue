<template>
  <div
    class="fixed top-0 left-0 flex w-screen h-screen items-center z-30 bg-neutral-700 bg-opacity-30"
  >
    <div
      class="ml-auto mr-auto flex flex-col min-w-[35%] max-w-[50%] max-h-[90%] rounded-xl bg-[#11101A] p-6 mb-10"
    >
      <div class="font-medium flex items-center text-white text-center pb-6">
        <div class="grow basis-0 mr-auto flex text-base">
          <button @click="$emit('editQuote', quote)">
            <pencil-icon class="mr-7" />
          </button>
          <div class="w-[1px] h-4 bg-[#6C757D] mr-7"></div>
          <button @click="$emit('deleteQuote', quote.id)">
            <trash-can-icon />
          </button>
        </div>
        <p class="justify-center grow basis-0 font-medium text-2xl">
          View quote
        </p>
        <div class="grow basis-0">
          <cross-icon
            fill="white"
            class="ml-auto cursor-pointer"
            @click="$emit('closeModals')"
          />
        </div>
      </div>
      <div class="-ml-6 -mr-6 mb-7 h-[1px] bg-[#6C757D] bg-opacity-50"></div>
      <div>
        <div class="flex items-center mb-4">
          <profile-picture />
          <p class="ml-4 text-xl">{{ user.name }}</p>
        </div>
        <div
          class="font-normal text-2xl h-max flex overflow-hidden border-[#6C757DB2] border p-3 rounded"
        >
          <p>"{{ quote.quote }}"</p>
          <span class="ml-auto text-xl text-[#6C757D]">ENG</span>
        </div>
        <img
          :src="quote.thumbnail"
          class="max-h-[35%] ml-auto mr-auto mt-7 mb-6 rounded-xl"
        />
        <div
          class="flex items-center gap-6 pb-6 border-b border-[#EFEFEF4D] text-xl"
        >
          <div class="flex items-center">
            <span class="mr-3">3</span>
            <quote-comment-icon />
          </div>
          <div class="flex items-center">
            <span class="mr-3">3</span>
            <love-icon />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import QuoteCommentIcon from "@/components/icons/QuoteCommentIcon.vue";
import LoveIcon from "@/components/icons/LoveIcon.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import TrashCanIcon from "@/components/icons/TrashCanIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import axios from "@/config/axios/index.js";
import { ref, defineProps, computed } from "vue";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  quote: Object,
});
const user = useUserStore();
</script>
