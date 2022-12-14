<template>
  <div
    v-for="quote in filteredQuotes"
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
      <img :src="quote.thumbnail" class="w-full mt-7 mb-6 rounded-xl" />
      <div>
        <display-all-comments :quoteId="quote.id" :quoteUser="quote.user_id" />
      </div>
      <div class="flex items-center">
        <profile-picture />
        <create-comment-input :quoteId="quote.id" :quoteUser="quote.user_id" />
      </div>
    </div>
  </div>
</template>
<script setup>
import ProfilePicture from "@/components/ProfilePicture.vue";
import DisplayAllComments from "@/components/DisplayAllComments.vue";
import CreateCommentInput from "@/components/inputs/CreateCommentInput.vue";
import axios from "@/config/axios/index.js";

import { ref, computed, defineProps } from "vue";
import { useUserStore } from "@/stores/user";
const props = defineProps({
  searchValue: String,
});
const user = useUserStore();
const quotes = ref([]);

const filteredQuotes = computed(() => {
  console.log(props.searchValue[0]);
  if (quotes.value.length != 0 && props.searchValue[0] === "@") {
    let filtered = quotes.value.filter((quote) =>
      quote.movie.title
        .toLowerCase()
        .includes(props.searchValue.substring(1).toLowerCase())
    );
    return filtered;
  } else if (quotes.value.length != 0 && props.searchValue[0] === "#") {
    let filtered = quotes.value.filter((quote) =>
      quote.quote
        .toLowerCase()
        .includes(props.searchValue.substring(1).toLowerCase())
    );
    return filtered;
  } else return quotes.value;
});

axios
  .get(`quotes`)
  .then(({ data }) => {
    console.log("quotes:", data);
    quotes.value = data;
  })
  .catch((error) => {
    console.log(error.response.data);
  });
</script>
