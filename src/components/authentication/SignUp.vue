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
      <p class="font-medium text-[32px] text-white text-center">
        Create an account
      </p>
      <p class="font-normal text-base text-[#6C757D] text-center pb-6">
        Start your journey!
      </p>
      <basic-input
        name="name"
        type="text"
        id="name"
        rule="required|min:2"
        placeholder="At least 3 & max.15 lower case characters"
        label="Name"
      ></basic-input>
      <basic-input
        name="email"
        type="email"
        id="email"
        rule="required|min:2"
        placeholder="Enter your email"
        label="Email"
      ></basic-input>
      <basic-input
        name="password"
        type="password"
        id="password"
        rule="required|min:2"
        placeholder="At least 8 & max.15 lower case characters"
        label="Password"
      ></basic-input>
      <basic-input
        name="confirm_password"
        type="password"
        id="confirm_password"
        rule="required|min:2"
        placeholder="Confirm password"
        label="Confirm password"
      ></basic-input>
      <button class="text-white mt-6 bg-[#E31221] rounded w-[360px] h-[38px]">
        Get started
      </button>
      <button
        type="button"
        class="text-white mt-6 rounded border-[#CED4DA] border w-[360px] h-[38px] flex justify-center items-center gap-2"
      >
        <img
          src="@/components/icons/icons8-google.svg"
          alt="google icon"
          class="inline h-5 w-auto"
        />
        Sign up with Google
      </button>
      <p class="pt-8 text-white text-center">
        Already have an account?
        <a
          href="#"
          class="text-blue-600 underline"
          @click="$emit('toggleLogIn')"
          >Log in</a
        >
      </p>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import BasicInput from "@/components/authentication/BasicInput.vue";
import axios from "@/config/axios/index.js";
const emit = defineEmits(["closeModals", "verifyNoticeModalOn"]);

function onSubmit(values) {
  let data = { ...values };
  axios
    .post("register", {
      ...data,
    })
    .then((response) => {
      console.log(response);
      emit("closeModals");
      emit("verifyNoticeModalOn");
    })
    .catch((error) => {
      alert(error.response.data.error);
    });
}
</script>
