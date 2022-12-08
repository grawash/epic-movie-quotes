<template>
  <div class="flex relative item flex-col pt-4">
    <div
      class="flex border border-[#6C757D] items-center p-2 pl-2 pr-3 mt-2 h-[48px] rounded overflow-scroll"
    >
      <div
        v-for="genre in genres"
        class="grow items-center flex basis-auto shrink-0 p-[2px] pl-[6px] pr-[6px] rounded-sm mr-1 w-max bg-[#6C757D]"
      >
        <p>
          {{ genre }}
        </p>
        <cross-icon
          class="h-2 ml-2 cursor-pointer"
          fill="white"
          @click="deleteElement(genre)"
        />
      </div>
      <Field
        v-model="text"
        @keydown.enter.prevent
        @keydown.enter="storeGenres"
        :type="type"
        :id="id"
        :name="name"
        :rules="rule"
        :placeholder="placeholder"
        class="placeholder-white bg-transparent shrink grow-0 ml-1 w-full min-w-[200px]"
      />
    </div>
  </div>
  <ErrorMessage :name="name" class="text-red-500" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import { ref } from "vue";
const text = ref("");
const genres = ref([]);
const emit = defineEmits(["getGenres"]);

function storeGenres() {
  if (text.value != "") {
    genres.value.push(text.value);
    emit("getGenres", genres.value);
  }
  text.value = "";
}
function deleteElement(genre) {
  genres.value.splice(genres.value.indexOf(genre), 1);
}
defineProps({
  label: String,
  name: String,
  type: String,
  id: String,
  rule: String,
  placeholder: String,
});
</script>
