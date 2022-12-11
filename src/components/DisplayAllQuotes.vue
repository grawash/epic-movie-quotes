<template>
  <div v-for="quote in quotes" class="flex flex-col rounded-xl bg-black p-6 mb-10">
    <div>
      <div class="flex items-center mb-4">
        <profile-picture />
        <p class="ml-4 text-xl">{{ user.name }}</p>
      </div>
      <p class="font-medium text-xl">
        "{{ quote.quote }}"
        <span class="text-[#DDCCAA] ml-2">{{ quote.movie_title }}</span>
      </p>
      <img :src="getImageUrl(quote.thumbnail)" class="w-full mt-7 rounded-xl" />
    </div>
  </div>
</template>
<script setup>
// import NewQuoteForm from "@/components/NewQuoteForm.vue";
// import LoopIcon from "@/components/icons/LoopIcon.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
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
    console.log(data);
    quotes.value = data;
  })
  .catch((error) => {
    console.log(error.response.data);
  });
</script>
