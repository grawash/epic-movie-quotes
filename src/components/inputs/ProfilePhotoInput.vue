<template>
  <div
    class="w-[188px] h-[188px] bg-black absolute ml-auto mr-auto left-0 right-0 -top-[94px] flex rounded-full"
  >
    <Field
      :id="id"
      name="file"
      :rules="rule"
      :placeholder="placeholder"
      v-slot="{ handleChange }"
      class="hidden"
    >
      <input
        type="file"
        ref="fileInput"
        @input="getImage"
        @change="handleChange"
        :value="value"
        class="hidden bg-transparent w-full rounded p-2 pl-3 pr-3"
      />
    </Field>
    <!-- <button
      type="button"
      class="ml-2 text-xl bg-purple-800 p-[10px] rounded"
      @click="chooseImage"
    >
      choose file
    </button> -->
    <img
      :src="file ? file : props.source"
      alt=" "
      class="h-auto w-full border-none outline-none z-50 rounded-full"
    />
    <ErrorMessage name="file" class="text-red-500" />
    <p
      class="absolute -bottom-10 w-full text-center font-normal text-base hover:cursor-pointer"
      @click="chooseImage"
    >
      {{ $t("profilePage.upload_picture") }}
    </p>
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { ref } from "vue";

const file = ref(null);
let fileInput = ref(null);
let reader = new FileReader();
reader.onloadend = function () {
  file.value = reader.result;
};
function chooseImage() {
  fileInput.value.click();
}
function getImage() {
  reader.readAsDataURL(fileInput.value.files[0]);
}
const props = defineProps({
  label: String,
  name: String,
  type: String,
  id: String,
  source: String,
  rule: String,
  placeholder: String,
});
</script>
