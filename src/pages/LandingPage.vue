<template>
  <sign-up
    v-if="SignUpModal"
    @closeModals="closeModals"
    @verifyNoticeModalOn="verifyNoticeModalOn"
    @toggleLogIn="LogInModalToggle"
  />
  <log-in
    v-if="LogInModal"
    @closeModals="closeModals"
    @toggleSignUp="SignUpModalToggle"
  />
  <verify-notice v-if="VerifyModal" @closeModals="closeModals" />
  <verified-notice v-if="VerifiedModal" />
  <the-header
    page="landing"
    @toggleSignUp="SignUpModalToggle"
    @toggleLogIn="LogInModalToggle"
  ></the-header>
  <div class="flex flex-col">
    <div class="h-[720px] bg-black flex">
      <div class="m-auto flex flex-col">
        <p class="text-center text-[#DDCCAA] font-bold text-[60px]">
          Find any quote in <br />
          millions of movie lines
        </p>
        <button
          class="text-white p-2 pl-4 pr-4 text-xl font-normal mt-6 bg-[#E31221] ml-auto mr-auto rounded-lg"
        >
          Get started
        </button>
      </div>
    </div>
    <div
      class="min-h-[1200px] bg-fixed bg-movie-cover-2 bg-auto grow items-center flex"
    >
      <div
        class="h-[1200px] w-full absolute z-10 bg-gradient-to-r from-black via-transparent to-transparent"
      ></div>
      <div class="text-white flex z-20 pl-40">
        <div class="w-[53px] h-[2px] bg-white mt-9 mr-4"></div>
        <div>
          <p class="font-bold text-[50px] max-w-[50%]">
            “You have to leave somethig behind to go forward”
          </p>
          <p class="font-bold text-[30px] text-[#D9D9D9]">
            The Royal Tenenbaums,2001
          </p>
        </div>
      </div>
    </div>
    <div class="min-h-[1200px] bg-fixed bg-movie-cover grow items-center flex">
      <div
        class="h-[1200px] w-full absolute z-10 bg-gradient-to-r from-black via-transparent to-transparent"
      ></div>
      <div class="text-white flex z-20 pl-40">
        <div class="w-[53px] h-[2px] bg-white mt-9 mr-4"></div>
        <div>
          <p class="font-bold text-[50px] max-w-[50%]">
            “You have to leave somethig behind to go forward”
          </p>
          <p class="font-bold text-[30px] text-[#D9D9D9]">
            The Royal Tenenbaums,2001
          </p>
        </div>
      </div>
    </div>
    <div
      class="min-h-[1200px] bg-fixed bg-movie-cover-2 grow items-center flex"
    >
      <div
        class="h-[1200px] w-full absolute z-10 bg-gradient-to-r from-black via-transparent to-transparent"
      ></div>
      <div class="text-white flex z-20 pl-40">
        <div class="w-[53px] h-[2px] bg-white mt-9 mr-4"></div>
        <div>
          <p class="font-bold text-[50px] max-w-[50%]">
            “You have to leave somethig behind to go forward”
          </p>
          <p class="font-bold text-[30px] text-[#D9D9D9]">
            The Royal Tenenbaums,2001
          </p>
        </div>
      </div>
    </div>
  </div>
  <the-footer></the-footer>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import SignUp from "@/components/authentication/SignUp.vue";
import LogIn from "@/components/authentication/LogIn.vue";
import VerifyNotice from "@/components/mailables/VerifyNotice.vue";
import VerifiedNotice from "@/components/mailables/VerifiedNotice.vue";


import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "@/config/axios/index.js";
const route = useRoute();

const SignUpModal = ref(false);
const LogInModal = ref(false);
const VerifyModal = ref(false);
const VerifiedModal = ref(false);


if (route.query.verifyLink) {
  console.log(route.query.verifyLink);
  axios
    .get(route.query.verifyLink)
    .then((response) => {
      console.log(response);
      VerifyModal.value = false;
      VerifiedModal.value= true;
    })
    .catch((error) => {
      console.log(error.response.data);
    });
}

function verifyNoticeModalOn() {
  VerifyModal.value = true;
}
function SignUpModalToggle() {
  LogInModal.value = false;
  SignUpModal.value = true;
}
function LogInModalToggle() {
  SignUpModal.value = false;
  LogInModal.value = true;
}
function closeModals() {
  SignUpModal.value = false;
  LogInModal.value = false;
}
</script>
