<template>
  <div v-for="quote in quotes" class="flex flex-col">
    <div>
      <p>"{{ quote.quote }}" Movie - </p>
    </div>
  </div>
</template>
<script setup>
// import NewQuoteForm from "@/components/NewQuoteForm.vue";
// import LoopIcon from "@/components/icons/LoopIcon.vue";
import axios from "@/config/axios/index.js";
import { ref } from "vue";
const quotes = ref([]);

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
