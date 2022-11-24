<template>
  <div>
    <label :for="id" class="font-normal text-base text-white">
      <Field
        type="checkbox"
        :id="id"
        :name="name"
        :rules="rule"
        :value="true"
      />
      {{ label }}
    </label>
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
