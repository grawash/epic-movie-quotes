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
        <p class="justify-center ml-10">
          {{ $t("newsFeed.new_quote_header") }}
        </p>
        <div class="grow">
          <cross-icon
            fill="white"
            class="ml-auto mr-10 cursor-pointer"
            @click="$emit('closeModals')"
          />
        </div>
      </div>
      <div class="h-[1px] bg-[#EFEFEF33]"></div>
      <Form class="w-full flex flex-col p-8" @submit="onSubmit">
        <div class="flex items-center mb-7">
          <profile-picture :source="user.thumbnail" />
          <p class="ml-4 text-xl">{{ user.name }}</p>
        </div>
        <div v-if="movieId !== undefined" class="flex items-center">
          <img :src="imgUrl" alt="" class="max-w-[30%] rounded-xl" />
          <div class="flex flex-col gap-5 ml-8 text-white">
            <p class="grow font-bold text-2xl text-[#DDCCAA]">
              {{ storedMovie.movie.title[$i18n.locale] }}
            </p>
            <div class="flex">
              <div
                v-for="genre in storedMovie.genres"
                class="items-center h-min p-[2px] pl-[6px] mb-2 pr-[6px] rounded mr-2 bg-[#6C757D]"
              >
                <p class="capitalize font-bold text-lg">
                  {{ genre.name }}
                </p>
              </div>
            </div>
            <p class="text-[#CED4DA] font-bold text-lg">
              {{ $t("movieDescription.director") }}:
              <span class="text-white font-medium ml-2">{{
                storedMovie.movie.director[$i18n.locale]
              }}</span>
            </p>
          </div>
        </div>
        <basic-text-area
          name="quote_en"
          id="quote"
          placeholder="Create new quote"
          rule="required|min:2"
        >
        </basic-text-area>
        <basic-text-area
          name="quote_ka"
          id="quote"
          placeholder="დაწერე პოსტის შინაარსი"
          rule="required|min:2"
        >
        </basic-text-area>
        <image-input name="thumbnail" rule="required" id="quote_image" />
        <movie-dropdown v-if="!movieId" @setMovieValue="appendMovie" />
        <button class="text-white mt-6 bg-[#E31221] rounded w-full h-[38px]">
          {{ $t("newsFeed.post") }}
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
import ProfilePicture from "@/components/ProfilePicture.vue";
import { ref } from "vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movie";
const route = useRoute();
const storedMovie = useMovieStore();

// const baseUrl = import.meta.env.VITE_BASE_URL;
const user = useUserStore();
// const storedGenres = ref("");
const emit = defineEmits([
  "closeModals",
  "toggleSignUp",
  "toggleForgotPassword",
]);
const chosenMovieId = ref(null);
const chosenMovieTitle = ref(null);
const movieId = ref("");
movieId.value = route.params.movieId;
if (movieId.value !== undefined) {
  chosenMovieId.value = storedMovie.movie.id;
  chosenMovieTitle.value = storedMovie.movie.title;
}
function appendMovie(movie) {
  chosenMovieId.value = movie.id;
  chosenMovieTitle.value = movie.title;
}

function onSubmit(values) {
  const formData = new FormData();
  formData.append("quote_en", values.quote_en);
  formData.append("quote_ka", values.quote_ka);
  if (values.file) {
    formData.append("thumbnail", values.file);
  }
  formData.append("movie_id", chosenMovieId.value);
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
defineProps({
  imgUrl: String,
});
</script>
