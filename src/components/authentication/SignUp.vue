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
      <p class="font-medium text-[32px] text-white text-center">
        {{ $t("authorization.register_header") }}
      </p>
      <p class="font-normal text-base text-[#6C757D] text-center pb-6">
        {{ $t("authorization.registration_welcome") }}
      </p>
      <basic-input
        name="name"
        type="text"
        id="name"
        rule="required|min:2"
        :placeholder="$t('authorization.name.placeholder')"
        :label="$t('authorization.name.label')"
      ></basic-input>
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
        :placeholder="$t('authorization.register_password.placeholder')"
        :label="$t('authorization.register_password.label')"
      ></basic-input>
      <basic-input
        name="password_confirmation"
        type="password"
        id="password_confirmation"
        rule="required|min:2"
        :placeholder="$t('authorization.confirm_password.placeholder')"
        :label="$t('authorization.confirm_password.label')"
      ></basic-input>
      <button class="text-white mt-6 bg-[#E31221] rounded w-[360px] h-[38px]">
        {{ $t("authorization.register_button") }}
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
        {{ $t("authorization.google_signup") }}
      </button>
      <p class="pt-8 text-white text-center">
        {{ $t("authorization.already_registered") }}
        <a
          href="#"
          class="text-blue-600 underline"
          @click="$emit('toggleLogIn')"
        >
          {{ $t("authorization.login") }}
        </a>
      </p>
    </Form>
  </div>
</template>

<script setup>
import { Form } from "vee-validate";
import BasicInput from "@/components/inputs/BasicInput.vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";
const emit = defineEmits(["closeModals", "verifyNoticeModalOn"]);

const user = useUserStore();

function onSubmit(values) {
  let data = { ...values };
  axios
    .post("register", {
      ...data,
    })
    .then((response) => {
      console.log(response);
      const getDomain = values.email.substring(values.email.indexOf("@") + 1);
      user.mailDomain = getDomain;
      emit("closeModals");
      emit("verifyNoticeModalOn");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}
function googleAuthentication() {
  axios
    .get("auth/redirect")
    .then((response) => {
      window.open(response.data.url, "_self");
    })
    .catch((error) => {
      alert(error.response.data.error);
    });
}
</script>
