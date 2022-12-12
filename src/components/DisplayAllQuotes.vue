<template>
  <div
    v-for="quote in quotes"
    class="flex flex-col rounded-xl bg-black p-6 mb-10"
  >
    <div>
      <div class="flex items-center mb-4">
        <profile-picture />
        <p class="ml-4 text-xl">{{ quote.user.name }}</p>
      </div>
      <div class="font-medium text-xl h-max overflow-hidden">
        <p>
          "{{ quote.quote }}"<span class="text-[#DDCCAA] ml-2">{{
            quote.movie.title
          }}</span>
        </p>
      </div>
      <img
        :src="getImageUrl(quote.thumbnail)"
        class="w-full mt-7 mb-6 rounded-xl"
      />
      <div
        class="flex items-center gap-6 pb-6 mb-6 border-b border-[#EFEFEF4D] text-xl"
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
      <div>
        <display-all-comments :quoteId="quote.id" />
      </div>
      <div class="flex items-center">
        <profile-picture />
        <create-comment-input :quoteId="quote.id" />
      </div>
    </div>
  </div>
</template>
<script setup>
import QuoteCommentIcon from "@/components/icons/QuoteCommentIcon.vue";
import LoveIcon from "@/components/icons/LoveIcon.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
import DisplayAllComments from "@/components/DisplayAllComments.vue";
import CreateCommentInput from "@/components/inputs/CreateCommentInput.vue";
import axios from "@/config/axios/index.js";

import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const baseUrl = import.meta.env.VITE_BASE_URL;
const user = useUserStore();
const quotes = ref([]);
function getImageUrl(quote) {
  let replaced = quote.replace("public", "storage");
  return baseUrl + replaced;
}

axios
  .get(`quotes`)
  .then(({ data }) => {
    quotes.value = data;
  })
  .catch((error) => {
    console.log(error.response.data);
  });
</script>
