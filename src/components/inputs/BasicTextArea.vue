<template>
  <div class="mt-4 p-0 border border-[#6C757D] rounded">
    <Field
      as="textarea"
      :name="name"
      :id="id"
      :placeholder="placeholder"
      :rules="rule"
      :value="value"
      class="placeholder-white bg-transparent h-[86px] w-full p-3"
    />
  </div>
  <ErrorMessage :name="name" class="text-red-500" />
</template>

<script setup>
import { Field, ErrorMessage } from "vee-validate";

defineProps({
  label: String,
  name: String,
  id: String,
  rule: String,
  value: String,
  placeholder: String,
});
</script>
