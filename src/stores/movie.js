import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";

export const useMovieStore = defineStore("user", () => {
  const movie = ref({});
  const genres = ref([]);

  return { movie, genres };
});
