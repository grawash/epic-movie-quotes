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
        <div class="grow basis-0 ml-10 mr-auto text-base">
          <button @click="deleteQuote(quote.id)" class="flex items-center">
            <trash-can-icon class="mr-2" />
            <p class="text-[#CED4DA]">Delete</p>
          </button>
        </div>
        <p class="justify-center grow basis-0">Edit quote</p>
        <div class="grow basis-0 mr-10">
          <cross-icon
            fill="white"
            class="ml-auto cursor-pointer"
            @click="$emit('closeModals')"
          />
        </div>
      </div>
      <div class="h-[1px] bg-[#EFEFEF33]"></div>
      <Form class="w-full flex flex-col p-8" @submit="onSubmit">
        <div class="flex items-center mb-7">
          <profile-picture />
          <p class="ml-4 text-xl">{{ user.name }}</p>
        </div>
        <basic-text-area
          name="quote"
          id="quote"
          placeholder="Start create new quote"
          :value="quote.quote"
          rule="required|min:2"
        >
        </basic-text-area>
        <div>
          <image-input
            name="thumbnail"
            :source="getImageUrl"
            id="quote_image"
          />
        </div>
        <button class="text-white mt-6 bg-[#E31221] rounded w-full h-[38px]">
          Save changes
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import BasicTextArea from "@/components/inputs/BasicTextArea.vue";
import ImageInput from "@/components/inputs/ImageInput.vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";
import TrashCanIcon from "@/components/icons/TrashCanIcon.vue";
import { ref, defineProps, computed } from "vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movie";
const route = useRoute();
const storedMovie = useMovieStore();

const user = useUserStore();
// const storedGenres = ref("");
const emit = defineEmits([
  "closeModals",
  "toggleSignUp",
  "toggleForgotPassword",
]);
const props = defineProps({
  quote: Object,
});
const chosenMovieId = ref(null);
const chosenMovieTitle = ref(null);
const movieId = ref("");
const baseUrl = import.meta.env.VITE_BASE_URL;

movieId.value = route.params.movieId;
if (movieId.value != "") {
  chosenMovieId.value = storedMovie.movie.id;
  chosenMovieTitle.value = storedMovie.movie.title;
}
const getImageUrl = computed(() => {
  if (props.quote.thumbnail) {
    let replaced = props.quote.thumbnail.replace("public", "storage");
    return baseUrl + replaced;
  } else return "";
});
function onSubmit(values) {
  chosenMovieId.value = props.quote.movie_id;
  const formData = new FormData();
  formData.append("quote", values.quote);
  if (values.file) {
    formData.append("thumbnail", values.file);
  }
  formData.append("movie_id", chosenMovieId.value);
  formData.append("_method", "PATCH");

  axios
    .post(`quotes/${props.quote.id}`, formData)
    .then((response) => {
      console.log(response);
      emit("closeModals");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
function deleteQuote(id) {
  axios
    .delete(`quotes/${id}`)
    .then((response) => {
      console.log(response);
      emit("closeModals");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
</script>
