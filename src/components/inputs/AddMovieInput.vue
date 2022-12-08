<template>
  <div class="flex relative item flex-col pt-4">
    <Field
      :type="type"
      :id="id"
      :name="name"
      :rules="rule"
      :placeholder="placeholder"
      class="border border-[#6C757D] placeholder-white bg-transparent h-[48px] w-full rounded p-2 pl-3 pr-3 mt-2"
    />
  </div>
  <ErrorMessage :name="name" class="text-red-500" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

defineProps({
  label: String,
  name: String,
  type: String,
  id: String,
  rule: String,
  placeholder: String,
});
</script>
