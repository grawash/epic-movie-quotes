<template>
  <div
    class="fixed flex w-screen h-screen items-center z-30 bg-neutral-900 bg-opacity-60 backdrop-blur-sm"
    @click="$emit('closeModals')"
  >
    <Form
      action=""
      class="ml-auto mr-auto bg-[#222030] rounded-xl flex flex-col pl-[120px] pr-[120px] pt-[53px] pb-[53px]"
      @click.stop=""
    >
      <p class="font-medium text-[32px] text-white text-center">
        Log in to your account
      </p>
      <p class="font-normal text-base text-[#6C757D] text-center pb-6">
        Welcome back! Please enter your details.
      </p>
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
        placeholder="Password"
        label="Password"
      ></basic-input>
      <button class="text-white mt-6 bg-[#E31221] rounded w-[360px] h-[38px]">
        Sign in
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
        Don't have an account yet?
        <a href="" class="text-blue-600 underline">Sign up</a>
      </p>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import BasicInput from "@/components/authentication/BasicInput.vue";
</script>
