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
        {{ $t("authorization.login_header") }}
      </p>
      <p class="font-normal text-base text-[#6C757D] text-center pb-6">
        {{ $t("authorization.login_welcome") }}
      </p>
      <basic-input
        name="email"
        type="email"
        id="email"
        rule="required|min:2"
        :placeholder="$t('authorization.email.placeholder')"
        :label="$t('authorization.email.label')"
      ></basic-input>
      <basic-input
        name="password"
        type="password"
        id="password"
        rule="required|min:2"
        :placeholder="$t('authorization.password.placeholder')"
        :label="$t('authorization.password.label')"
      ></basic-input>
      <div class="mt-4 flex">
        <check-box
          name="remember"
          id="remember"
          :label="$t('authorization.remember')"
        />
        <button
          type="button"
          class="underline font-normal text-base text-[#0D6EFD] ml-auto"
          @click="$emit('toggleForgotPassword')"
        >
          {{ $t("authorization.forgot_password") }}
        </button>
      </div>
      <button class="text-white mt-6 bg-[#E31221] rounded w-[360px] h-[38px]">
        {{ $t("authorization.signin") }}
      </button>
      <button
        type="button"
        class="text-white mt-6 rounded border-[#CED4DA] border w-[360px] h-[38px] flex justify-center items-center gap-2"
        @click="googleAuthentication"
      >
        <img
          src="@/components/icons/icons8-google.svg"
          alt="google icon"
          class="inline h-5 w-auto"
        />
        {{ $t("authorization.google_sign") }}
      </button>
      <p class="pt-8 text-white text-center">
        {{ $t("authorization.no_account") }}

        <a
          href="#"
          class="text-blue-600 underline"
          @click="$emit('toggleSignUp')"
        >
          {{ $t("authorization.signup") }}</a
        >
      </p>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import BasicInput from "@/components/inputs/BasicInput.vue";
import CheckBox from "@/components/inputs/CheckBox.vue";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits([
  "closeModals",
  "toggleSignUp",
  "toggleForgotPassword",
]);

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
function googleAuthentication() {
  axios
    .get("auth/redirect")
    .then((response) => {
      console.log(response.data.url);
      window.open(response.data.url, "_self");

      // emit("closeModals");
      // emit("verifyNoticeModalOn");
    })
    .catch((error) => {
      alert(error.response.data.error);
    });
}
</script>
