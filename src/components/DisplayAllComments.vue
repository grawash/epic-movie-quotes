<template>
  <div class="flex flex-col">
    <div
      class="flex items-center gap-6 pb-6 mb-6 border-b border-[#EFEFEF4D] text-xl"
    >
      <div class="flex items-center">
        <span class="mr-3">{{ comments.length }}</span>
        <quote-comment-icon />
      </div>
      <div class="flex items-center">
        <span class="mr-3">3</span>
        <love-icon />
      </div>
    </div>
    <div v-for="comment in comments" class="mb-6 text-xl flex flex-col">
      <div class="flex items-center">
        <profile-picture class="w-14 font-medium shrink-0 mr-6" />
        <p>{{ comment.user.name }}</p>
      </div>
      <div class="flex items-center">
        <div class="w-14 shrink-0 mr-6"></div>
        <p class="pb-6 w-full border-b border-[#EFEFEF4D] border-opacity-40">
          {{ comment.comment }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import ProfilePicture from "@/components/ProfilePicture.vue";
import axios from "@/config/axios/index.js";
import { defineProps } from "vue";
import { ref } from "vue";
import QuoteCommentIcon from "@/components/icons/QuoteCommentIcon.vue";
import LoveIcon from "@/components/icons/LoveIcon.vue";
// import { useUserStore } from "@/stores/user";

const props = defineProps({
  quoteId: Number,
});
const emit = defineEmits(["commentlength"]);
const quoteId = ref(props.quoteId);
const comments = ref([]);
// const baseUrl = import.meta.env.VITE_BASE_URL;
// function getImageUrl(quote) {
//   let replaced = quote.replace("public", "storage");
//   return baseUrl + replaced;

axios
  .get(`comments/index`, { params: { quote_id: quoteId.value } })
  .then(({ data }) => {
    comments.value = data;
  })
  .catch((error) => {
    console.log(error.response.data);
  });
</script>
