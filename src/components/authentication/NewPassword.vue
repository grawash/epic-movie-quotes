<template>
  <div
    class="fixed flex w-screen h-screen items-center z-30 bg-neutral-900 bg-opacity-60 backdrop-blur-sm"
    @click="$emit('closeModals')"
  >
    <Form
      class="ml-auto mr-auto bg-[#222030] rounded-xl flex flex-col pl-[120px] pr-[120px] pt-[53px] pb-[53px]"
      @click.stop=""
      @submit="onSubmit"
    >
      <p class="font-medium text-[32px] text-white text-center pb-3">
        Create new password
      </p>
      <p
        class="font-normal text-base text-[#6C757D] text-center pb-6 w-[360px]"
      >
        Your new password must be different from previous used passwords
      </p>
      <basic-input
        name="password"
        type="password"
        id="password"
        rule="required|min:2"
        placeholder="At least 8 & max.15 lower case characters"
        label="Password"
      ></basic-input>
      <basic-input
        name="password_confirmation"
        type="password"
        id="confirm_password"
        rule="required|min:2"
        placeholder="Confirm password"
        label="Confirm password"
      ></basic-input>
      <button
        class="text-white mt-6 bg-[#E31221] rounded w-[360px] h-[38px] mb-8"
      >
        Reset password
      </button>
      <button
        type="button"
        class="text-center flex items-center justify-center text-[#6C757D] font-normal text-base w-fit ml-auto mr-auto"
        @click="$emit('toggleForgotPassword')"
      >
        <back-to-login class="mr-3" />
        Back to log in
      </button>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import BasicInput from "@/components/inputs/BasicInput.vue";
import BackToLogin from "@/components/icons/BackToLogin.vue";
import axios from "@/config/axios/index.js";
import { useRoute } from "vue-router";
const route = useRoute();
const emit = defineEmits([
  "closeModals",
  "toggleForgotPassword",
  "resetSuccess",
]);

function onSubmit(values) {
  let data = { ...values, email: route.query.email, token: route.query.token };
  console.log(data);
  axios
    .post("reset-password", {
      ...data,
    })
    .then((response) => {
      console.log(response);
      emit("closeModals");
      emit("resetSuccess");
    })
    .catch((error) => {
      alert(error.response.data.error);
    });
}
</script>
