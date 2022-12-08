<template>
  <add-movie-form v-if="addMovieModal" @closeModals="closeModals" />
  <div class="col-start-4 col-end-13 flex flex-col gap-14">
    <div class="flex items-center">
      <p class="font-medium text-2xl">
        My list of movies ({{ movieList.length }})
      </p>
      <div class="ml-auto flex">
        <button
          class="mr-8 font-normal text-xl text-[#CED4DA] flex items-center"
        >
          <loop-icon class="mr-2" />
          Search
        </button>
        <button
          @click="addMovieModal = true"
          class="rounded-lg font-normal text-xl p-[9px] pl-4 pr-4 bg-[#E31221] flex items-center"
        >
          <add-mail-icon class="mr-2 scale-125" />
          Add movie
        </button>
      </div>
    </div>
    <div class="grid grid-cols-3 auto-rows-[430px] gap-12 grow mb-10">
      <div
        v-for="movie in movieList"
        class="flex flex-col hover:scale-105 cursor-pointer"
        @click="showMovieDescription(movie.id)"
      >
        <div
          class="backdrop-blur-3xl bg-neutral-700 bg-opacity-20 max-h-[350px] flex grow justify-center items-center rounded-lg"
        >
          <img :src="getImageUrl(movie.thumbnail)" alt="" />
        </div>
        <p class="mt-[10px] font-medium text-2xl">{{ movie.title }}</p>
        <comment-icon class="mt-5" />
      </div>
    </div>
  </div>
</template>
<script setup>
import AddMailIcon from "@/components/icons/AddMailIcon.vue";
import LoopIcon from "@/components/icons/LoopIcon.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";

import AddMovieForm from "@/components/AddMovieForm.vue";
import axios from "@/config/axios/index.js";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["profileNotice"]);
const movieList = ref([]);
const addMovieModal = ref(false);
function getImageUrl(movie) {
  let replaced = movie.replace("public", "storage");
  return "http://127.0.0.1:8000/" + replaced;
}
function closeModals() {
  addMovieModal.value = false;
}
function showMovieDescription(movieId) {
  router.push({ name: "movie-description", params: { movieId: movieId } });
}
axios
  .get("movies-list")
  .then(({ data }) => {
    console.log(data);
    movieList.value = data;
  })
  .catch((error) => {
    console.log(error.response.data);
  });
</script>
