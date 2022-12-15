<template>
  <div
    class="w-[188px] h-[188px] bg-black absolute ml-auto mr-auto left-0 right-0 -top-[94px] flex rounded-full"
  >
    <img
      :src="file"
      alt=" "
      class="h-auto w-full border-none outline-none z-50 rounded-full"
    />
    <p
      class="absolute -bottom-10 w-full text-center font-normal text-base hover:cursor-pointer"
      @click="chooseImage"
    >
      {{ $t("profilePage.upload_picture") }}
    </p>
    <input
      type="file"
      name="file"
      id=""
      ref="fileInput"
      class="absolute hidden -bottom-10"
      @input="getImage"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const emit = defineEmits(["changeImage"]);
const file = ref(null);
let fileInput = ref(null);
let reader = new FileReader();
reader.onloadend = function () {
  file.value = reader.result;
  emit("changeImage", reader.result);
};
function chooseImage() {
  fileInput.value.click();
}
function getImage() {
  reader.readAsDataURL(fileInput.value.files[0]);
}
</script>
