<template>
  <div
    class="fixed top-0 left-0 flex w-screen h-screen items-center z-30 bg-neutral-700 bg-opacity-30"
    @click="$emit('closeModals')"
  >
    <div
      class="ml-auto mr-auto bg-[#11101A] rounded-md pt-[33px] pb-[33px] w-[50%] max-h-full overflow-scroll"
      @click.stop=""
    >
      <p class="font-medium text-[32px] text-white text-center pb-3">
        {{ $t("movieList.add_movie") }}
      </p>
      <div class="h-[1px] bg-[#EFEFEF33]"></div>
      <Form class="w-full flex flex-col p-10" @submit="onSubmit">
        <add-movie-input
          name="title_en"
          type="text"
          id="title"
          rule="required|min:2"
          placeholder="Movie name"
        ></add-movie-input>
        <add-movie-input
          name="title_ka"
          type="text"
          id="title"
          rule="required|min:2"
          placeholder="ფილმის სახელი"
        ></add-movie-input>
        <genre-input
          @getGenres="storeGenres"
          name="genre"
          id="genre"
          placeholder="Movie genres"
          label="Movie genre"
        />
        <add-movie-input
          name="director_en"
          type="text"
          id="director"
          rule="required|min:2"
          placeholder="Director"
        ></add-movie-input>
        <add-movie-input
          name="director_ka"
          type="text"
          id="director"
          rule="required|min:2"
          placeholder="რეჟისორი"
        ></add-movie-input>
        <basic-text-area
          name="description_en"
          id="description"
          placeholder="Movie description"
          rule="required|min:2"
        >
        </basic-text-area>
        <basic-text-area
          name="description_ka"
          id="description"
          placeholder="ფილმის აღწერა"
          rule="required|min:2"
        >
        </basic-text-area>

        <image-input name="movie_image" id="movie_image" rule="required" />
        <button class="text-white mt-6 bg-[#E31221] rounded w-full h-[38px]">
          {{ $t("movieList.add_movie") }}
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
import ImageInput from "@/components/inputs/ImageInput.vue";
import { ref } from "vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user";
const user = useUserStore();
const storedGenres = ref("");
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
  formData.append("title_en", values.title_en);
  formData.append("title_ka", values.title_ka);
  formData.append("genre", JSON.stringify(storedGenres.value));
  formData.append("director_en", values.director_en);
  formData.append("director_ka", values.director_ka);
  formData.append("description_en", values.description_en);
  formData.append("description_ka", values.description_ka);
  formData.append("thumbnail", values.file);
  formData.append("user_id", user.userId);

  axios
    .post("movies", formData)
    .then((response) => {
      console.log(response);
      emit("closeModals");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
</script>
