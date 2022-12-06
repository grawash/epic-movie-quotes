<template>
  <div class="flex flex-col">
    <label
      v-if="label"
      :for="id"
      class="font-normal text-white text-base capitalize"
      >{{ label }}</label
    >
    <div class="flex">
      <Field
        @focus="$emit('inputFocus', this.id)"
        @blur="$emit('inputBlur', this.id)"
        :type="type"
        :id="id"
        :name="name"
        :rules="rule"
        :placeholder="placeholder"
        :readOnly="readOnly"
        class="border text-black border-black bg-[#CED4DA] placeholder-[#6C757D] h-[48px] grow min-w-0 max-w-[528px] rounded p-2 pl-3 pr-5 mt-2"
      />
      <i v-if="type === 'password'" class="text-black -ml-5 self-center">a</i>

      <button
        type="button"
        v-if="id === 'name'"
        @click="$emit('toggleChangeUsermane')"
        class="ml-8"
      >
        Edit
      </button>
      <button
        type="button"
        v-if="id === 'password' && editable"
        @click="$emit('toggleChangePassword')"
        class="ml-8"
      >
        Edit
      </button>
      <!-- <div v-if="type === 'email'" class="ml-8 grow basis-1/6 shrink-0"></div> -->
    </div>
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
    readOnly: {
      type: Boolean,
      required: false,
    },
    editable: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
