<template>
  <new-quote-form v-if="newQuoteModal" @closeModals="closeModals" />

  <div class="col-start-4 col-end-10">
    <div class="flex items-center">
      <button
        @click="newQuoteModal = true"
        class="flex bg-[#24222F] mr-6 rounded-lg p-3 pl-4 items-center grow"
      >
        <add-quote-icon class="mr-4" />
        <p class="font-normal text-xl">{{ $t("newsFeed.new_quote") }}</p>
      </button>
      <div class="ml-auto" v-if="seachbutton" @click.stop="">
        <button
          @click="addSearch"
          class="flex items-center font-normal text-xl"
        >
          <loop-icon class="mr-4 scale-90" />{{ $t("newsFeed.search_by") }}
        </button>
      </div>
      <transition name="bounce" @after-leave="onAfterLeave">
        <div
          @click.stop=""
          v-if="searchInput"
          class="w-[70%] flex relative items-center p-3 pl-4 h-full border-b border-[#EFEFEF4D]"
        >
          <loop-icon class="mr-4 scale-90" />
          <input
            type="text"
            class="w-[100%] bg-transparent"
            ref="searchRef"
            @blur="searchBlur"
            @focus="focusOnInput"
            @input="(event) => (searchValue = event.target.value)"
          />
          <p
            v-if="searchLabel"
            class="absolute left-14 font-normal text-xl text-[#CED4DA] overflow-scroll min-w-[80%] max-h-[60%] shrink-0"
            @click="focusOnInput"
          >
            Enter <span class="text-white">@</span> to search movies, Enter
            <span class="text-white">#</span> to search quotes
          </p>
        </div>
      </transition>
    </div>
    <div class="flex flex-col mt-4">
      <display-all-quotes :searchValue="searchValue" />
    </div>
  </div>
</template>
<script setup>
import NewQuoteForm from "@/components/NewQuoteForm.vue";
import LoopIcon from "@/components/icons/LoopIcon.vue";
import AddQuoteIcon from "@/components/icons/AddQuoteIcon.vue";
import DisplayAllQuotes from "@/components/DisplayAllQuotes.vue";
import axios from "@/config/axios/index.js";
import { ref, onUnmounted, onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const searchInput = ref(false);
const seachbutton = ref(true);
const searchLabel = ref(true);
const searchValue = ref("");
const newQuoteModal = ref(false);
let searchRef = ref(null);

onMounted(() => {
  window.onclick = removeSearch;
});
window.onclick = removeSearch;
function removeSearch() {
  if (searchValue.value === "") {
    searchInput.value = false;
  }
  user.notificationWindow = false;
}
onUnmounted(() => {
  window.onclick = "";
});
function addSearch() {
  searchInput.value = true;
  searchLabel.value = true;
  seachbutton.value = false;
}
function onAfterLeave() {
  seachbutton.value = true;
}
function focusOnInput() {
  searchRef.value.focus();
  searchLabel.value = false;
}
function searchBlur() {
  if (searchValue.value === "") {
    searchLabel.value = true;
  }
}
function closeModals() {
  newQuoteModal.value = false;
}
</script>
<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  from {
    width: 15%;
  }
  to {
    width: 70%;
  }
}
</style>
