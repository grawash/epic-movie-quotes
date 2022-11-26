<template>
  <div
    class="fixed flex w-screen h-screen items-center z-30 bg-neutral-900 bg-opacity-60 backdrop-blur-sm"
    @click="$emit('closeModals')"
  >
    <Form
      action=""
      class="ml-auto mr-auto bg-[#222030] rounded-xl flex flex-col pl-[120px] pr-[120px] pt-[53px] pb-[53px]"
      @click.stop=""
      @submit="onSubmit"
    >
      <p class="font-medium text-[32px] text-white text-center pb-3">
        Forgot password?
      </p>
      <p
        class="font-normal text-base text-[#6C757D] text-center pb-6 w-[360px]"
      >
        Enter the email and we’ll send an email with instructions to reset your
        password
      </p>
      <basic-input
        name="email"
        type="email"
        id="email"
        rule="required|min:2"
        placeholder="Enter your email"
        label="Email"
      ></basic-input>
      <button
        class="text-white mt-6 bg-[#E31221] rounded w-[360px] h-[38px] mb-8"
      >
        Send instructions
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
//implement login
import { Form } from "vee-validate";
import BasicInput from "@/components/inputs/BasicInput.vue";
import BackToLogin from "@/components/icons/BackToLogin.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(["closeModals", "toggleForgotPassword"]);

function onSubmit(values) {
  let data = { ...values };
  axios
    .post("login", {
      ...data,
    })
    .then((response) => {
      console.log(response);
      router.push({ name: "news-feed" });
      authStore.authenticated = true;
      emit("closeModals");
    })
    .catch((error) => {
      alert(error.response.data.error);
    });
}
</script>
