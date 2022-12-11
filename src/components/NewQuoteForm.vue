<template>
  <div
    class="fixed top-0 left-0 flex w-screen h-screen items-center z-30 bg-neutral-700 bg-opacity-30"
  >
    <div
      class="ml-auto mr-auto bg-[#11101A] rounded-md pt-[53px] pb-[53px] w-1/2"
    >
      <div
        class="font-medium text-[32px] flex items-center text-white text-center pb-6"
      >
        <div class="grow"></div>
        <p class="justify-center ml-10">write new quote</p>
        <div class="grow">
          <cross-icon
            fill="white"
            class="ml-auto mr-10 cursor-pointer"
            @click="$emit('closeModals')"
          />
        </div>
      </div>
      <div class="h-[1px] bg-[#EFEFEF33]"></div>
      <Form class="w-full flex flex-col p-10" @submit="onSubmit">
        <basic-text-area
          name="quote"
          id="quote"
          placeholder="Start create new quote"
          rule="required|min:2"
        >
        </basic-text-area>
        <image-input name="thumbnail" rule="required" id="quote_image" />
        <movie-dropdown @setMovieValue="appendMovie" />
        <button class="text-white mt-6 bg-[#E31221] rounded w-full h-[38px]">
          Edit movie
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import BasicTextArea from "@/components/inputs/BasicTextArea.vue";
import MovieDropdown from "@/components/MovieDropdown.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import { ref } from "vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user";
// import { useRoute } from "vue-router";

// const baseUrl = import.meta.env.VITE_BASE_URL;
// const route = useRoute();
const user = useUserStore();
// const storedGenres = ref("");
const emit = defineEmits([
  "closeModals",
  "toggleSignUp",
  "toggleForgotPassword",
]);
const chosenMovieId = ref(null);
const chosenMovieTitle = ref(null);

function appendMovie(movie) {
  chosenMovieId.value = movie.id;
  chosenMovieTitle.value = movie.title;
}

function onSubmit(values) {
  const formData = new FormData();
  formData.append("quote", values.quote);
  if (values.file) {
    formData.append("thumbnail", values.file);
  }
  formData.append("movie_id", chosenMovieId.value);
  formData.append("movie_title", chosenMovieTitle.value);
  formData.append("user_id", user.userId);

  axios
    .post(`quotes`, formData)
    .then((response) => {
      console.log(response);
      emit("closeModals");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
</script>
