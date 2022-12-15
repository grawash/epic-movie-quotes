<template>
  <div class="col-start-4 col-end-10 flex flex-col">
    <p class="font-medium text-2xl mb-[54px]">
      {{ $t("profilePage.my_profile") }}
    </p>
    <div class="bg-[#11101A] h-min shrink flex flex-col relative">
      <Form
        id="update"
        v-slot="{ values }"
        class="pt-48 p-20 flex h-min flex-col"
        @submit="onSubmit"
      >
        <profile-photo-input
          :source="user.thumbnail"
          name="thumbnail"
          id="profile_photo"
        />
        <profile-page-input
          name="username"
          type="text"
          id="name"
          :placeholder="name"
          :label="$t('profilePage.username')"
          @toggleChangeUsermane="canChangeUsername = !canChangeUsername"
          :readOnly="true"
        />
        <profile-page-input
          v-if="canChangeUsername"
          name="name"
          type="text"
          id="newName"
          rule="required|min:2"
          :placeholder="name"
          :label="$t('profilePage.new_username')"
          class="pt-10"
          @input="changed = true"
        />
        <div
          v-if="!google_authenticated"
          class="mt-14 max-w-[532px] h-[1px] bg-[#CED4DA] bg-opacity-30"
        ></div>
        <profile-page-input
          name="email"
          type="email"
          id="email"
          :placeholder="email"
          :label="$t('profilePage.email')"
          class="mt-10"
        />
        <button
          v-if="!google_authenticated"
          type="button"
          class="mr-auto mt-10 mb-10 pl-4 pr-4 p-2 border rounded-md border-[#D9D9D9] flex items-center"
        >
          <add-mail-icon class="mr-2" />
          {{ $t("profilePage.add_email") }}
        </button>
        <div
          class="mb-10 max-w-[532px] h-[1px] bg-[#CED4DA] bg-opacity-30 shrink grow"
        ></div>
        <profile-page-input
          name="currentpasword"
          type="password"
          id="password"
          placeholder="••••••••"
          :label="$t('profilePage.password')"
          @toggleChangePassword="canChangePassword = !canChangePassword"
          :editable="!google_authenticated"
          :readOnly="true"
        />
        <password-rule-notice
          v-if="canChangePassword"
          :passwordValue="passwordValue"
        />
        <profile-page-input
          v-if="canChangePassword"
          name="password"
          type="password"
          id="newPassword"
          rule="required|min:2"
          :placeholder="$t('profilePage.new_password')"
          :label="$t('profilePage.new_password')"
          class="pt-10"
          @input="(passwordValue = values.password), (changed = true)"
        />
        <profile-page-input
          v-if="canChangePassword"
          name="password_confirmation"
          type="password"
          id="newPasswordConfirmation"
          rule="required|min:2|confirmed:@password"
          :placeholder="$t('profilePage.confirm_password')"
          :label="$t('profilePage.confirm_password')"
          class="pt-10"
          @input="changed = true"
        />
      </Form>
    </div>
    <div v-if="changed === true" class="mt-10 ml-auto mb-10">
      <button class="font-normal text-xl mr-8" @click="closeEditInputs">
        {{ $t("profilePage.cancel") }}
      </button>
      <button
        form="update"
        type="submit"
        class="rounded-lg font-normal text-xl p-[9px] pl-4 pr-4 bg-[#E31221]"
      >
        {{ $t("profilePage.save_changes") }}
      </button>
    </div>
  </div>
</template>
<script setup>
import { Form } from "vee-validate";
import ProfilePageInput from "@/components/inputs/ProfilePageInput.vue";
import ProfilePhotoInput from "@/components/inputs/ProfilePhotoInput.vue";
import PhotoInput from "@/components/inputs/PhotoInput.vue";
import PasswordRuleNotice from "@/components/PasswordRuleNotice.vue";
import AddMailIcon from "@/components/icons/AddMailIcon.vue";
import { ref } from "vue";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();
const canChangeUsername = ref(false);
const canChangePassword = ref(false);
const passwordValue = ref("");
const changed = ref(false);
const emit = defineEmits("profileNotice");
function closeEditInputs() {
  canChangeUsername.value = false;
  changed.value = false;
  canChangePassword.value = false;
}

function onSubmit(values) {
  // const password = values.password;
  // const password_confirmation = values.password_confirmation;
  // const name = values.name;
  // const thumbnail = values.file;
  // let data = {
  //   name: name,
  //   passwords: password,
  //   password_confirmation: password_confirmation,
  //   thumbnail: thumbnail,
  // };
  const formData = new FormData();
  formData.append("name", values.name);
  if (values.file) {
    formData.append("thumbnail", values.file);
  }
  if (values.password !== undefined && values.password !== null) {
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
  }

  console.log(formData);
  axios
    .post("update-user", formData)
    .then((response) => {
      console.log(response);
      const message = "Changes updated succsessfully";
      emit("profileNotice", message);
      closeEditInputs();
      user.fetchUser();
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
