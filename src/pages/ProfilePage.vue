<template>
  <div class="col-start-4 col-end-10 flex flex-col">
    <p class="font-medium text-2xl mb-[54px]">My profile</p>
    <div class="bg-[#11101A] h-min shrink flex flex-col relative">
      <div
        class="w-[188px] h-[188px] bg-black absolute ml-auto mr-auto left-0 right-0 -top-[94px] rounded-full"
      >
        <p
          class="absolute -bottom-10 w-full text-center font-normal text-base hover:cursor-pointer"
          @click="chooseImage"
        >
          Upload new photo
        </p>
        <input
          type="file"
          name=""
          id=""
          ref="fileInput"
          class="absolute hidden -bottom-10"
        />
      </div>
      <Form
        id="update"
        v-slot="{ values }"
        class="pt-48 p-20 flex h-min flex-col"
        @submit="onSubmit"
      >
        <profile-page-input
          name="username"
          type="text"
          id="name"
          :placeholder="user.name"
          label="username"
          @usernameReadOnly="usernameReadOnly = !usernameReadOnly"
          :readonly="true"
        />
        <profile-page-input
          v-if="usernameReadOnly"
          name="name"
          type="text"
          id="newName"
          rule="required|min:2"
          placeholder="Nino Tabagari"
          label="new username"
          class="pt-10"
          @input="changed = true"
        />
        <div
          v-if="!user.google_authenticated"
          class="mt-14 max-w-[532px] h-[1px] bg-[#CED4DA] bg-opacity-30"
        ></div>
        <profile-page-input
          name="email"
          type="email"
          id="email"
          :placeholder="user.email"
          label="email"
          class="mt-10"
        />
        <button
          v-if="!user.google_authenticated"
          type="button"
          class="mr-auto mt-10 mb-10 pl-4 pr-4 p-2 border rounded-md border-[#D9D9D9] flex items-center"
        >
          <add-mail-icon class="mr-2" />
          Add new email
        </button>
        <div
          class="mb-10 max-w-[532px] h-[1px] bg-[#CED4DA] bg-opacity-30 shrink grow"
        ></div>
        <profile-page-input
          name="currentpasword"
          type="password"
          id="password"
          placeholder="Nino Tabagari"
          label="password"
          @passwordReadOnly="resetPassword"
          :editable="!user.google_authenticated"
          :readonly="true"
        />
        <div
          v-if="passwordReadOnly"
          class="p-6 border border-[#CED4DA] rounded-lg border-opacity-50 mt-9 max-w-[528px]"
        >
          <p>Passwords should contain:</p>
          <ul>
            <li class="flex items-center pt-4">
              <span
                class="before:content-['\2022'] text-xl pr-[6px]"
                :class="[
                  {
                    neutral: passwordValue === '',
                    valid: passwordValue.length >= 8,
                    invalid: passwordValue.length < 8,
                  },
                ]"
              ></span
              >8 or more characters
            </li>
            <li class="flex items-center pt-1">
              <span
                class="before:content-['\2022'] text-xl pr-[6px]"
                :class="[
                  {
                    neutral: passwordValue === '',
                    valid: passwordValue.length <= 15,
                    invalid: passwordValue.length > 15,
                  },
                ]"
              ></span
              >max 15 lowercase characters
            </li>
          </ul>
        </div>
        <profile-page-input
          v-if="passwordReadOnly"
          name="password"
          type="password"
          id="newPassword"
          rule="required|min:2"
          placeholder="Nino Tabagari"
          label="new password"
          class="pt-10"
          @input="(passwordValue = values.password), (changed = true)"
        />
        <profile-page-input
          v-if="passwordReadOnly"
          name="password_confirmation"
          type="password"
          id="newPasswordConfirmation"
          rule="required|min:2|confirmed:@password"
          placeholder="Nino Tabagari"
          label="Confirm new password"
          class="pt-10"
          @input="changed = true"
        />
      </Form>
    </div>
    <div v-if="changed === true" class="mt-10 ml-auto mb-10">
      <button
        class="font-normal text-xl mr-8"
        @click="
          (usernameReadOnly = false),
            (changed = false),
            (passwordReadOnly = false)
        "
      >
        Cancel
      </button>
      <button
        form="update"
        type="submit"
        class="rounded-lg font-normal text-xl p-[9px] pl-4 pr-4 bg-[#E31221]"
      >
        Save changes
      </button>
    </div>
  </div>
</template>
<script setup>
import { Form } from "vee-validate";
import ProfilePageInput from "@/components/inputs/ProfilePageInput.vue";
import AddMailIcon from "@/components/icons/AddMailIcon.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "@/config/axios/index.js";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();

const route = useRoute();
const usernameReadOnly = ref(false);
const passwordReadOnly = ref(false);
const passwordValue = ref("");
const changed = ref(false);
const emit = defineEmits(["profileNotice"]);
if (route.query.token) {
  passwordReadOnly.value = !passwordReadOnly.value;
}
function resetPassword() {
  if (route.query.token) {
    passwordReadOnly.value = !passwordReadOnly.value;
  } else {
    axios
      .post("new-password", { email: user.email })
      .then((response) => {
        console.log(response);
        passwordReadOnly.value = !passwordReadOnly.value;
        const message = "Please check email to reset your password";
        emit("profileNotice", message);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function onSubmit(values) {
  console.log(values);
  const password = values.password;
  const password_confirmation = values.password_confirmation;
  const name = values.name;

  let data = {
    password: password,
    password_confirmation: password_confirmation,
    email: route.query.email,
    token: route.query.token,
  };
  if (passwordReadOnly.value === true) {
    axios
      .post("reset-password", { ...data })
      .then((response) => {
        console.log(response);
        passwordReadOnly.value = !passwordReadOnly.value;
        const message = "Changes updated succsessfully";
        emit("profileNotice", message);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (usernameReadOnly.value === true) {
    axios
      .post("update-name", { name: name })
      .then((response) => {
        console.log(response);
        usernameReadOnly.value = !usernameReadOnly.value;
        const message = "Changes updated succsessfully";
        emit("profileNotice", message);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  user.fetchUser();
}

let fileInput = ref(null);
function chooseImage() {
  fileInput.value.click();
}
</script>
<style scoped>
.valid {
  color: green;
}
.neutral {
  color: grey;
}
.invalid {
  color: red;
}
</style>
