<template>
  <div class="flex flex-col pt-4">
    <label v-if="label" :for="id" class="font-normal text-white text-base"
      >{{ label }} <span class="text-red-700">*</span></label
    >
    <Field
      @focus="$emit('inputFocus', this.id)"
      @blur="$emit('inputBlur', this.id)"
      :type="type"
      :id="id"
      :name="name"
      :rules="rule"
      :value="value"
      :placeholder="placeholder"
      class="border border-black bg-[#CED4DA] placeholder-[#6C757D] h-[38px] w-[360px] rounded p-2 pl-3 pr-3 mt-2"
    />
    <ErrorMessage :name="name" class="text-red-500" />
  </div>
</template>

<script>
import { Field, ErrorMessage } from "vee-validate";
export default {
  components: { Field, ErrorMessage },
  props: {
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    rule: {
      type: String,
      required: false,
    },
  },
};
</script>
