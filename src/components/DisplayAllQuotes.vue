<template>
  <div
    v-for="quote in filteredQuotes"
    class="flex flex-col rounded-xl bg-black p-6 mb-10"
  >
    <div>
      <div class="flex items-center mb-4">
        <profile-picture :source="quote.user.thumbnail" />
        <p class="ml-4 text-xl">{{ quote.user.name }}</p>
      </div>
      <div class="font-medium text-xl h-max overflow-hidden">
        <p>
          "{{ quote.quote[$i18n.locale] }}"<span class="text-[#DDCCAA] ml-2">{{
            $i18n.locale === "ka" ? quote.movie.title.ka : quote.movie.title.en
          }}</span>
        </p>
      </div>
      <img :src="quote.thumbnail" class="w-full mt-7 mb-6 rounded-xl" />
      <div>
        <display-all-comments :quoteId="quote.id" :quoteUser="quote.user_id" />
      </div>
      <!-- <div class="flex items-center">
        <profile-picture :source="user.thumbnail" />
        <create-comment-input :quoteId="quote.id" :quoteUser="quote.user_id" />
      </div> -->
    </div>
  </div>
  <infinite-loading @infinite="infiniteHandler"></infinite-loading>
</template>
<script setup>
import ProfilePicture from "@/components/ProfilePicture.vue";
import DisplayAllComments from "@/components/DisplayAllComments.vue";
import CreateCommentInput from "@/components/inputs/CreateCommentInput.vue";
import axios from "@/config/axios/index.js";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { ref, computed, defineProps, watch } from "vue";
import { useUserStore } from "@/stores/user";
import { useLocaleStore } from "@/stores/locale";

const props = defineProps({
  searchValue: String,
});
const user = useUserStore();
const locale = useLocaleStore();

const quotes = ref([]);
let page = 1;
function infiniteHandler($state) {
  axios
    .get("quotes", {
      params: {
        page: page,
      },
    })
    .then(({ data }) => {
      if (data.data.length) {
        page += 1;
        quotes.value.push(...data.data);
        console.log(quotes.value);
        $state.loaded();
      } else {
        $state.complete();
      }
    });
}
const filteredQuotes = computed(() => {
  if (quotes.value.length != 0 && props.searchValue[0] === "@") {
    let filtered = quotes.value.filter((quote) =>
      quote.movie.title[locale.locale]
        .toLowerCase()
        .includes(props.searchValue.substring(1).toLowerCase())
    );
    return filtered;
  } else if (quotes.value.length != 0 && props.searchValue[0] === "#") {
    let filtered = quotes.value.filter((quote) =>
      quote.quote[locale.locale]
        .toLowerCase()
        .includes(props.searchValue.substring(1).toLowerCase())
    );
    return filtered;
  } else return quotes.value;
});
</script>
