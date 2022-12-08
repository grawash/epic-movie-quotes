<template>
  <div
    class="fixed top-0 left-0 flex w-screen h-screen items-center z-30 bg-neutral-700 bg-opacity-30"
    @click="$emit('closeModals')"
  >
    <div
      class="ml-auto mr-auto bg-[#11101A] rounded-md pt-[53px] pb-[53px] w-1/2"
      @click.stop=""
    >
      <p class="font-medium text-[32px] text-white text-center pb-3">
        Add movie
      </p>
      <div class="h-[1px] bg-[#EFEFEF33]"></div>
      <Form class="w-full flex flex-col p-10" @submit="onSubmit">
        <add-movie-input
          name="title"
          type="text"
          id="title"
          rule="required|min:2"
          placeholder="Movie name"
        ></add-movie-input>
        <genre-input
          @getGenres="storeGenres"
          name="genre"
          id="genre"
          placeholder="Movie genres"
          label="Movie genre"
        />
        <add-movie-input
          name="director"
          type="text"
          id="director"
          rule="required|min:2"
          placeholder="Director"
        ></add-movie-input>
        <basic-text-area
          name="description"
          id="description"
          placeholder="Movie description"
          rule="required|min:2"
        >
        </basic-text-area>
        <movie-image-input
          name="movie_image"
          id="movie_image"
          rule="required"
        />
        <button class="text-white mt-6 bg-[#E31221] rounded w-full h-[38px]">
          Add movie
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import AddMovieInput from "@/components/inputs/AddMovieInput.vue";
import BasicTextArea from "@/components/inputs/BasicTextArea.vue";
import GenreInput from "@/components/inputs/GenreInput.vue";
import MovieImageInput from "@/components/inputs/MovieImageInput.vue";

import { ref } from "vue";
import axios from "@/config/axios/index.js";
// import { useRouter } from "vue-router";
const storedGenres = ref("");
// const router = useRouter();
const emit = defineEmits([
  "closeModals",
  "toggleSignUp",
  "toggleForgotPassword",
]);
function storeGenres(genres) {
  storedGenres.value = genres;
}

function onSubmit(values) {
  const formData = new FormData();
  formData.append("title", values.title);
  for (var i = 0; i < storedGenres.value.length; i++) {
    formData.append("genre[]", storedGenres.value[i]);
  }
  formData.append("director", values.director);
  formData.append("description", values.description);
  formData.append("file", values.file);
  console.log(values.file);

  axios
    .post("create-movie", formData)
    .then((response) => {
      console.log(response);
      emit("closeModals");
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
