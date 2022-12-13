<template>
  <Form @submit="onSubmit" class="ml-7 w-full">
    <Field
      type="text"
      name="comment"
      placeholder="Write a comment"
      v-model="comment"
      rules="required"
      class="rounded bg-[#24222F] outline-none w-full p-3 pl-7 pr-7 text-xl placeholder-white"
    />
  </Form>
</template>
<script setup>
import { Form } from "vee-validate";
import { Field } from "vee-validate";
import { defineProps, ref } from "vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user";
const user = useUserStore();
const comment = ref("");
const props = defineProps({
  quoteId: Number,
  quoteUser: Number,
});
function onSubmit(values) {
  const formData = new FormData();
  formData.append("quote_id", props.quoteId);
  formData.append("user_id", user.userId);
  formData.append("sender_id", user.userId);
  formData.append("comment", values.comment);
  formData.append("action", "comment");
  formData.append("reciever_id", props.quoteUser);
  formData.append("read_status", 1);
  axios
    .post(`comments/store`, formData)
    .then((response) => {
      console.log(response);
      comment.value = "";
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  axios
    .post(`notifications`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
</script>
