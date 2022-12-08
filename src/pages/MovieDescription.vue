<template>
  <div class="col-start-4 col-end-13 grid auto-rows-min gap-[33px] grid-cols-9">
    <div class="col-span-9 font-medium text-2xl">Movie discription</div>
    <div class="col-start-1 col-end-6 flex flex-col">
      <img :src="getImageUrl" alt="" class="w-full h-auto rounded-2xl" />
      <div class="mt-12 flex items-center gap-4">
        <p class="font-bold text-2xl">Quotes (Total 7)</p>
        <div class="h-[80%] w-[1px] bg-[#6C757D]"></div>
        <button
          class="text-xl bg-[#E31221] p-2 pl-4 pr-4 rounded flex items-center"
        >
          <add-mail-icon class="scale-125 mr-2" />
          Add quote
        </button>
      </div>
    </div>
    <div class="col-start-6 col-end-10 flex flex-col">
      <div class="flex flex-col">
        <p class="font-medium text-2xl text-[#DDCCAA]">{{ movie.title }}</p>
        <div class="flex flex-wrap mt-6">
          <div
            v-for="genre in genres"
            class="items-center h-min p-[2px] pl-[6px] pr-[6px] rounded mr-2 bg-[#6C757D]"
          >
            <p class="capitalize font-bold text-lg">
              {{ genre.name }}
            </p>
          </div>
        </div>
        <div class="text-lg ml-3 mt-5">
          <p class="font-bold mt-5">
            <span class="text-[#CED4DA]">Director: </span> {{ movie.director }}
          </p>
          <p class="font-normal text-[#CED4DA] mt-5">{{ movie.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AddMailIcon from "@/components/icons/AddMailIcon.vue";
// import LoopIcon from "@/components/icons/LoopIcon.vue";
// import CommentIcon from "@/components/icons/CommentIcon.vue";

// import AddMovieForm from "@/components/AddMovieForm.vue";
import axios from "@/config/axios/index.js";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["profileNotice"]);
const movieId = route.params.movieId;
const movie = ref({});
const genres = ref([]);
// const movieList = ref([]);
// const addMovieModal = ref(false);
axios
  .get("movie/" + movieId)
  .then(({ data }) => {
    console.log(data);
    movie.value = data.movie;
    genres.value = data.genres;
  })
  .catch((error) => {
    console.log(error.response.data);
  });
const getImageUrl = computed(() => {
  if (movie.value.thumbnail) {
    let replaced = movie.value.thumbnail.replace("public", "storage");
    return "http://127.0.0.1:8000/" + replaced;
  } else return "";
});
// function closeModals() {
//   addMovieModal.value = false;
// }
// function showMovieDescription(movieId) {
//   router.push({ name: "movie-description", params: { movieId: movieId } });
// }
</script>
