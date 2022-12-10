import { ref } from "vue";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("user", () => {
  const movie = ref({});
  const genres = ref([]);

  return { movie, genres };
});
