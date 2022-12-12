<template>
  <div
    class="w-full relative flex bg-black rounded mt-7 p-6 items-center cursor-pointer"
    @click="displayMovies"
  >
    <div class="flex items-center">
      <movie-icon class="mr-3" />
      <p v-if="chosenMovie === ''" class="font-normal text-2xl">Choose movie</p>
      <p v-else class="font-normal text-2xl">{{ chosenMovie }}</p>
    </div>
    <expand-icon class="ml-auto" />
  </div>
  <Field
    name="movie"
    rules="required"
    type="text"
    v-model="chosenMovie"
    class="bg-black w-0 h-0 mt-3 rounded-xl max-h-40 flex flex-col"
  />
  <ErrorMessage name="movie" class="text-red-500" />
  <div
    v-if="showMovies"
    class="bg-black mt-3 rounded-xl max-h-40 flex flex-col"
  >
    <p
      v-for="movie in movieList"
      @click="chooseMovie(movie)"
      class="text-white text-center cursor-pointer hover:bg-white hover:bg-opacity-20 rounded-xl text-2xl p-3 w-full"
    >
      {{ movie.title }}
    </p>
  </div>
</template>
<script setup>
import MovieIcon from "@/components/icons/MovieIcon.vue";
import ExpandIcon from "@/components/icons/ExpandIcon.vue";
import axios from "@/config/axios/index.js";
import { Field, ErrorMessage } from "vee-validate";

import { useUserStore } from "@/stores/user";
import { ref } from "vue";
const user = useUserStore();
const movieList = ref([]);
const showMovies = ref(false);
const chosenMovie = ref("");
const emit = defineEmits(["setMovieValue"]);
async function fetchMovies() {
  axios
    .get("movies", { params: { user_id: user.userId } })
    .then(({ data }) => {
      movieList.value = data;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
function displayMovies() {
  fetchMovies();
  showMovies.value = !showMovies.value;
}
function chooseMovie(movie) {
  chosenMovie.value = movie.title;
  showMovies.value = !showMovies.value;
  emit("setMovieValue", movie);
}
</script>
