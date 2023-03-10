<template>
  <new-quote-form
    v-if="newQuoteModal"
    :imgUrl="movie.thumbnail"
    @closeModals="closeModals"
  />
  <edit-quote
    v-if="editQuoteModal"
    :quoteId="quoteId"
    :quote="quoteObj"
    @closeModals="closeModals"
  />
  <view-quote
    v-if="viewQuoteModal"
    :quoteId="quoteId"
    :quote="quoteObj"
    @editQuote="editQuoteOpen"
    @deleteQuote="deleteQuote"
    @closeModals="closeModals"
  />
  <edit-movie-form v-if="editMovieModal" @closeModals="closeModals" />
  <div class="col-start-4 col-end-13 grid auto-rows-min gap-[33px] grid-cols-9">
    <div class="col-span-9 font-medium text-2xl">
      {{ $t("movieDescription.movie_description") }}
    </div>
    <div class="col-start-1 col-end-6 flex flex-col">
      <img :src="movie.thumbnail" alt="" class="w-full h-auto rounded-2xl" />
      <div class="mt-12 flex items-center gap-4">
        <p class="font-bold text-2xl">
          {{ $t("movieDescription.quotes") }} ({{ quotes.length }})
        </p>
        <div class="h-[80%] w-[1px] bg-[#6C757D]"></div>
        <button
          @click="newQuoteModal = true"
          class="text-xl bg-[#E31221] p-2 pl-4 pr-4 rounded flex items-center"
        >
          <add-mail-icon class="scale-125 mr-2" />
          {{ $t("movieDescription.add_quote") }}
        </button>
      </div>
      <div class="flex flex-col mt-14">
        <div
          v-for="quote in quotes"
          class="bg-[#11101A] rounded-xl mb-10 p-6 pl-8 pr-8"
        >
          <div class="flex gap-8 pb-6 border-b border-[#EFEFEF33]">
            <img
              :src="quote.thumbnail"
              alt=""
              class="w-[30%] rounded-lg shrink-0"
            />
            <div class="flex flex-col w-full">
              <div class="ml-auto relative">
                <more-options-icon
                  class="cursor-pointer"
                  @click.stop=""
                  @click="editToggled = quote.id"
                />
                <div
                  v-if="editToggled === quote.id"
                  @click.stop=""
                  class="absolute bg-[#24222F] mt-2 w-[200px] rounded-lg items-start flex flex-col gap-8 p-10"
                >
                  <button
                    @click="openViewModal(quote)"
                    class="flex items-center hover:scale-110"
                  >
                    <eye-icon class="mr-4" />
                    {{ $t("movieDescription.view_quote") }}
                  </button>
                  <button
                    @click="editQuoteOpen(quote)"
                    class="flex items-center hover:scale-110"
                  >
                    <pencil-icon class="mr-4" />
                    {{ $t("movieDescription.edit") }}
                  </button>
                  <button
                    @click="deleteQuote(quote.id)"
                    class="flex items-center hover:scale-110"
                  >
                    <trash-can-icon class="mr-4" />
                    {{ $t("movieDescription.delete") }}
                  </button>
                </div>
              </div>
              <p
                class="italic text-2xl text-[#CED4DA] mt-auto mb-auto break-words max-w-full overflow-hidden"
              >
                "{{ quote.quote[$i18n.locale] }}"
              </p>
            </div>
          </div>
          <div class="flex items-center gap-6 mt-6 text-xl">
            <div class="flex items-center">
              <span class="mr-3">3</span>
              <quote-comment-icon />
            </div>
            <div class="flex items-center">
              <span class="mr-3">3</span>
              <love-icon />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-start-6 col-end-10 flex flex-col">
      <div v-if="movie" class="flex flex-col">
        <div class="flex items-center">
          <p class="font-medium text-2xl text-[#DDCCAA]">
            {{ title[$i18n.locale] }}
          </p>
          <div
            class="bg-[#24222F] flex ml-auto p-[10px] pl-7 pr-7 gap-[25px] items-center rounded-lg"
          >
            <pencil-icon
              class="cursor-pointer hover:scale-110"
              @click="editMovieModal = true"
            />
            <div class="h-[16px] w-[1px] bg-[#6C757D]"></div>
            <trash-can-icon
              class="cursor-pointer hover:scale-110"
              @click="deleteMovie"
            />
          </div>
        </div>
        <div class="flex flex-wrap mt-6">
          <div
            v-for="genre in genres"
            class="items-center h-min p-[2px] pl-[6px] mb-2 pr-[6px] rounded mr-2 bg-[#6C757D]"
          >
            <p class="capitalize font-bold text-lg">
              {{ genre.name }}
            </p>
          </div>
        </div>
        <div class="text-lg ml-3 mt-3">
          <p class="font-bold mt-5">
            <span class="text-[#CED4DA]"
              >{{ $t("movieDescription.director") }}:
            </span>
            {{ director[$i18n.locale] }}
          </p>
          <p class="font-normal text-[#CED4DA] mt-5">
            {{ description[$i18n.locale] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import AddMailIcon from "@/components/icons/AddMailIcon.vue";
import TrashCanIcon from "@/components/icons/TrashCanIcon.vue";
import PencilIcon from "@/components/icons/PencilIcon.vue";
import EditMovieForm from "@/components/EditMovieForm.vue";
import NewQuoteForm from "@/components/NewQuoteForm.vue";
import ViewQuote from "@/components/ViewQuote.vue";
import QuoteCommentIcon from "@/components/icons/QuoteCommentIcon.vue";
import LoveIcon from "@/components/icons/LoveIcon.vue";
import MoreOptionsIcon from "@/components/icons/MoreOptionsIcon.vue";
import EyeIcon from "@/components/icons/EyeIcon.vue";
import EditQuote from "@/components/EditQuote.vue";
import axios from "@/config/axios/index.js";
import { ref, computed, onUnmounted, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useMovieStore } from "@/stores/movie";
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["profileNotice"]);
const newQuoteModal = ref(false);
const movieId = route.params.movieId;
const movie = ref({});
const genres = ref([]);
const quotes = ref([]);
const editToggled = ref("");
const editMovieModal = ref(false);
const editQuoteModal = ref(false);
const viewQuoteModal = ref(false);
const quoteId = ref("");
const quoteObj = ref({});
const storedMovie = useMovieStore();
const title = ref("");
const description = ref("");
const director = ref("");

onMounted(() => {
  window.onclick = editMenuOff;
});
onUnmounted(() => {
  window.onclick = "";
});
async function fetchMovie() {
  axios
    .get(`movies/${movieId}`)
    .then(({ data }) => {
      console.log(data);
      movie.value = data.movie;
      genres.value = data.movie.genres;
      quotes.value = data.movie.quotes;
      storedMovie.movie = data.movie;
      storedMovie.genres = data.movie.genres;
      title.value = data.movie.title;
      description.value = data.movie.description;
      director.value = data.movie.director;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
fetchMovie();
function editQuoteOpen(quote) {
  closeModals();
  quoteObj.value = quote;
  editQuoteModal.value = true;
}
function openViewModal(quote) {
  quoteObj.value = quote;
  viewQuoteModal.value = true;
}
function closeModals() {
  editMovieModal.value = false;
  newQuoteModal.value = false;
  editQuoteModal.value = false;
  viewQuoteModal.value = false;
  fetchMovie();
}
function deleteQuote(quote) {
  axios
    .delete(`quotes/${quote}`)
    .then((response) => {
      console.log(response);
      fetchMovie();
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
function editMenuOff() {
  editToggled.value = "";
}
function deleteMovie() {
  axios
    .delete(`movies/${movieId}`)
    .then((response) => {
      console.log(response);
      router.push({ name: "movies-list" });
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
</script>
