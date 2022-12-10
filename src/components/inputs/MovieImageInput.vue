<template>
  <div
    class="flex relative border border-[#6C757D] items-center item h-[84px] rounded mt-2"
  >
    <camera-icon class="ml-3" />
    <p class="ml-2 text-xl">Drag & drop your image here or</p>
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
    <button
      type="button"
      class="ml-2 text-xl bg-purple-800 p-[10px] rounded"
      @click="chooseImage"
    >
      choose file
    </button>
    <img
      :src="file ? file : source"
      alt=" "
      class="ml-auto h-full w-auto border-none rounded-r outline-none"
    />
  </div>
  <ErrorMessage name="file" class="text-red-500" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";
import CameraIcon from "@/components/icons/CameraIcon.vue";
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

defineProps({
  label: String,
  name: String,
  type: String,
  id: String,
  source: String,
  rule: String,
  placeholder: String,
});
</script>
